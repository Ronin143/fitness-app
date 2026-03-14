window.Views = {
  // === ONBOARDING ===
  renderOnboarding(container, onComplete) {
    const t = window.miniappI18n.t.bind(window.miniappI18n);
    let step = 1;
    let userData = {
      name: '', gender: 'male', age: 25,
      weight: 70, height: 175, goal: 'maintain',
      experience: 'beginner', diet: 'standard', frequency: '3', equipment: ['bodyweight', 'dumbbell']
    };

    const renderStep = () => {
      let content = '';
      if (step === 1) {
        content = `
          <div class="mb-6 slide-up">
            <div class="inline-block bg-appAccent/20 p-3 rounded-full mb-4">
              <span class="text-3xl text-appAccent">🔥</span>
            </div>
            <h2 class="text-3xl font-bold mb-2">${t('onboarding.welcome')}</h2>
            <p class="text-gray-400 text-sm">${t('onboarding.desc')}</p>
          </div>
          <div class="space-y-4 slide-up" style="animation-delay: 0.1s">
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">${t('onboarding.name')}</label>
              <input type="text" id="ob-name" required class="w-full bg-appCard border border-white/10 rounded-xl p-4 text-white outline-none focus:border-appAccent transition-colors shadow-inner" placeholder="${t('onboarding.name_placeholder')}" value="${userData.name}">
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">${t('onboarding.gender')}</label>
                <select id="ob-gender" class="w-full bg-appCard border border-white/10 rounded-xl p-4 text-white outline-none focus:border-appAccent transition-colors appearance-none">
                  <option value="male" ${userData.gender === 'male' ? 'selected' : ''}>${t('onboarding.gender_m')}</option>
                  <option value="female" ${userData.gender === 'female' ? 'selected' : ''}>${t('onboarding.gender_f')}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">${t('onboarding.age')}</label>
                <input type="number" id="ob-age" required min="14" max="99" class="w-full bg-appCard border border-white/10 rounded-xl p-4 text-white outline-none focus:border-appAccent transition-colors shadow-inner" placeholder="25" value="${userData.age}">
              </div>
            </div>
          </div>
        `;
      } else if (step === 2) {
        content = `
          <div class="mb-6 slide-up">
            <h2 class="text-2xl font-bold mb-2">Физические данные ⚖️</h2>
            <p class="text-gray-400 text-sm">Эти данные помогут точно рассчитать калории и нагрузку.</p>
          </div>
          <div class="space-y-4 slide-up" style="animation-delay: 0.1s">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">${t('onboarding.weight')}</label>
                <input type=\"number\" id=\"ob-weight\" required min=\"30\" max=\"250\" class=\"w-full bg-appCard border border-white/10 rounded-xl p-4 text-white outline-none focus:border-appAccent transition-colors shadow-inner\" placeholder=\"70\" value=\"${userData.weight}\">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">${t('onboarding.height')}</label>
                <input type=\"number\" id=\"ob-height\" required min=\"100\" max=\"250\" class=\"w-full bg-appCard border border-white/10 rounded-xl p-4 text-white outline-none focus:border-appAccent transition-colors shadow-inner\" placeholder=\"175\" value=\"${userData.height}\">
              </div>
            </div>
            <div>
              <label class=\"block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1\">${t('onboarding.goal')}</label>
              <select id=\"ob-goal\" class=\"w-full bg-appCard border border-white/10 rounded-xl p-4 text-white outline-none focus:border-appAccent transition-colors appearance-none\">
                <option value=\"cut\" ${userData.goal === 'cut' ? 'selected' : ''}>${t('onboarding.goal_cut')}</option>
                <option value=\"maintain\" ${userData.goal === 'maintain' ? 'selected' : ''}>${t('onboarding.goal_maintain')}</option>
                <option value=\"bulk\" ${userData.goal === 'bulk' ? 'selected' : ''}>${t('onboarding.goal_bulk')}</option>
              </select>
            </div>
          </div>
        `;
      } else if (step === 3) {
        content = `
          <div class="mb-6 slide-up">
            <h2 class="text-2xl font-bold mb-2">План тренировок 🎯</h2>
            <p class="text-gray-400 text-sm">Настроим программу под ваш уровень и инвентарь.</p>
          </div>
          <div class="space-y-4 slide-up overflow-y-auto hide-scrollbar pb-4" style="animation-delay: 0.1s">
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">${t('onboarding.experience')}</label>
              <select id="ob-experience" class="w-full bg-appCard border border-white/10 rounded-xl p-4 text-white outline-none focus:border-appAccent transition-colors appearance-none">
                <option value="beginner" ${userData.experience === 'beginner' ? 'selected' : ''}>${t('onboarding.exp_beginner')}</option>
                <option value="intermediate" ${userData.experience === 'intermediate' ? 'selected' : ''}>${t('onboarding.exp_intermediate')}</option>
                <option value="advanced" ${userData.experience === 'advanced' ? 'selected' : ''}>${t('onboarding.exp_advanced')}</option>
              </select>
            </div>
            
            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1 flex justify-between">
                <span>${t('onboarding.freq')}</span>
                <span class="text-appAccent font-bold" id="ob-freq-val">${t('onboarding.days_per_week', {days: userData.frequency})}</span>
              </label>
              <input type="range" id="ob-freq" min="2" max="5" value="${userData.frequency}" class="w-full mt-2">
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">${t('onboarding.equipment')}</label>
              <div class="grid grid-cols-2 gap-2">
                <label class="flex items-center p-3 border border-white/10 bg-appCard rounded-xl cursor-pointer hover:border-appAccent transition-colors group">
                  <input type="checkbox" value="bodyweight" class="hidden equip-checkbox-input ob-equip" ${userData.equipment.includes('bodyweight') ? 'checked' : ''}>
                  <div class="w-5 h-5 border-2 border-gray-500 rounded flex items-center justify-center mr-3 equip-checkbox-box transition-colors group-hover:border-gray-400">
                    <svg class="w-3 h-3 text-white opacity-0 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span class="text-sm text-gray-200">${t('data.equipment_bodyweight')} 🧘‍♂️</span>
                </label>
                <label class="flex items-center p-3 border border-white/10 bg-appCard rounded-xl cursor-pointer hover:border-appAccent transition-colors group">
                  <input type="checkbox" value="dumbbell" class="hidden equip-checkbox-input ob-equip" ${userData.equipment.includes('dumbbell') ? 'checked' : ''}>
                  <div class="w-5 h-5 border-2 border-gray-500 rounded flex items-center justify-center mr-3 equip-checkbox-box transition-colors group-hover:border-gray-400">
                    <svg class="w-3 h-3 text-white opacity-0 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span class="text-sm text-gray-200">${t('data.equipment_dumbbell')} 🏋️</span>
                </label>
                <label class="flex items-center p-3 border border-white/10 bg-appCard rounded-xl cursor-pointer hover:border-appAccent transition-colors group">
                  <input type="checkbox" value="barbell" class="hidden equip-checkbox-input ob-equip" ${userData.equipment.includes('barbell') ? 'checked' : ''}>
                  <div class="w-5 h-5 border-2 border-gray-500 rounded flex items-center justify-center mr-3 equip-checkbox-box transition-colors group-hover:border-gray-400">
                    <svg class="w-3 h-3 text-white opacity-0 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span class="text-sm text-gray-200">${t('data.equipment_barbell')} 🏋️‍♀️</span>
                </label>
                <label class="flex items-center p-3 border border-white/10 bg-appCard rounded-xl cursor-pointer hover:border-appAccent transition-colors group">
                  <input type="checkbox" value="machine" class="hidden equip-checkbox-input ob-equip" ${userData.equipment.includes('machine') ? 'checked' : ''}>
                  <div class="w-5 h-5 border-2 border-gray-500 rounded flex items-center justify-center mr-3 equip-checkbox-box transition-colors group-hover:border-gray-400">
                    <svg class="w-3 h-3 text-white opacity-0 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span class="text-sm text-gray-200">${t('data.equipment_machine')} 🏗️</span>
                </label>
              </div>
            </div>
          </div>
        `;
      }

      container.innerHTML = `
        <div class="p-6 flex flex-col min-h-full max-w-md mx-auto w-full relative pb-safe">
          <div class="flex items-center gap-2 mb-8 mt-4 pt-4">
            <div class="h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-appAccent shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.5)]' : 'bg-white/10'} transition-all duration-500"></div>
            <div class="h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-appAccent shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.5)]' : 'bg-white/10'} transition-all duration-500"></div>
            <div class="h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-appAccent shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.5)]' : 'bg-white/10'} transition-all duration-500"></div>
          </div>
          
          <div class="flex-1 flex flex-col">
            ${content}
          </div>

          <div class="mt-auto pt-6 flex gap-3">
            ${step > 1 ? `<button id="btn-prev" class="px-6 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition active:scale-95"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button>` : ''}
            <button id="btn-next" class="flex-1 bg-appAccent hover:bg-appAccentHover text-white font-bold py-4 rounded-xl transition active:scale-[0.98] shadow-lg shadow-appAccent/30 flex items-center justify-center relative overflow-hidden group">
              <span class="relative z-10">${step === 3 ? t('onboarding.submit') : 'Далее'}</span>
              <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      `;

      if(document.getElementById('ob-name')) document.getElementById('ob-name').addEventListener('input', e => userData.name = e.target.value);
      if(document.getElementById('ob-gender')) document.getElementById('ob-gender').addEventListener('change', e => userData.gender = e.target.value);
      if(document.getElementById('ob-age')) document.getElementById('ob-age').addEventListener('input', e => userData.age = parseInt(e.target.value)||25);
      if(document.getElementById('ob-weight')) document.getElementById('ob-weight').addEventListener('input', e => userData.weight = parseInt(e.target.value)||70);
      if(document.getElementById('ob-height')) document.getElementById('ob-height').addEventListener('input', e => userData.height = parseInt(e.target.value)||175);
      if(document.getElementById('ob-goal')) document.getElementById('ob-goal').addEventListener('change', e => userData.goal = e.target.value);
      if(document.getElementById('ob-experience')) document.getElementById('ob-experience').addEventListener('change', e => userData.experience = e.target.value);
      if(document.getElementById('ob-diet')) document.getElementById('ob-diet').addEventListener('change', e => userData.diet = e.target.value);
      if(document.getElementById('ob-freq')) document.getElementById('ob-freq').addEventListener('input', e => {
        userData.frequency = e.target.value;
        document.getElementById('ob-freq-val').innerText = t('onboarding.days_per_week', {days: e.target.value});
      });

      if(document.getElementById('btn-prev')) {
        document.getElementById('btn-prev').addEventListener('click', () => {
          if(step > 1) { step--; renderStep(); }
        });
      }

      document.getElementById('btn-next').addEventListener('click', () => {
        if(step === 1 && !userData.name) return alert('Пожалуйста, введите имя');
        if(step === 2 && (!userData.weight || !userData.height)) return alert('Заполните вес и рост');
        
        if(step === 3) {
          const checks = Array.from(document.querySelectorAll('.ob-equip:checked')).map(el => el.value);
          userData.equipment = checks.length > 0 ? checks : ['bodyweight'];
          userData.streak = 0;
          userData.lastActiveDate = '';
          
          const btn = document.getElementById('btn-next');
          btn.innerHTML = `<span class="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full block mx-auto"></span>`;
          btn.disabled = true;
          onComplete(userData);
        } else {
          step++;
          renderStep();
        }
      });
    };
    renderStep();
  },
  // === DASHBOARD ===
  async renderDashboard(container, user) {
    try {
      if (!user) throw new Error("User data is missing");
      const t = window.miniappI18n.t.bind(window.miniappI18n);
    
    // Update streak on dashboard load
    const currentStreak = await DataStore.updateStreak(user);
    
    const plan = await DataStore.getWorkoutPlan();
    const tdee = Logic.calculateTDEE(user);
    const targetMacros = Logic.calculateMacros(tdee, user.goal);
    const todayStr = new Date().toISOString().split('T')[0];
    const nutri = await DataStore.getNutritionLog(todayStr);
    const activity = await DataStore.getActivityLog(todayStr);
    
    const last7Days = [];
    for(let i=6; i>=0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      last7Days.push(d.toISOString().split('T')[0]);
    }
    const nutritionLogs7 = await Promise.all(last7Days.map(d => DataStore.getNutritionLog(d)));
    
    const nextSession = plan && plan.sessions && plan.sessions.length > 0 ? plan.sessions[0] : null;
    const logs = await DataStore.getLogs();
    const isCompleted = logs && logs.workouts ? logs.workouts.some(w => w.date === todayStr) : false;

    let workoutCard = '';
    
    if (!nextSession) {
      workoutCard = `
        <div class="empty-glow-card relative overflow-hidden bg-gradient-to-br from-appCard to-neutral-900 border border-white/5 rounded-2xl p-5 shadow-lg mb-6 text-center">
          <div class="text-3xl mb-2">📭</div>
          <h3 class="text-lg font-bold mb-2">${t('builder.empty_plan') || 'Программа пуста'}</h3>
          <p class="text-sm text-gray-400 mb-4">${t('builder.empty_plan_desc') || 'Добавьте тренировки в конструкторе.'}</p>
          <button id="btn-edit-plan" class="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition active:scale-95 shadow-lg">
            ${t('dashboard.edit_plan') || 'Изменить'}
          </button>
        </div>
      `;
    } else if (isCompleted) {
      workoutCard = `
        <div class="bg-gradient-to-br from-green-500/20 to-appCard border border-green-500/30 rounded-2xl p-5 shadow-lg mb-6 text-center">
          <div class="text-4xl mb-2">🎉</div>
          <h3 class="text-lg font-bold text-green-400">${t('dashboard.done_title')}</h3>
          <p class="text-sm text-gray-400 mt-2">${t('dashboard.done_desc')}</p>
        </div>
      `;
    } else {
      workoutCard = `
        <div class="bg-gradient-to-br from-appCard to-neutral-900 border border-white/5 rounded-2xl p-5 shadow-lg mb-6 relative overflow-hidden">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold">${t('dashboard.today_workout')}</h3>
            <span class="text-[10px] font-semibold px-2 py-1.5 bg-white/10 rounded-lg text-gray-300 pointer-events-none border border-white/5">${t('dashboard.est_time')}</span>
          </div>
          <p class="text-appAccent font-semibold mb-1">${nextSession.dayName}</p>
          <p class="text-sm text-gray-400 mb-5">${t('dashboard.exercises_count', {count: nextSession ? nextSession.exercises.length : 0})}</p>
          <div class="flex gap-3">
            <button id="btn-start-workout" class="flex-1 bg-appAccent hover:bg-appAccentHover font-bold py-3 rounded-xl transition active:scale-[0.98] shadow-lg shadow-appAccent/30">
              ${t('dashboard.start_btn')}
            </button>
            <button id="btn-edit-plan" class="px-5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-bold py-3 rounded-xl transition active:scale-[0.98] flex items-center justify-center shadow-lg">
              <svg class="w-5 h-5 mr-1.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              ${t('dashboard.edit_plan') || 'Изменить'}
            </button>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="fade-in p-5">
        <div class="flex items-center justify-between mb-8 mt-2">
          <div>
            <p class="text-gray-400 text-sm">${t('dashboard.hello', {name: user.name || t('dashboard.champion')})}</p>
            <h2 class="text-2xl font-bold">${t('dashboard.lets_train')}</h2>
          </div>
          <div class="flex gap-2">
            <div class="h-12 bg-appCard border border-orange-500/20 rounded-xl flex items-center justify-center px-3 shadow shadow-orange-500/10" title="Огни">
              <span class="text-orange-500 text-lg mr-1">🔥</span>
              <span class="font-bold text-white">${currentStreak}</span>
            </div>
            <div class="w-12 h-12 bg-appAccent/20 rounded-xl flex items-center justify-center text-sm text-appAccent font-bold">
              ${user.weight}
              <span class="text-[10px] ml-0.5">${t('dashboard.kg')}</span>
            </div>
          </div>
        </div>

        ${workoutCard}

        <!-- Activity Widgets -->
        <!-- Activity Calendar -->
        <h3 class="text-lg font-bold mb-3 mt-6">${t('dashboard.calendar') || 'Календарь активности'}</h3>
        <div class="bg-appCard border border-white/5 rounded-2xl p-4 shadow-lg mb-6 flex justify-between overflow-x-auto hide-scrollbar gap-2">
          ${last7Days.map((dStr, idx) => {
            const nut = nutritionLogs7[idx];
            const isWorkout = logs.workouts.some(w => w.date === dStr);
            const isNutriMet = nut && nut.totalCals > tdee * 0.7;
            const dNum = dStr.split('-')[2];
            return `
              <button class="cal-day-btn flex flex-col items-center min-w-[32px] p-1 rounded-lg hover:bg-white/5 transition active:scale-95" data-date="${dStr}" data-idx="${idx}">
                <span class="text-[10px] text-gray-400 mb-2 pointer-events-none">${dNum}</span>
                <div class="w-8 h-8 rounded-full flex items-center justify-center border mb-2 pointer-events-none ${isWorkout ? 'border-green-500 bg-green-500/20 text-green-400' : 'border-white/5 bg-white/5 text-gray-600'} text-sm" title="${t('dashboard.cal_workout')}">💪</div>
                <div class="w-8 h-8 rounded-full flex items-center justify-center border pointer-events-none ${isNutriMet ? 'border-appAccent bg-appAccent/20 text-appAccent' : 'border-white/5 bg-white/5 text-gray-600'} text-sm" title="${t('dashboard.cal_food')}">🥗</div>
              </button>
            `;
          }).join('')}
        </div>

        <h3 class="text-lg font-bold mb-3 mt-6">${t('dashboard.widgets_title')}</h3>
        <div class="grid grid-cols-3 gap-3 mb-6">
          <!-- Water -->
          <button id="btn-add-water" class="bg-gradient-to-br from-appCard to-neutral-900 border border-white/5 rounded-2xl p-3 text-center hover:bg-white/5 transition active:scale-95 flex flex-col items-center justify-center shadow-lg">
            <div class="text-2xl mb-1 water-pulse inline-block">💧</div>
            <p class="text-sm font-bold text-white"><span id="water-val">${activity.water}</span><span class="text-[10px] text-gray-400 ml-1 font-normal">${t('dashboard.glass')}</span></p>
            <p class="text-[10px] text-appAccent mt-1 font-semibold">${t('dashboard.widget_water') || 'Выпито воды'}</p>
          </button>
          <!-- Steps -->
          <button id="btn-edit-steps" class="bg-gradient-to-br from-appCard to-neutral-900 border border-white/5 rounded-2xl p-3 text-center flex flex-col justify-center items-center shadow-lg hover:bg-white/5 transition active:scale-95">
            <div class="text-2xl mb-1">👟</div>
            <p class="text-sm font-bold text-white"><span id="steps-val">${activity.steps}</span></p>
            <p class="text-[10px] text-appAccent mt-1 font-semibold">${t('dashboard.widget_steps') || 'Шаги за день'}</p>
          </button>
          <!-- Sleep -->
          <button id="btn-edit-sleep" class="bg-gradient-to-br from-appCard to-neutral-900 border border-white/5 rounded-2xl p-3 text-center flex flex-col justify-center items-center shadow-lg hover:bg-white/5 transition active:scale-95">
            <div class="text-2xl mb-1">🌙</div>
            <p class="text-sm font-bold text-white"><span id="sleep-val">${activity.sleep}</span><span class="text-[10px] text-gray-400 ml-1 font-normal">${t('dashboard.hrs') || 'ч'}</span></p>
            <p class="text-[10px] text-appAccent mt-1 font-semibold">${t('dashboard.widget_sleep') || 'Время сна'}</p>
          </button>
        </div>

        <!-- Nutrition Summary -->
        <h3 class="text-lg font-bold mb-3">${t('dashboard.nutrition_title')}</h3>
        <div class="bg-appCard border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
          <div class="flex justify-between items-end mb-2">
            <div>
              <p class="text-3xl font-bold text-white">${nutri.totalCals} <span class="text-sm text-gray-400 font-normal">${t('dashboard.kcal')}</span></p>
              <p class="text-xs text-gray-400 mt-1">${t('dashboard.goal_kcal', {kcal: tdee})}</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-400">${t('dashboard.left_kcal')}</p>
              <p class="text-xl font-semibold text-appAccent">${Math.max(0, tdee - nutri.totalCals)}</p>
            </div>
          </div>
          
          <!-- Progress Bar -->
          <div class="w-full bg-white/10 h-3 rounded-full mt-4 overflow-hidden">
            <div class="h-full rounded-full transition-all duration-500" style="width: ${Math.min(100, (nutri.totalCals/tdee)*100)}%; background-color: rgb(var(--color-accent-rgb));"></div>
          </div>
          
          <!-- Macros -->
          <div class="flex justify-between gap-2 mt-5 pt-4 border-t border-white/10">
            <div class="flex-1">
              <p class="text-[10px] text-gray-400 uppercase tracking-wider text-center">${t('dashboard.protein') || 'Белки'}</p>
              <p class="font-bold text-orange-400 text-sm mt-1 text-center">${nutri.totalPro} <span class="text-gray-500 text-xs font-normal">/ ${targetMacros.p}г</span></p>
              <div class="w-full bg-white/5 h-1.5 rounded-full mt-1.5 overflow-hidden"><div class="h-full bg-orange-400" style="width: ${Math.min(100, (nutri.totalPro/targetMacros.p)*100)}%"></div></div>
            </div>
            <div class="flex-1 px-1">
              <p class="text-[10px] text-gray-400 uppercase tracking-wider text-center">${t('dashboard.fat') || 'Жиры'}</p>
              <p class="font-bold text-yellow-400 text-sm mt-1 text-center">${nutri.totalFat} <span class="text-gray-500 text-xs font-normal">/ ${targetMacros.f}г</span></p>
              <div class="w-full bg-white/5 h-1.5 rounded-full mt-1.5 overflow-hidden"><div class="h-full bg-yellow-400" style="width: ${Math.min(100, (nutri.totalFat/targetMacros.f)*100)}%"></div></div>
            </div>
            <div class="flex-1">
              <p class="text-[10px] text-gray-400 uppercase tracking-wider text-center">${t('dashboard.carbs') || 'Углеводы'}</p>
              <p class="font-bold text-green-400 text-sm mt-1 text-center">${nutri.totalCarb} <span class="text-gray-500 text-xs font-normal">/ ${targetMacros.c}г</span></p>
              <div class="w-full bg-white/5 h-1.5 rounded-full mt-1.5 overflow-hidden"><div class="h-full bg-green-400" style="width: ${Math.min(100, (nutri.totalCarb/targetMacros.c)*100)}%"></div></div>
            </div>
          </div>
        </div>

        <!-- Settings -->
        <h3 class="text-lg font-bold mb-3 mt-8">${t('progress.settings_title')}</h3>
        <div class="bg-appCard border border-white/5 rounded-2xl p-4 mb-6">
          <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Оформление (Светлая/Темная)</label>
          <div class="flex bg-white/5 rounded-xl p-1 mb-5">
            <button class="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors mode-btn ${user.mode==='light' ? 'text-gray-400 hover:text-white' : 'bg-appCard text-white shadow'}" data-mode="dark">Темная 🌙</button>
            <button class="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors mode-btn ${user.mode==='light' ? 'bg-appCard text-white shadow' : 'text-gray-400 hover:text-white'}" data-mode="light">Светлая ☀️</button>
          </div>

          <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">${t('dashboard.theme_label') || 'Цветовая тема'}</label>
          <div class="flex gap-3 mb-6">
            ${Object.entries({ blue: '#3B82F6', green: '#10B981', orange: '#F97316', purple: '#8B5CF6', pink: '#EC4899' }).map(([color, hex]) => `
              <button class="w-8 h-8 rounded-full border-2 transition-all active:scale-90 theme-picker-btn ${user.theme === color || (!user.theme && color==='blue') ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-transparent'}" data-color="${color}" style="background-color: ${hex}"></button>
            `).join('')}
          </div>

          <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">${t('progress.experience_label')}</label>
          <select id="setting-exp" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-appAccent mb-5">
            <option value="beginner" ${user.experience === 'beginner' || !user.experience ? 'selected' : ''}>${t('onboarding.exp_beginner')}</option>
            <option value="intermediate" ${user.experience === 'intermediate' ? 'selected' : ''}>${t('onboarding.exp_intermediate')}</option>
            <option value="advanced" ${user.experience === 'advanced' ? 'selected' : ''}>${t('onboarding.exp_advanced')}</option>
          </select>
          
          <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">${t('progress.equip_label')}</label>
          <div class="grid grid-cols-2 gap-2 mb-4">
            ${[
              { val: 'bodyweight', label: t('data.equipment_bodyweight'), emoji: '🧘‍♂️' },
              { val: 'dumbbell', label: t('data.equipment_dumbbell'), emoji: '🏋️' },
              { val: 'barbell', label: t('data.equipment_barbell'), emoji: '🏋️‍♀️' },
              { val: 'machine', label: t('data.equipment_machine'), emoji: '🏗️' }
            ].map(o => `
              <label class="flex items-center p-3 border border-white/10 bg-white/5 rounded-xl cursor-pointer hover:border-appAccent transition-colors">
                <input type="checkbox" value="${o.val}" class="equip-check hidden equip-checkbox-input" ${user.equipment.includes(o.val) ? 'checked' : ''}>
                <div class="w-5 h-5 border-2 border-gray-500 rounded flex items-center justify-center mr-2 shrink-0 equip-checkbox-box transition-colors">
                  <svg class="w-3 h-3 text-white opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span class="text-xs truncate">${o.label} ${o.emoji}</span>
              </label>
            `).join('')}
          </div>
          <button id="btn-regen-workout" class="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition active:scale-[0.98] shadow-lg">
            ${t('progress.regen_plan')}
          </button>
        </div>
      </div>

      <!-- Calendar Day Modal -->
      <div id="cal-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center hidden opacity-0 transition-opacity">
        <div class="bg-appCard w-full max-w-md rounded-t-3xl p-5 transform translate-y-full transition-transform" id="cal-modal-content">
          <div class="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 shrink-0"></div>
          <h3 class="text-xl font-bold mb-4 text-center"><span id="cal-modal-title">${t('dashboard.day_details_title')?.replace('{date}', '') || 'Детали за '}</span> <span id="cal-modal-date" class="text-appAccent"></span></h3>
          
          <div class="bg-white/5 rounded-xl p-4 mb-3 flex items-center gap-4">
            <div class="text-3xl">💪</div>
            <div>
              <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">${t('dashboard.day_workout') || 'Тренировка:'}</p>
              <p class="font-bold text-white text-sm" id="cal-modal-workout"></p>
            </div>
          </div>
          
          <div class="bg-white/5 rounded-xl p-4 mb-6 flex items-center gap-4">
            <div class="text-3xl">🥗</div>
            <div>
              <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">${t('dashboard.day_food') || 'Питание:'}</p>
              <p class="font-bold text-white text-sm" id="cal-modal-food"></p>
            </div>
          </div>

          <button id="cal-modal-close" class="w-full bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold transition active:scale-95">${t('workout.rest_close') || 'Закрыть'}</button>
        </div>
      </div>
    `;

    const btnEditPlan = document.getElementById('btn-edit-plan');
    if (btnEditPlan) {
      btnEditPlan.addEventListener('click', () => {
        window.Router.navigate('builder');
      });
    }

    const startBtn = document.getElementById('btn-start-workout');
    if (startBtn && nextSession) {
      startBtn.addEventListener('click', () => {
        window.Router.navigate('workout', { session: nextSession });
      });
    }

    const btnWater = document.getElementById('btn-add-water');
    if (btnWater) {
      btnWater.addEventListener('click', async () => {
        activity.water += 250;
        await DataStore.saveActivityLog(todayStr, activity);
        document.getElementById('water-val').innerText = activity.water;
        window.haptic('medium');
        window.showToast(`💦 +250 мл. Всего: ${activity.water} мл`);
      });
    }

    const btnSteps = document.getElementById('btn-edit-steps');
    if (btnSteps) {
      btnSteps.addEventListener('click', async () => {
        const input = prompt(t('dashboard.prompt_steps') || 'Введите количество шагов за сегодня:', activity.steps || 0);
        if (input !== null) {
          const val = parseInt(input);
          if (!isNaN(val) && val >= 0) {
            activity.steps = val;
            await DataStore.saveActivityLog(todayStr, activity);
            document.getElementById('steps-val').innerText = activity.steps;
            window.haptic('success');
            window.showToast(`👟 Шаги обновлены: ${activity.steps}`);
          }
        }
      });
    }

    const btnSleep = document.getElementById('btn-edit-sleep');
    if (btnSleep) {
      btnSleep.addEventListener('click', async () => {
        const input = prompt(t('dashboard.prompt_sleep') || 'Сколько часов вы спали?', activity.sleep || 8);
        if (input !== null) {
          const val = parseFloat(input.replace(',', '.'));
          if (!isNaN(val) && val >= 0) {
            activity.sleep = val;
            await DataStore.saveActivityLog(todayStr, activity);
            document.getElementById('sleep-val').innerText = activity.sleep;
            window.haptic('success');
            window.showToast(`🌙 Сон обновлен: ${activity.sleep} ч`);
          }
        }
      });
    }

    document.querySelectorAll('.cal-day-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dateStr = e.currentTarget.dataset.date;
        const idx = e.currentTarget.dataset.idx;
        const nut = nutritionLogs7[idx];
        const workout = logs.workouts.find(w => w.date === dateStr);
        
        document.getElementById('cal-modal-date').innerText = dateStr.split('-').reverse().join('.');
        
        const wTxt = workout ? `${workout.sessionName} <span class="text-appAccent">(${workout.volume} кг)</span>` : `<span class="text-gray-400 tracking-wide">${t('dashboard.day_none') || 'Нет данных'}</span>`;
        document.getElementById('cal-modal-workout').innerHTML = wTxt;
        
        const fTxt = nut && nut.totalCals > 0 ? `${nut.totalCals} <span class="text-gray-400 text-xs">/ ${tdee} ккал</span>` : `<span class="text-gray-400 tracking-wide">${t('dashboard.day_none') || 'Нет данных'}</span>`;
        document.getElementById('cal-modal-food').innerHTML = fTxt;

        const m = document.getElementById('cal-modal');
        const mc = document.getElementById('cal-modal-content');
        m?.classList?.remove('hidden');
        setTimeout(() => { m?.classList?.remove('opacity-0'); mc?.classList?.remove('translate-y-full'); }, 10);
      });
    });

    const closeCalModal = () => {
      const m = document.getElementById('cal-modal');
      const mc = document.getElementById('cal-modal-content');
      m?.classList?.add('opacity-0'); mc?.classList?.add('translate-y-full');
      setTimeout(() => m?.classList?.add('hidden'), 300);
    };
    document.getElementById('cal-modal-close')?.addEventListener('click', closeCalModal);
    document.getElementById('cal-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'cal-modal') closeCalModal();
    });

    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const mode = e.currentTarget.dataset.mode;
        user.mode = mode;
        await DataStore.saveUser(user);
        document.documentElement.setAttribute('data-theme-mode', mode);
        
        document.querySelectorAll('.mode-btn').forEach(b => {
          if(b.dataset.mode === mode) {
            b.className = 'flex-1 py-2 text-sm font-semibold rounded-lg transition-colors mode-btn bg-appCard text-white shadow';
          } else {
            b.className = 'flex-1 py-2 text-sm font-semibold rounded-lg transition-colors mode-btn text-gray-400 hover:text-white';
          }
        });
      });
    });

    document.querySelectorAll('.theme-picker-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const color = e.currentTarget.dataset.color;
        user.theme = color;
        await DataStore.saveUser(user);
        document.documentElement.setAttribute('data-theme', color);
        
        document.querySelectorAll('.theme-picker-btn').forEach(b => {
          b?.classList?.remove('border-white', 'scale-110', 'shadow-[0_0_15px_rgba(255,255,255,0.3)]');
          b?.classList?.add('border-transparent');
        });
        e.currentTarget?.classList?.add('border-white', 'scale-110', 'shadow-[0_0_15px_rgba(255,255,255,0.3)]');
        e.currentTarget?.classList?.remove('border-transparent');
      });
    });

    const btnRegen = document.getElementById('btn-regen-workout');
    if(btnRegen) {
      btnRegen.addEventListener('click', async () => {
        const checked = Array.from(document.querySelectorAll('.equip-check:checked')).map(cb => cb.value);
        if(checked.length === 0) return window.showToast(t('progress.equip_empty') || 'Выберите инвентарь!', 'error');
        user.equipment = checked;
        
        const newExp = document.getElementById('setting-exp').value;
        user.experience = newExp;
        
        btnRegen.innerHTML = `<span class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full block mx-auto"></span>`;
        
        await DataStore.saveUser(user);
        
        // Re-estimate weights considering the new experience setting
        const newWeights = await Logic.estimateWeightsWithAI(user);
        if(Object.keys(newWeights).length > 0) {
          await DataStore.saveCustomWeights(newWeights);
        }
        
        const newPlan = await Logic.generateWorkoutPlan(user);
        await DataStore.saveWorkoutPlan(newPlan);
        
        window.showToast('✅ Программа обновлена');
        window.haptic('success');
        window.Router.navigate('dashboard');
      });
    }
    } catch (err) {
      console.error(err);
      container.innerHTML = `<div class="p-6 text-center mt-10"><div class="text-red-500 text-5xl mb-4">⚠️</div><h3 class="text-xl font-bold text-white mb-2">Сбой загрузки данных</h3><p class="text-sm text-gray-400 break-words mb-6">Произошла ошибка при загрузке статистики: ${err.message}</p><button id="btn-emergency-reset" class="bg-red-500/20 text-red-400 px-6 py-3 rounded-xl font-bold">Сбросить кэш и начать заново</button></div>`;
      document.getElementById('btn-emergency-reset')?.addEventListener('click', async () => {
        await DataStore.clearUser();
        window.location.reload();
      });
    }
  },

  // === WORKOUT ===
  async renderWorkout(container, user, params) {
    const t = window.miniappI18n.t.bind(window.miniappI18n);
    if(!params || !params.session) {
      const plan = await DataStore.getWorkoutPlan();
      params = { session: plan.sessions[0] };
    }
    const s = params.session;

    if (!s || !s.exercises) {
      container.innerHTML = `
        <div class="fade-in p-5 flex flex-col items-center justify-center min-h-[60vh] text-center empty-glow-card">
          <div class="text-5xl mb-4">📭</div>
          <h2 class="text-xl font-bold mb-2">${t('workout.empty_title') || 'Тренировка не найдена'}</h2>
          <p class="text-gray-400 text-sm mb-6">${t('workout.empty_desc') || 'Перейдите в конструктор программы, чтобы создать свой план тренировок.'}</p>
          <button id="go-to-builder" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-2xl transition active:scale-95 shadow-lg">
            ${t('dashboard.edit_plan') || 'Изменить программу'}
          </button>
        </div>
      `;
      document.getElementById('go-to-builder')?.addEventListener('click', () => window.Router.navigate('builder'));
      return;
    }

    let exercisesHtml = '';
    s.exercises.forEach((ex, index) => {
      let setsHtml = '';
      for(let i=1; i<=ex.targetSets; i++) {
        let displayWeight = ex.weight;
        let isWeighted = ex.equipment !== 'bodyweight' && ex.id !== 18 && ex.id !== 19;
        
        if(isWeighted) {
          const step = ex.equipment === 'dumbbell' ? 2 : 2.5; // +2kg for dumbbells, +2.5kg for barbells/machines per set
          const currentWeight = ex.numericWeight + (i - 1) * step;
          displayWeight = currentWeight + ' ' + t('dashboard.kg');
        }

        setsHtml += `
          <div class="flex items-center justify-between bg-white/5 rounded-lg p-2 mb-2">
            <div class="text-xs text-gray-400 w-8">${t('workout.set_num', {num: i})}</div>
            <div class="text-sm font-semibold text-white w-16 text-center">${displayWeight}</div>
            <div class="text-sm font-semibold text-white w-12 text-center">${ex.targetReps}</div>
            <label class="w-10 flex justify-end pr-1 cursor-pointer group">
              <input type="checkbox" class="exercise-checkbox set-check hidden" data-ex="${ex.id}" data-set="${i}">
              <div class="custom-check group-hover:border-white/40">
                <svg class="w-4 h-4 check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </label>
          </div>
        `;
      }

      let equipLabel = ex.equipment === 'bodyweight' ? t('data.equipment_bodyweight') : (ex.equipment === 'dumbbell' ? t('data.equipment_dumbbell') : (ex.equipment === 'barbell' ? t('data.equipment_barbell') : t('data.equipment_machine')));
      // Special label for warmups/cooldowns
      if (ex.id === 18 || ex.id === 19) equipLabel = ex.group;

      exercisesHtml += `
        <div class="bg-appCard border border-white/5 rounded-2xl p-4 mb-4">
          <div class="flex items-center mb-3 pb-3 border-b border-white/10 relative">
            <div class="text-2xl mr-3 bg-white/5 p-2 rounded-xl">${ex.emoji}</div>
            <div class="flex-1 pr-10">
              <h4 class="font-bold leading-tight">${ex.name}</h4>
              <p class="text-xs text-appAccent">${ex.group} • ${equipLabel}</p>
            </div>
            <button class="absolute right-[44px] top-1 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors btn-swap" data-index="${index}" data-id="${ex.id}" title="${t('workout.swap_btn') || 'Заменить'}">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
            </button>
            <button class="absolute right-0 top-1 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors btn-info" data-id="${ex.id}" title="${t('workout.info_btn')}">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
          </div>
          <div class="mb-4 text-xs text-gray-400 bg-white/5 p-2 rounded border border-white/5">
            <span class="text-appAccent font-semibold">${t('workout.technique')}</span> ${ex.technique}
          </div>
          <div class="flex items-center justify-between text-[10px] text-gray-400 tracking-wide uppercase tracking-wide px-2 mb-2">
            <div class="w-8">${t('workout.set')}</div>
            <div class="w-16 text-center">${t('workout.weight')}</div>
            <div class="w-12 text-center">${t('workout.reps')}</div>
            <div class="w-10 text-right">${t('workout.done')}</div>
          </div>
          ${setsHtml}
        </div>
      `;
    });

    container.innerHTML = `
      <div class="fade-in p-5 pb-32">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-2xl font-bold">${s.dayName}</h2>
          <span class="text-sm text-gray-400">${t('workout.exercises_count', {count: s.exercises.length})}</span>
        </div>
        
        <div id="exercises-list">
          ${exercisesHtml}
        </div>

        <button id="finish-workout" class="w-full bg-gray-800 hover:bg-gray-700 border border-white/10 text-white font-bold py-4 rounded-2xl mt-4 mb-6 transition active:scale-[0.98] shadow-lg flex items-center justify-center gap-2">
          ${t('workout.finish')}
        </button>
      </div>

      <!-- Compact Rest Timer Top -->
      <div id="rest-timer" class="fixed top-[70px] left-1/2 transform -translate-x-1/2 bg-appAccent text-white shadow-lg shadow-appAccent/50 rounded-full px-5 py-2.5 flex items-center justify-center z-40 transition-all duration-300 -translate-y-10 opacity-0 w-max overflow-hidden border border-white/20">
        <div class="flex items-center gap-3 relative z-10">
          <div class="flex items-center gap-1.5">
            <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span class="text-sm font-bold tabular-nums min-w-[55px] text-left" id="rest-timer-sec">0</span>
          </div>
          <div id="rest-timer-divider" class="w-px h-3 bg-white/40"></div>
          <button id="rest-timer-skip" class="text-[10px] font-bold uppercase tracking-wider hover:text-white/80 transition-colors">
            ${t('workout.rest_skip')}
          </button>
        </div>
        <div class="absolute bottom-0 left-0 h-1 bg-black/20 w-full">
           <div id="rest-timer-bar" class="h-full bg-white transition-all duration-1000 ease-linear" style="width: 100%"></div>
        </div>
      </div>

      <!-- Swap Modal -->
      <div id="swap-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center hidden opacity-0 transition-opacity">
        <div class="bg-appCard w-full max-w-md rounded-t-3xl p-5 transform translate-y-full transition-transform flex flex-col max-h-[85vh]" id="swap-modal-content">
          <div class="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 shrink-0"></div>
          <h3 class="text-xl font-bold mb-4 shrink-0">${t('workout.swap_title') || 'Замена упражнения'}</h3>
          <div id="swap-list" class="flex-1 overflow-y-auto space-y-2 hide-scrollbar pb-4 min-h-[50vh]"></div>
          <button id="swap-modal-close" class="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl font-semibold mt-2 shrink-0 transition active:scale-95">${t('nutrition.cancel') || 'Отмена'}</button>
        </div>
      </div>

      <!-- Exercise Info Modal -->
      <div id="exercise-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center hidden opacity-0 transition-opacity">
        <div class="bg-appCard w-full max-w-md rounded-t-3xl overflow-hidden transform translate-y-full transition-transform" id="exercise-modal-content">
          <div class="relative h-48 bg-gradient-to-br from-appAccent/20 via-gray-800 to-appCard flex flex-col items-center justify-center border-b border-white/5">
            <span id="ex-modal-emoji-large" class="text-[5rem] drop-shadow-2xl transform hover:scale-110 transition duration-300 mb-2 z-10"></span>
            <div class="absolute inset-0 bg-gradient-to-t from-appCard via-transparent to-transparent"></div>
            <button id="ex-modal-close-top" class="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors z-20">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div class="p-6 -mt-8 relative z-10 pb-8">
            <div class="flex items-center mb-2">
              <h3 id="ex-modal-title" class="text-2xl font-bold text-white leading-tight drop-shadow-md"></h3>
            </div>
            <p id="ex-modal-tags" class="text-xs text-appAccent mb-6 font-semibold uppercase tracking-wider"></p>
            
            <div class="mb-6 bg-white/5 p-4 rounded-2xl border border-white/5">
              <h4 class="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                ${t('workout.how_to_do')}
              </h4>
              <p id="ex-modal-tech" class="text-sm text-gray-200 leading-relaxed"></p>
            </div>
            
            <button id="ex-modal-close-btn" class="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold transition active:scale-[0.98]">
              ${t('workout.close_info')}
            </button>
          </div>
        </div>
      </div>
    `;

    // Rest Timer Logic
    let restInterval;
    let restTimeout;
    const timerBanner = document.getElementById('rest-timer');
    const timerSecLabel = document.getElementById('rest-timer-sec');
    
    // Synthesize beep using Web Audio API to avoid CSP violations
    const playBeep = () => {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // 880Hz beep
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
      } catch (e) {
        // Ignore if audio context fails or is blocked
      }
    };

    const stopTimer = () => {
      clearInterval(restInterval);
      clearTimeout(restTimeout);
      timerBanner?.classList?.add('-translate-y-10', 'opacity-0');
      setTimeout(() => { if(!timerBanner?.classList?.contains('opacity-0')) timerBanner.style.display = 'none'; }, 300);
    };

    const startTimer = (seconds) => {
      stopTimer();
      
      // Reset classes if it was previously in "Finished" state
      timerBanner?.classList?.remove('bg-green-500', 'shadow-lg', 'shadow-green-500/50');
      timerBanner?.classList?.add('bg-appAccent', 'shadow-lg', 'shadow-appAccent/50');
      const skipBtn = document.getElementById('rest-timer-skip');
      const divider = document.getElementById('rest-timer-divider');
      if(skipBtn) {
        skipBtn.style.display = 'block';
        skipBtn.innerText = t('workout.rest_skip');
      }
      if(divider) divider.style.display = 'block';
      
      timerBanner.style.display = 'flex';
      setTimeout(() => timerBanner?.classList?.remove('-translate-y-10', 'opacity-0'), 10);
      
      let timeLeft = seconds;
      const totalSeconds = seconds;
      timerSecLabel.innerText = t('workout.rest_sec', {sec: timeLeft});
      const timerBar = document.getElementById('rest-timer-bar');
      if(timerBar) timerBar.style.width = '100%';
      
      restInterval = setInterval(() => {
        timeLeft--;
        if(timeLeft <= 0) {
          clearInterval(restInterval);
          playBeep();
          
          timerSecLabel.innerText = t('workout.rest_finished');
          timerBanner?.classList?.remove('bg-appAccent', 'shadow-lg', 'shadow-appAccent/50');
          timerBanner?.classList?.add('bg-green-500', 'shadow-lg', 'shadow-green-500/50');
          
          const skipBtn = document.getElementById('rest-timer-skip');
          const divider = document.getElementById('rest-timer-divider');
          if(skipBtn) {
            skipBtn.style.display = 'block';
            skipBtn.innerText = t('workout.rest_close');
          }
          if(divider) divider.style.display = 'block';
          
          const tBar = document.getElementById('rest-timer-bar');
          if(tBar) tBar.style.width = '0%';
          
          restTimeout = setTimeout(() => stopTimer(), 15000);
        } else {
          timerSecLabel.innerText = t('workout.rest_sec', {sec: timeLeft});
          if(timerBar) timerBar.style.width = `${(timeLeft / totalSeconds) * 100}%`;
        }
      }, 1000);
    };

    document.getElementById('rest-timer-skip').addEventListener('click', stopTimer);

    // Watch checkboxes for rest timer
    document.querySelectorAll('.set-check').forEach(cb => {
      cb.addEventListener('change', (e) => {
        if(e.target.checked) {
          window.haptic('light');
          const exId = parseInt(e.target.dataset.ex);
          // Skip timer for warmups/cooldowns
          if(exId !== 18 && exId !== 19) {
            startTimer(user.goal === 'cut' ? 60 : 90);
          }
        }
      });
    });

    // Modal Logic
    const modal = document.getElementById('exercise-modal');
    const modalContent = document.getElementById('exercise-modal-content');
    const allExercises = getExercises();

    const showModal = (exId) => {
      const fullEx = allExercises.find(e => e.id === exId);
      if (!fullEx) return;

      document.getElementById('ex-modal-emoji-large').innerText = fullEx.emoji;
      document.getElementById('ex-modal-title').innerText = fullEx.name;
      
      let equipLabel = fullEx.equipment === 'bodyweight' ? t('data.equipment_bodyweight') : (fullEx.equipment === 'dumbbell' ? t('data.equipment_dumbbell') : (fullEx.equipment === 'barbell' ? t('data.equipment_barbell') : t('data.equipment_machine')));
      document.getElementById('ex-modal-tags').innerText = `${fullEx.group} • ${equipLabel}`;
      document.getElementById('ex-modal-tech').innerText = fullEx.technique;

      modal?.classList?.remove('hidden');
      setTimeout(() => {
        modal?.classList?.remove('opacity-0');
        modalContent?.classList?.remove('translate-y-full');
      }, 10);
    };

    const closeModal = () => {
      modal?.classList?.add('opacity-0');
      modalContent?.classList?.add('translate-y-full');
      setTimeout(() => modal?.classList?.add('hidden'), 300);
    };

    const swapModal = document.getElementById('swap-modal');
    const swapModalContent = document.getElementById('swap-modal-content');
    let currentSwapIndex = -1;

    const openSwapModal = (index, currentExId) => {
      currentSwapIndex = index;
      const currentEx = s.exercises[index];
      const allEx = getExercises();
      
      let alternatives = allEx.filter(e => 
        e.group === currentEx.group && 
        user.equipment.includes(e.equipment) && 
        e.id !== currentEx.id &&
        e.id !== 18 && e.id !== 19
      );
      
      if(alternatives.length === 0) {
        alternatives = allEx.filter(e => e.group === currentEx.group && e.id !== currentEx.id && e.id !== 18 && e.id !== 19);
      }

      const listContainer = document.getElementById('swap-list');
      if(alternatives.length === 0) {
        listContainer.innerHTML = `<p class="text-center text-gray-400 tracking-wide py-4">${t('workout.swap_empty') || 'Нет альтернатив'}</p>`;
      } else {
        listContainer.innerHTML = alternatives.map(alt => {
          let eq = alt.equipment === 'bodyweight' ? (t('data.equipment_bodyweight') || 'Свой вес') : (alt.equipment === 'dumbbell' ? (t('data.equipment_dumbbell') || 'Гантели') : (alt.equipment === 'barbell' ? (t('data.equipment_barbell') || 'Штанга') : (t('data.equipment_machine') || 'Тренажеры')));
          return `
            <button class="w-full text-left p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition flex items-center gap-3 swap-item-btn" data-id="${alt.id}">
              <div class="text-2xl">${alt.emoji}</div>
              <div>
                <p class="font-semibold text-sm text-white">${alt.name}</p>
                <p class="text-[10px] text-appAccent">${eq}</p>
              </div>
            </button>
          `;
        }).join('');
      }

      swapModal?.classList?.remove('hidden');
      setTimeout(() => {
        swapModal?.classList?.remove('opacity-0');
        swapModalContent?.classList?.remove('translate-y-full');
      }, 10);

      document.querySelectorAll('.swap-item-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const newExId = parseInt(e.currentTarget.dataset.id);
          const customWeights = await DataStore.getCustomWeights();
          const newExLog = Logic._createExerciseLog(newExId, user, allEx, customWeights);
          newExLog.targetSets = currentEx.targetSets;
          newExLog.targetReps = currentEx.targetReps;
          
          s.exercises[currentSwapIndex] = newExLog;
          
          const plan = await DataStore.getWorkoutPlan();
          const sIdx = plan.sessions.findIndex(sess => sess.dayName === s.dayName);
          if(sIdx > -1) {
             plan.sessions[sIdx] = s;
             await DataStore.saveWorkoutPlan(plan);
          }
          closeSwapModal();
          window.Router.navigate('workout', { session: s });
        });
      });
    };

    const closeSwapModal = () => {
      swapModal?.classList?.add('opacity-0');
      swapModalContent?.classList?.add('translate-y-full');
      setTimeout(() => swapModal?.classList?.add('hidden'), 300);
    };

    const closeBtn = document.getElementById('swap-modal-close');
    if(closeBtn) closeBtn.addEventListener('click', closeSwapModal);
    swapModal.addEventListener('click', (e) => { if (e.target === swapModal) closeSwapModal(); });

    document.querySelectorAll('.btn-swap').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index);
        const id = parseInt(e.currentTarget.dataset.id);
        openSwapModal(idx, id);
      });
    });

    document.querySelectorAll('.btn-info').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        showModal(id);
      });
    });

    document.getElementById('ex-modal-close-top').addEventListener('click', closeModal);
    document.getElementById('ex-modal-close-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Finish Workout & Progressive Overload
    document.getElementById('finish-workout').addEventListener('click', async () => {
      stopTimer();
      const checks = document.querySelectorAll('.set-check:checked');
      const total = document.querySelectorAll('.set-check').length;
      
      // Group checked by exercise to check progressive overload
      const exerciseSetsStatus = {};
      s.exercises.forEach(e => {
        exerciseSetsStatus[e.id] = { total: e.targetSets, done: 0, w: e.numericWeight, equip: e.equipment };
      });

      let sessionVolume = 0;
      checks.forEach(cb => {
        const exId = parseInt(cb.dataset.ex);
        const setIndex = parseInt(cb.dataset.set);
        exerciseSetsStatus[exId].done += 1;
        const ex = s.exercises.find(e => e.id === exId);
        
        let w = parseFloat(ex.numericWeight);
        if (!w || isNaN(w) || ex.equipment === 'bodyweight') {
          w = user.weight; // volume calculation for bodyweight
        } else if(exId !== 18 && exId !== 19) {
          const step = ex.equipment === 'dumbbell' ? 2 : 2.5;
          w = w + (setIndex - 1) * step;
        }
        
        let reps = parseInt(ex.targetReps.split('-')[0]) || 10;
        sessionVolume += (w * reps);
      });

      // Progressive Overload Logic
      const customWeights = await DataStore.getCustomWeights();
      let weightsUpdated = false;

      for(let exId in exerciseSetsStatus) {
        const st = exerciseSetsStatus[exId];
        // If it's a weighted exercise, not warmup, and all sets completed
        if(st.equip !== 'bodyweight' && exId != 18 && exId != 19 && st.done === st.total) {
          let increment = st.equip === 'machine' ? 2.5 : 1; // standard bumps
          customWeights[exId] = st.w + increment;
          weightsUpdated = true;
        }
      }

      if(weightsUpdated) {
        await DataStore.saveCustomWeights(customWeights);
        // Force plan regen so new weights apply immediately
        const newPlan = await Logic.generateWorkoutPlan(user);
        await DataStore.saveWorkoutPlan(newPlan);
      }

      const todayStr = new Date().toISOString().split('T')[0];
      await DataStore.addWorkoutLog({
        date: todayStr,
        sessionName: s.dayName,
        completionRatio: `${checks.length}/${total}`,
        volume: sessionVolume
      });

      const fireConfetti = () => {
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#ffffff'];
        for (let i = 0; i < 80; i++) {
          const el = document.createElement('div');
          el.style.position = 'fixed';
          el.style.width = (Math.random() > 0.5 ? '8px' : '10px');
          el.style.height = (Math.random() > 0.5 ? '8px' : '12px');
          el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          el.style.left = '50%';
          el.style.bottom = '20%';
          el.style.pointerEvents = 'none';
          el.style.zIndex = '9999';
          if (Math.random() > 0.5) el.style.borderRadius = '50%';
          document.body.appendChild(el);
          
          const angle = (Math.random() * Math.PI / 1.5) + Math.PI / 6; 
          const velocity = 100 + Math.random() * 350;
          const tx = Math.cos(angle) * velocity * (Math.random() > 0.5 ? 1 : -1);
          const ty = -Math.sin(angle) * velocity - 100;
          const rot = Math.random() * 720;
          
          el.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`, opacity: 0 }
          ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
          }).onfinish = () => el.remove();
        }
      };
      fireConfetti();
      
      setTimeout(() => {
        window.haptic('heavy');
        window.showToast(`🎉 Отличная тренировка! Тоннаж: ${sessionVolume} кг`);
        window.Router.navigate('progress');
      }, 500);
    });
  },

  // === NUTRITION & AI FOOD SCANNER ===
  async renderNutrition(container, user) {
    const t = window.miniappI18n.t.bind(window.miniappI18n);
    const todayStr = new Date().toISOString().split('T')[0];
    const tdee = Logic.calculateTDEE(user);
    const targetMacros = Logic.calculateMacros(tdee, user.goal);
    const VISION_MODEL_ID = "83980b26-79ba-4962-831f-8c1dc91a531a"; // Gemini 2.5 Flash

    if (!user.diet) {
      user.diet = 'standard';
      await DataStore.saveUser(user);
    }

    let nutri = await DataStore.getNutritionLog(todayStr);
    let plan = await DataStore.getMealPlan(todayStr);
    
    if (!plan || plan.date !== todayStr) {
      plan = Logic.generateMealPlan(user, todayStr);
      await DataStore.saveMealPlan(todayStr, plan);
    }

    let activeTab = window._nutriTab || 'diary';

    const renderState = async () => {
      let recipes = await DataStore.getRecipes();
      let mealsHtml = '';
      if (activeTab === 'recipes') {
        if (recipes.length === 0) {
          mealsHtml = `
            <div class="flex flex-col items-center justify-center py-10 px-4 text-center empty-glow-card relative bg-white/5 border border-white/5 rounded-3xl border-dashed">
              <div class="text-5xl mb-4 drop-shadow-lg">📖</div>
              <h4 class="text-white font-bold mb-1">${t('nutrition.empty_recipes_title') || 'Нет рецептов'}</h4>
              <p class="text-xs text-gray-400 max-w-[220px] mb-5">${t('nutrition.empty_recipes_desc')}</p>
              <button id="btn-create-recipe-empty" class="bg-appAccent hover:bg-appAccentHover text-white py-2 px-6 rounded-xl text-sm font-semibold transition active:scale-95 shadow-lg shadow-appAccent/30">${t('nutrition.create_recipe_empty') || 'Создать рецепт'}</button>
            </div>
          `;
        } else {
          recipes.forEach((r, rIdx) => {
            mealsHtml += `
              <div class="bg-appCard border border-white/5 rounded-xl p-4 mb-3">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="font-bold text-white">${r.name}</h4>
                    <p class="text-xs text-gray-400">${t('nutrition.macros_short', {p: r.p, f: r.f, c: r.c})} • ${r.cals} ${t('dashboard.kcal')}</p>
                  </div>
                  <button class="bg-appAccent hover:bg-appAccentHover text-white px-3 py-1.5 rounded-lg text-xs font-semibold btn-add-recipe transition active:scale-95" data-idx="${rIdx}">+ ${t('nutrition.add_to_diary') || 'В дневник'}</button>
                </div>
              </div>
            `;
          });
        }
        mealsHtml += `<button id="btn-create-recipe" class="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl mt-2 text-sm font-semibold transition active:scale-95">${t('nutrition.create_recipe') || 'Сохранить дневник как рецепт'}</button>`;
      } else if (activeTab === 'diary') {
        if (nutri.meals.length === 0) {
          mealsHtml = `
            <div class="flex flex-col items-center justify-center py-10 px-4 text-center empty-glow-card relative bg-white/5 border border-white/5 rounded-3xl border-dashed">
              <div class="text-5xl mb-4 drop-shadow-lg">🍽️</div>
              <h4 class="text-white font-bold mb-1">${t('nutrition.empty_diary_title')}</h4>
              <p class="text-xs text-gray-400 max-w-[200px]">${t('nutrition.empty_diary_desc')}</p>
            </div>
          `;
        } else {
          nutri.meals.forEach(m => {
            let weightTxt = m.weight ? `${m.weight}г • ` : '';
            mealsHtml += `
              <div class="bg-appCard border border-white/5 rounded-xl p-3 mb-3 flex justify-between items-center">
                <div>
                  <p class="font-semibold text-white">${m.name}</p>
                  <p class="text-xs text-gray-400">${weightTxt}${t('nutrition.macros_short', {p: m.p, f: m.f, c: m.c})}</p>
                </div>
                <div class="font-bold text-appAccent">${m.cals} ${t('dashboard.kcal')}</div>
              </div>
            `;
          });
        }
      } else {
        plan.items.forEach(item => {
          mealsHtml += `
            <div class="bg-appCard border border-white/5 rounded-xl p-4 mb-3">
              <div class="flex justify-between mb-2">
                <div>
                  <span class="text-[10px] text-appAccent uppercase tracking-wider font-bold">${t('nutrition.' + item.type)}</span>
                  <h4 class="font-bold text-white text-sm mt-0.5 leading-tight">${item.name}</h4>
                </div>
                <div class="text-right">
                  <div class="font-bold text-lg">${item.cals} <span class="text-[10px] font-normal text-gray-400 uppercase tracking-widest">${t('dashboard.kcal')}</span></div>
                </div>
              </div>
              <div class="text-xs text-gray-400 mb-3">${t('nutrition.macros_short', {p: item.p, f: item.f, c: item.c})}</div>
              <div class="flex gap-2">
                ${item.eaten 
                  ? `<button class="flex-1 bg-green-500/10 border border-green-500/20 text-green-400 font-semibold py-2 rounded-lg text-sm cursor-default flex items-center justify-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> ${t('nutrition.eaten')}</button>` 
                  : `<button class="flex-1 bg-appAccent hover:bg-appAccentHover text-white font-semibold py-2 rounded-lg text-sm transition btn-eat" data-id="${item.id}">${t('nutrition.mark_eaten')}</button>`}
                <button class="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-3 rounded-lg text-sm transition btn-replace" data-id="${item.id}" title="${t('nutrition.replace')}">🔄</button>
              </div>
            </div>
          `;
        });
        mealsHtml += `<button id="btn-regen-plan" class="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl mt-2 text-sm transition active:scale-[0.98] shadow-lg">${t('nutrition.generate_new')}</button>`;
      }

      container.innerHTML = `
        <div class="fade-in p-5 relative min-h-full">
          <h2 class="text-2xl font-bold mb-6">${t('nutrition.title')}</h2>
          
          <!-- Summary Circle / Bar -->
          <div class="bg-gradient-to-br from-appCard to-neutral-900 border border-white/5 rounded-2xl p-6 shadow-lg mb-6 flex items-center justify-center flex-col relative overflow-hidden">
            <div class="relative w-40 h-40 flex items-center justify-center">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gradientRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#F97316" />
                    <stop offset="100%" stop-color="rgb(var(--color-accent-rgb))" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#333" stroke-width="8"></circle>
                <circle cx="50" cy="50" r="45" fill="none" stroke-width="8" stroke-dasharray="${2 * Math.PI * 45}" stroke-dashoffset="${(2 * Math.PI * 45) * (1 - Math.min(1, nutri.totalCals/tdee))}" class="transition-all duration-1000" style="stroke: url(#gradientRing);"></circle>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-2xl font-bold">${nutri.totalCals}</span>
                <span class="text-[10px] text-gray-400 uppercase tracking-widest mt-1">${t('dashboard.kcal')}</span>
              </div>
            </div>
            <p class="mt-4 text-sm text-gray-400">${t('nutrition.goal_left', {tdee: tdee})} <span class="text-white font-semibold">${Math.max(0, tdee - nutri.totalCals)}</span></p>
            
            <div class="w-full flex justify-between gap-4 mt-5 pt-5 border-t border-white/10">
              <div class="flex-1">
                <div class="flex justify-between text-[10px] mb-1"><span class="text-gray-400 uppercase tracking-wider">${t('dashboard.protein') || 'Белки'}</span><span class="text-orange-400 font-bold">${nutri.totalPro}/${targetMacros.p}г</span></div>
                <div class="w-full bg-white/5 h-1.5 rounded-full overflow-hidden"><div class="h-full bg-orange-400 transition-all duration-500" style="width: ${Math.min(100, (nutri.totalPro/targetMacros.p)*100)}%"></div></div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between text-[10px] mb-1"><span class="text-gray-400 uppercase tracking-wider">${t('dashboard.fat') || 'Жиры'}</span><span class="text-yellow-400 font-bold">${nutri.totalFat}/${targetMacros.f}г</span></div>
                <div class="w-full bg-white/5 h-1.5 rounded-full overflow-hidden"><div class="h-full bg-yellow-400 transition-all duration-500" style="width: ${Math.min(100, (nutri.totalFat/targetMacros.f)*100)}%"></div></div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between text-[10px] mb-1"><span class="text-gray-400 uppercase tracking-wider">${t('dashboard.carbs') || 'Углеводы'}</span><span class="text-green-400 font-bold">${nutri.totalCarb}/${targetMacros.c}г</span></div>
                <div class="w-full bg-white/5 h-1.5 rounded-full overflow-hidden"><div class="h-full bg-green-400 transition-all duration-500" style="width: ${Math.min(100, (nutri.totalCarb/targetMacros.c)*100)}%"></div></div>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="flex bg-white/5 rounded-xl p-1 mb-6">
            <button class="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors tab-btn ${activeTab==='plan' ? 'bg-appCard text-white shadow' : 'text-gray-400 hover:text-white'}" data-tab="plan">${t('nutrition.tab_plan')}</button>
            <button class="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors tab-btn ${activeTab==='diary' ? 'bg-appCard text-white shadow' : 'text-gray-400 hover:text-white'}" data-tab="diary">${t('nutrition.tab_diary')}</button>
            <button class="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors tab-btn ${activeTab==='recipes' ? 'bg-appCard text-white shadow' : 'text-gray-400 hover:text-white'}" data-tab="recipes">${t('nutrition.tab_recipes') || 'Рецепты'}</button>
          </div>
          
          <div id="meals-container" class="tab-content-enter">
            ${mealsHtml}
          </div>

          ${activeTab === 'diary' ? `
          <div class="grid grid-cols-2 gap-3 mt-4">
            <button id="add-food-btn" class="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition active:scale-95 text-sm">
              ${t('nutrition.add_btn')}
            </button>
            <label class="w-full bg-appAccent hover:bg-appAccentHover text-white py-3 rounded-xl font-semibold transition active:scale-95 text-sm text-center cursor-pointer flex items-center justify-center gap-2">
              <input type="file" id="scan-food-input" accept="image/*" class="hidden">
              <span id="scan-btn-text">${t('nutrition.scan_btn')}</span>
            </label>
          </div>
          ` : ''}
        </div>
        
        <!-- Modal Overlay for adding food -->
        <div id="food-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center hidden opacity-0 transition-opacity">
          <div class="bg-appCard w-full max-w-md rounded-t-3xl p-5 transform translate-y-full transition-transform flex flex-col max-h-[85vh]" id="food-modal-content">
            <div class="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 shrink-0"></div>
            
            <!-- Search View -->
            <div id="food-search-view" class="flex flex-col flex-1 overflow-hidden">
              <h3 class="text-xl font-bold mb-3 shrink-0">${t('nutrition.add_title')}</h3>
              <input type="text" id="food-search-input" placeholder="${t('nutrition.search_placeholder')}" class="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-appAccent mb-3 shrink-0">
              
              <div id="food-search-results" class="flex-1 overflow-y-auto space-y-2 hide-scrollbar pb-2 min-h-[50vh]">
                <!-- Items injected here -->
              </div>
              <button id="close-food-modal" class="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl font-semibold mt-3 shrink-0 transition active:scale-95">${t('nutrition.cancel')}</button>
            </div>

            <!-- Detail View -->
            <div id="food-detail-view" class="hidden flex-col flex-1 pb-4">
              <button id="btn-back-search" class="text-sm text-appAccent mb-4 flex items-center gap-1 self-start font-medium transition hover:text-white">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                ${t('nutrition.back_to_search')}
              </button>
              <h3 id="detail-food-name" class="text-xl font-bold mb-1"></h3>
              <p id="detail-food-macros" class="text-xs text-gray-400 mb-6"></p>

              <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">${t('nutrition.weight_placeholder')}</label>
              <input type="number" id="detail-food-weight" class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-lg text-white focus:outline-none focus:border-appAccent text-center mb-6" placeholder="100">

              <div class="bg-appAccent/10 border border-appAccent/20 rounded-xl p-4 mb-6">
                <p class="text-center text-sm text-gray-400 mb-2">${t('nutrition.total_will_be')}</p>
                <div class="flex justify-around items-end">
                  <div class="text-center"><span class="block text-xs text-gray-400 tracking-wide">Б</span><span id="detail-res-p" class="font-bold text-white">0</span></div>
                  <div class="text-center"><span class="block text-xs text-gray-400 tracking-wide">Ж</span><span id="detail-res-f" class="font-bold text-white">0</span></div>
                  <div class="text-center"><span class="block text-xs text-gray-400 tracking-wide">У</span><span id="detail-res-c" class="font-bold text-white">0</span></div>
                  <div class="text-center"><span class="block text-xs text-appAccent">Ккал</span><span id="detail-res-cals" class="font-bold text-appAccent text-lg">0</span></div>
                </div>
              </div>

              <button id="btn-add-food-final" class="w-full bg-appAccent hover:bg-appAccentHover text-white py-4 rounded-xl font-bold transition active:scale-[0.98] mt-auto shadow-lg shadow-appAccent/20">
                ${t('nutrition.add_to_diary')}
              </button>
            </div>
          </div>
        </div>
      `;

      attachListeners();
    };

    const attachListeners = () => {
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          window._nutriTab = e.currentTarget.dataset.tab;
          activeTab = window._nutriTab;
          await renderState();
        });
      });

      if (activeTab === 'plan') {
        document.querySelectorAll('.btn-eat').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const id = e.currentTarget.dataset.id;
            const item = plan.items.find(i => i.id === id);
            if (item && !item.eaten) {
              item.eaten = true;
              await DataStore.saveMealPlan(todayStr, plan);
              
              nutri.meals.push({
                name: item.name,
                weight: 0,
                cals: item.cals,
                p: item.p,
                f: item.f,
                c: item.c
              });
              nutri.totalCals += item.cals;
              nutri.totalPro += item.p;
              nutri.totalFat += item.f;
              nutri.totalCarb += item.c;
              
              await DataStore.saveNutritionLog(todayStr, nutri);
              window.haptic('light');
              window.showToast('🍽️ Съедено: ' + item.name);
              renderState();
            }
          });
        });

        document.querySelectorAll('.btn-replace').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const id = e.currentTarget.dataset.id;
            const idx = plan.items.findIndex(i => i.id === id);
            if (idx > -1) {
              const oldItem = plan.items[idx];
              const newItem = Logic.pickAlternativeMeal(oldItem, user);
              if (newItem) {
                plan.items[idx] = newItem;
                await DataStore.saveMealPlan(todayStr, plan);
                window.haptic('medium');
                window.showToast('🔄 Блюдо заменено');
                renderState();
              }
            }
          });
        });

        const regenBtn = document.getElementById('btn-regen-plan');
        if (regenBtn) {
          regenBtn.addEventListener('click', async () => {
            plan = Logic.generateMealPlan(user, todayStr);
            await DataStore.saveMealPlan(todayStr, plan);
            renderState();
          });
        }
      } else {
        // AI Photo Scanner Logic
        const scanInput = document.getElementById('scan-food-input');
        const scanBtnText = document.getElementById('scan-btn-text');

        if(scanInput) {
          scanInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if(!file) return;

            scanBtnText.innerText = t('nutrition.scanning');
            try {
              const uploaded = await miniappsAI.uploadFile(file);
              const result = await miniappsAI.callModel({
                modelId: VISION_MODEL_ID,
                messages: [{
                  role: 'user',
                  content: [
                    { type: 'file_id', fileId: uploaded.id },
                    { type: 'text', text: t('nutrition.scan_prompt') }
                  ]
                }]
              });
              
              const aiText = miniappsAI.extractText(result);
              // Safely extract JSON from the text
              const jsonStrMatch = aiText.match(/\{[\s\S]*\}/);
              if(jsonStrMatch) {
                const data = JSON.parse(jsonStrMatch[0]);
                const meal = {
                  name: data.name || 'Распознанная еда',
                  weight: 0,
                  cals: parseInt(data.cals) || 0,
                  p: parseInt(data.p) || 0,
                  f: parseInt(data.f) || 0,
                  c: parseInt(data.c) || 0
                };
                
                nutri.meals.push(meal);
                nutri.totalCals += meal.cals;
                nutri.totalPro += meal.p;
                nutri.totalFat += meal.f;
                nutri.totalCarb += meal.c;
                await DataStore.saveNutritionLog(todayStr, nutri);
                renderState();
              } else {
                throw new Error("No JSON found");
              }
            } catch (err) {
              console.error(err);
              alert(t('nutrition.scan_error'));
              scanBtnText.innerText = t('nutrition.scan_btn');
            }
          });
        }

        const modal = document.getElementById('food-modal');
        const modalContent = document.getElementById('food-modal-content');
        
        const searchInput = document.getElementById('food-search-input');
        const searchResults = document.getElementById('food-search-results');
        const searchView = document.getElementById('food-search-view');
        const detailView = document.getElementById('food-detail-view');
        const inputWeight = document.getElementById('detail-food-weight');
        const btnBack = document.getElementById('btn-back-search');
        const btnAddFinal = document.getElementById('btn-add-food-final');

        let foodDb = typeof getFoodDatabase !== 'undefined' ? getFoodDatabase() : [];
        let selectedFood = null;

        const renderSearchResults = (query = '') => {
          const q = query.toLowerCase();
          const filtered = foodDb.filter(f => f.name.toLowerCase().includes(q));
          
          if(filtered.length === 0) {
            searchResults.innerHTML = `<p class="text-center text-gray-400 tracking-wide text-sm py-4">${t('nutrition.not_found')}</p>`;
            return;
          }
          
          searchResults.innerHTML = filtered.map(f => `
            <button class="w-full text-left p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition flex justify-between items-center food-item-btn" data-id="${f.id}">
              <div>
                <p class="font-semibold text-sm text-white">${f.name}</p>
                <p class="text-[10px] text-gray-400 mt-0.5">Б:${Math.round(f.p)} Ж:${Math.round(f.f)} У:${Math.round(f.c)} • ${f.cals} ${t('dashboard.kcal')}</p>
              </div>
              <div class="text-appAccent">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              </div>
            </button>
          `).join('');

          document.querySelectorAll('.food-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              const id = e.currentTarget.dataset.id;
              selectedFood = foodDb.find(f => f.id === id);
              openDetailView();
            });
          });
        };

        const updateCalculatedTotals = () => {
          if(!selectedFood) return;
          const w = parseFloat(inputWeight.value) || 0;
          const ratio = w / 100;
          document.getElementById('detail-res-p').innerText = (selectedFood.p * ratio).toFixed(1);
          document.getElementById('detail-res-f').innerText = (selectedFood.f * ratio).toFixed(1);
          document.getElementById('detail-res-c').innerText = (selectedFood.c * ratio).toFixed(1);
          document.getElementById('detail-res-cals').innerText = Math.round(selectedFood.cals * ratio);
        };

        const openDetailView = () => {
          if(!selectedFood) return;
          searchView?.classList?.add('hidden');
          searchView?.classList?.remove('flex');
          detailView?.classList?.remove('hidden');
          detailView?.classList?.add('flex');
          
          document.getElementById('detail-food-name').innerText = selectedFood.name;
          document.getElementById('detail-food-macros').innerText = `${t('nutrition.per_100g')}: Б:${selectedFood.p} Ж:${selectedFood.f} У:${selectedFood.c} • ${selectedFood.cals} ${t('dashboard.kcal')}`;
          
          inputWeight.value = '100';
          updateCalculatedTotals();
        };

        const closeDetailView = () => {
          detailView?.classList?.add('hidden');
          detailView?.classList?.remove('flex');
          searchView?.classList?.remove('hidden');
          searchView?.classList?.add('flex');
          selectedFood = null;
          inputWeight.value = '';
        };

        if(searchInput) {
          searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
        }
        if(btnBack) btnBack.addEventListener('click', closeDetailView);
        if(inputWeight) inputWeight.addEventListener('input', updateCalculatedTotals);

        if(btnAddFinal) {
          btnAddFinal.addEventListener('click', async () => {
            if(!selectedFood) return;
            const w = parseFloat(inputWeight.value) || 0;
            if(w <= 0) return window.showToast(t('nutrition.invalid_weight') || 'Укажите вес!', 'error');

            const ratio = w / 100;
            const meal = {
              name: selectedFood.name,
              weight: w,
              cals: Math.round(selectedFood.cals * ratio),
              p: Math.round(selectedFood.p * ratio),
              f: Math.round(selectedFood.f * ratio),
              c: Math.round(selectedFood.c * ratio)
            };

            nutri.meals.push(meal);
            nutri.totalCals += meal.cals;
            nutri.totalPro += meal.p;
            nutri.totalFat += meal.f;
            nutri.totalCarb += meal.c;
            
            await DataStore.saveNutritionLog(todayStr, nutri);
            window.haptic('success');
            window.showToast(`✅ ${meal.name} добавлен в дневник`);
            closeModal();
            renderState();
          });
        }

        const btnAdd = document.getElementById('add-food-btn');
        if (btnAdd) {
          btnAdd.addEventListener('click', () => {
            closeDetailView();
            if(searchInput) searchInput.value = '';
            renderSearchResults();

            modal?.classList?.remove('hidden');
            setTimeout(() => {
              modal?.classList?.remove('opacity-0');
              modalContent?.classList?.remove('translate-y-full');
            }, 10);
          });
        }

        const closeModal = () => {
          modal?.classList?.add('opacity-0');
          modalContent?.classList?.add('translate-y-full');
          setTimeout(() => modal?.classList?.add('hidden'), 300);
        };

        const btnClose = document.getElementById('close-food-modal');
        if (btnClose) btnClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        });
      }

      // Recipes Tab listeners
      const createRecipeHandler = async () => {
          if(nutri.meals.length === 0) return window.showToast('Дневник пуст!', 'error');
          const name = prompt(t('nutrition.recipe_name') || 'Название рецепта:');
          if(name) {
            const recipesList = await DataStore.getRecipes();
            recipesList.push({ name: name, cals: nutri.totalCals, p: nutri.totalPro, f: nutri.totalFat, c: nutri.totalCarb, meals: nutri.meals });
            await DataStore.saveRecipes(recipesList);
            await renderState();
          }
        };

        const btnCreateRecipe = document.getElementById('btn-create-recipe');
        const btnCreateEmpty = document.getElementById('btn-create-recipe-empty');
        if(btnCreateRecipe) btnCreateRecipe.addEventListener('click', createRecipeHandler);
        if(btnCreateEmpty) btnCreateEmpty.addEventListener('click', createRecipeHandler);
      if(btnCreateRecipe) {
        btnCreateRecipe.addEventListener('click', async () => {
          if(nutri.meals.length === 0) return window.showToast('Дневник пуст!', 'error');
          const name = prompt(t('nutrition.recipe_name') || 'Название рецепта:');
          if(name) {
            const recipesList = await DataStore.getRecipes();
            recipesList.push({ name: name, cals: nutri.totalCals, p: nutri.totalPro, f: nutri.totalFat, c: nutri.totalCarb, meals: nutri.meals });
            await DataStore.saveRecipes(recipesList);
            await renderState();
          }
        });
      }

      document.querySelectorAll('.btn-add-recipe').forEach(btn => {
        btn.addEventListener('click', async (e) => {
           const idx = parseInt(e.currentTarget.dataset.idx);
           const recipesList = await DataStore.getRecipes();
           const r = recipesList[idx];
           nutri.totalCals += r.cals;
           nutri.totalPro += r.p;
           nutri.totalFat += r.f;
           nutri.totalCarb += r.c;
           r.meals.forEach(m => nutri.meals.push(m));
           await DataStore.saveNutritionLog(todayStr, nutri);
           window.haptic('success');
           window.showToast('✅ Рецепт добавлен в дневник!');
           await renderState();
        });
      });
    };

    await renderState();
  },

  // === PROGRESS ===
  // Moved to js/view_progress.js

  // Chat and Builder moved to separate files
};