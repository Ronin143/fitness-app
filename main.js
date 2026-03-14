document.addEventListener('DOMContentLoaded', async () => {
  const viewContainer = document.getElementById('view-container');
  const bottomNav = document.getElementById('bottom-nav');
  const appHeader = document.getElementById('app-header');
  const headerTitle = document.getElementById('header-title');
  const navBtns = document.querySelectorAll('.nav-btn');

  // Check if JS files loaded correctly (prevents infinite loading on missing files)
  if (typeof DataStore === 'undefined' || typeof Views === 'undefined' || typeof Logic === 'undefined') {
    viewContainer.innerHTML = `<div class="p-5 text-red-500 text-center mt-10"><b class="text-xl">⚠️ Критическая ошибка</b><br><br>Не удалось загрузить скрипты приложения.<br>Пожалуйста, убедитесь, что вы загрузили папку <b>js/</b> на GitHub.</div>`;
    return;
  }

  const getTitle = (route) => {
    switch (route) {
      case 'onboarding': return window.miniappI18n.t('router.onboarding');
      case 'dashboard': return window.miniappI18n.t('router.dashboard');
      case 'workout': return window.miniappI18n.t('router.workout');
      case 'nutrition': return window.miniappI18n.t('router.nutrition');
      case 'progress': return window.miniappI18n.t('router.progress');
      case 'chat': return window.miniappI18n.t('router.chat');
      case 'builder': return window.miniappI18n.t('router.builder') || 'Конструктор';
      default: return window.miniappI18n.t('router.title_fallback');
    }
  };

  window.Router = {
    current: '',
    async navigate(route, params = {}) {
      this.current = route;
      let user = null; try { user = await DataStore.getUser(); } catch(e) { console.error('Corrupt user data', e); localStorage.clear(); }

      // Clear container and show loading
      viewContainer.innerHTML = `<div class="flex items-center justify-center h-full text-appAccent"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-appAccent"></div></div>`;
      
      headerTitle.textContent = getTitle(route);

      if (route === 'onboarding') {
        appHeader.classList.add('hidden');
        bottomNav.classList.add('hidden');
        viewContainer.classList.remove('pb-28'); // remove padding for floating nav
        Views.renderOnboarding(viewContainer, async (newUser) => {
          await DataStore.saveUser(newUser);
          const weights = await Logic.estimateWeightsWithAI(newUser);
          await DataStore.saveCustomWeights(weights);
          const plan = await Logic.generateWorkoutPlan(newUser);
          await DataStore.saveWorkoutPlan(plan);
          window.haptic('success');
          window.showToast('✅ Профиль успешно создан!');
          this.navigate('dashboard');
        });
        return;
      }

      // Rest of the app requires user
      if (!user) {
        this.navigate('onboarding');
        return;
      }

      appHeader.classList.remove('hidden');
      bottomNav.classList.remove('hidden');
      viewContainer.classList.add('pb-28'); // space for floating nav

      // Update Nav active state
      navBtns.forEach(btn => {
        if (btn.dataset.tab === route) {
          btn.classList.add('active', 'text-appAccent');
          btn.classList.remove('text-gray-500');
        } else {
          btn.classList.remove('active', 'text-appAccent');
          btn.classList.add('text-gray-500');
        }
      });

      try {
        if (route === 'dashboard') {
          let weights = await DataStore.getCustomWeights();
          // Force update if the database has less than 10 weights (old version had only ~4)
          if(!weights || Object.keys(weights).length < 10) {
            weights = await Logic.estimateWeightsWithAI(user);
            await DataStore.saveCustomWeights(weights);
            const newPlan = await Logic.generateWorkoutPlan(user);
            await DataStore.saveWorkoutPlan(newPlan);
          }
          await Views.renderDashboard(viewContainer, user);
        } else if (route === 'workout') {
          await Views.renderWorkout(viewContainer, user, params);
        } else if (route === 'nutrition') {
          await Views.renderNutrition(viewContainer, user);
        } else if (route === 'progress') {
          await Views.renderProgress(viewContainer, user);
        } else if (route === 'chat') {
          await Views.renderChat(viewContainer, user);
        } else if (route === 'builder') {
          await Views.renderBuilder(viewContainer, user);
        } else {
          this.navigate('dashboard');
        }
      } catch(err) {
        console.error("Navigation error:", err);
        viewContainer.innerHTML = `<div class="p-5 text-red-500 text-center">${window.miniappI18n.t('router.error')}</div>`;
      }
    }
  };

  // Nav Clicks
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      if (tab !== window.Router.current) {
        window.Router.navigate(tab);
      }
    });
  });

  // Telegram Web App Init
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand(); // Auto-expand to full height
    // Optional: match header color to Telegram theme
    // window.Telegram.WebApp.setHeaderColor('bg_color');
  }

  // Init App
  const user = await DataStore.getUser();
  if (user && user.theme) {
    document.documentElement.setAttribute('data-theme', user.theme);
  }
  if (user && user.mode) {
    document.documentElement.setAttribute('data-theme-mode', user.mode);
  }
  if (user) {
    window.Router.navigate('dashboard');
  } else {
    window.Router.navigate('onboarding');
  }
});