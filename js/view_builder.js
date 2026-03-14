window.Views = window.Views || {};

window.Views.renderBuilder = async function(container, user) {
  const t = window.miniappI18n.t.bind(window.miniappI18n);
  let plan = await DataStore.getWorkoutPlan();
  if (!plan || !plan.sessions) plan = { name: 'Моя программа', sessions: [] };
  const allExercises = typeof getExercises !== 'undefined' ? getExercises() : [];
  let customWeights = await DataStore.getCustomWeights();

  let activeDayIndex = null;

  const render = () => {
    let daysHtml = plan.sessions.map((day, dIdx) => `
      <div class="bg-appCard border border-white/5 rounded-2xl p-4 mb-4 slide-up" style="animation-delay: ${dIdx * 0.05}s">
        <div class="flex justify-between items-center mb-4">
          <input type="text" class="day-name-input bg-transparent text-lg font-bold text-white border-b border-white/10 focus:border-appAccent outline-none w-2/3" value="${day.dayName}" data-idx="${dIdx}" placeholder="${t('builder.day_name') || 'Название тренировки'}">
          <button class="text-red-400 hover:text-red-300 p-2 bg-red-500/10 rounded-lg transition btn-del-day" data-idx="${dIdx}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
        
        <div class="space-y-2 mb-4">
          ${day.exercises.length === 0 ? `<p class="text-xs text-gray-400 tracking-wide italic">${t('builder.no_exercises') || 'Нет упражнений'}</p>` : ''}
          ${day.exercises.map((ex, eIdx) => `
            <div class="bg-white/5 p-3 rounded-xl flex items-center justify-between border border-white/5 relative group">
              <div class="flex-1 pr-2">
                <p class="font-semibold text-sm text-white leading-tight mb-1">${ex.emoji} ${ex.name}</p>
                <div class="flex items-center gap-2 text-xs text-gray-400 mt-2">
                  <span>${t('builder.sets') || 'Сеты'}:</span>
                  <input type="number" class="w-12 bg-appBg rounded px-1 py-1 text-center text-white border border-white/10 ex-sets-input" value="${ex.targetSets}" data-didx="${dIdx}" data-eidx="${eIdx}" min="1" max="10">
                  <span class="ml-2">${t('builder.reps') || 'Повторы'}:</span>
                  <input type="text" class="w-16 bg-appBg rounded px-1 py-1 text-center text-white border border-white/10 ex-reps-input" value="${ex.targetReps}" data-didx="${dIdx}" data-eidx="${eIdx}">
                </div>
              </div>
              <button class="text-gray-400 tracking-wide hover:text-red-400 p-2 transition btn-del-ex" data-didx="${dIdx}" data-eidx="${eIdx}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          `).join('')}
        </div>
        
        <button class="w-full py-3 bg-white/5 hover:bg-white/10 text-appAccent text-sm font-semibold rounded-xl border border-dashed border-appAccent/30 transition btn-add-ex" data-idx="${dIdx}">
          ${t('builder.add_exercise') || '+ Упражнение'}
        </button>
      </div>
    `).join('');

    if (plan.sessions.length === 0) {
      daysHtml = `
        <div class="flex flex-col items-center justify-center py-10 px-4 text-center empty-glow-card relative bg-white/5 border border-white/5 rounded-3xl border-dashed mb-6">
          <div class="text-5xl mb-4 drop-shadow-lg">📝</div>
          <h4 class="text-white font-bold mb-1">${t('builder.empty_plan') || 'Программа пуста'}</h4>
          <p class="text-xs text-gray-400 max-w-[220px] mb-5">${t('builder.empty_plan_desc') || 'Добавьте свой первый тренировочный день.'}</p>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="fade-in p-5 pb-32 min-h-full">
        <h2 class="text-2xl font-bold mb-2">${t('builder.title') || 'Конструктор программы'}</h2>
        <p class="text-sm text-gray-400 mb-6">${t('builder.desc') || 'Создайте свою идеальную тренировку'}</p>
        
        <div id="builder-days">
          ${daysHtml}
        </div>
        
        <button id="btn-add-day" class="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl transition active:scale-[0.98] shadow-lg mb-4">
          ${t('builder.add_day') || '+ Добавить день'}
        </button>
        
        <button id="btn-save-plan" class="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl transition active:scale-[0.98] shadow-lg">
          ${t('builder.save_plan') || 'Сохранить программу'}
        </button>
      </div>

      <div id="picker-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center hidden opacity-0 transition-opacity">
        <div class="bg-appCard w-full max-w-md rounded-t-3xl p-5 transform translate-y-full transition-transform flex flex-col max-h-[85vh]" id="picker-modal-content">
          <div class="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 shrink-0"></div>
          <h3 class="text-xl font-bold mb-3 shrink-0">${t('builder.select_exercise') || 'Выберите упражнение'}</h3>
          
          <div class="flex gap-2 mb-4 overflow-x-auto hide-scrollbar shrink-0" id="picker-filters">
            <button class="px-3 py-1.5 bg-appAccent text-white text-xs font-semibold rounded-lg filter-btn" data-group="all">Все</button>
            ${[...new Set(allExercises.map(e => e.group))].map(g => `<button class="px-3 py-1.5 bg-white/5 text-gray-400 text-xs font-semibold rounded-lg filter-btn" data-group="${g}">${g}</button>`).join('')}
          </div>

          <div id="picker-list" class="flex-1 overflow-y-auto space-y-2 hide-scrollbar pb-4 min-h-[50vh]">
            <!-- Injected via JS -->
          </div>
          <button id="picker-modal-close" class="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl font-semibold mt-2 shrink-0 transition active:scale-95">${t('nutrition.cancel') || 'Отмена'}</button>
        </div>
      </div>
    `;

    attachListeners();
  };

  const renderPickerList = (filter = 'all') => {
    const listContainer = document.getElementById('picker-list');
    const filtered = filter === 'all' ? allExercises : allExercises.filter(e => e.group === filter);
    
    listContainer.innerHTML = filtered.map(ex => {
      let eq = ex.equipment === 'bodyweight' ? (window.miniappI18n.t('data.equipment_bodyweight') || 'Свой вес') : (ex.equipment === 'dumbbell' ? (window.miniappI18n.t('data.equipment_dumbbell') || 'Гантели') : (ex.equipment === 'barbell' ? (window.miniappI18n.t('data.equipment_barbell') || 'Штанга') : (window.miniappI18n.t('data.equipment_machine') || 'Тренажеры')));
      return `
        <button class="w-full text-left p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition flex items-center gap-3 picker-item-btn" data-id="${ex.id}">
          <div class="text-2xl">${ex.emoji}</div>
          <div>
            <p class="font-semibold text-sm text-white">${ex.name}</p>
            <p class="text-[10px] text-appAccent">${ex.group} • ${eq}</p>
          </div>
        </button>
      `;
    }).join('');

    document.querySelectorAll('.picker-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const exId = parseInt(e.currentTarget.dataset.id);
        if(activeDayIndex !== null) {
          const newExLog = Logic._createExerciseLog(exId, user, allExercises, customWeights);
          newExLog.targetSets = 3;
          newExLog.targetReps = '10-12';
          plan.sessions[activeDayIndex].exercises.push(newExLog);
          closePickerModal();
          render();
        }
      });
    });
  };

  const openPickerModal = (dIdx) => {
    activeDayIndex = dIdx;
    const modal = document.getElementById('picker-modal');
    const modalContent = document.getElementById('picker-modal-content');
    
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('bg-appAccent', 'text-white');
      b.classList.add('bg-white/5', 'text-gray-400');
    });
    const allBtn = document.querySelector('.filter-btn[data-group="all"]');
    if(allBtn) {
      allBtn.classList.add('bg-appAccent', 'text-white');
      allBtn.classList.remove('bg-white/5', 'text-gray-400');
    }
    
    renderPickerList('all');

    modal?.classList?.remove('hidden');
    setTimeout(() => {
      modal?.classList?.remove('opacity-0');
      modalContent?.classList?.remove('translate-y-full');
    }, 10);
  };

  const closePickerModal = () => {
    const modal = document.getElementById('picker-modal');
    const modalContent = document.getElementById('picker-modal-content');
    modal?.classList?.add('opacity-0');
    modalContent?.classList?.add('translate-y-full');
    setTimeout(() => modal?.classList?.add('hidden'), 300);
    activeDayIndex = null;
  };

  const attachListeners = () => {
    const t = window.miniappI18n.t.bind(window.miniappI18n);
    document.getElementById('btn-add-day')?.addEventListener('click', () => {
      plan.sessions.push({
        dayName: (t('builder.new_day') || 'Новая тренировка') + ' ' + (plan.sessions.length + 1),
        exercises: []
      });
      plan.daysPerWeek = plan.sessions.length;
      render();
    });

    document.querySelectorAll('.btn-del-day').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx);
        if(confirm(t('builder.confirm_del_day') || 'Точно удалить этот день?')) {
          plan.sessions.splice(idx, 1);
          plan.daysPerWeek = plan.sessions.length;
          render();
        }
      });
    });

    document.querySelectorAll('.btn-del-ex').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dIdx = parseInt(e.currentTarget.dataset.didx);
        const eIdx = parseInt(e.currentTarget.dataset.eidx);
        plan.sessions[dIdx].exercises.splice(eIdx, 1);
        render();
      });
    });

    document.querySelectorAll('.day-name-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const dIdx = parseInt(e.currentTarget.dataset.idx);
        plan.sessions[dIdx].dayName = e.currentTarget.value || 'Тренировка';
      });
    });

    document.querySelectorAll('.ex-sets-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const dIdx = parseInt(e.currentTarget.dataset.didx);
        const eIdx = parseInt(e.currentTarget.dataset.eidx);
        plan.sessions[dIdx].exercises[eIdx].targetSets = parseInt(e.currentTarget.value) || 3;
      });
    });

    document.querySelectorAll('.ex-reps-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const dIdx = parseInt(e.currentTarget.dataset.didx);
        const eIdx = parseInt(e.currentTarget.dataset.eidx);
        plan.sessions[dIdx].exercises[eIdx].targetReps = e.currentTarget.value || '10';
      });
    });

    document.querySelectorAll('.btn-add-ex').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dIdx = parseInt(e.currentTarget.dataset.idx);
        openPickerModal(dIdx);
      });
    });

    document.getElementById('btn-save-plan')?.addEventListener('click', async () => {
      if(plan.sessions.length === 0) return window.showToast(t('builder.err_empty') || 'Добавьте хотя бы один день!', 'error');
      await DataStore.saveWorkoutPlan(plan);
      window.haptic('success');
      window.showToast(t('builder.success_save') || '✅ Программа сохранена!');
      window.Router.navigate('dashboard');
    });

    document.getElementById('picker-modal-close')?.addEventListener('click', closePickerModal);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('bg-appAccent', 'text-white');
          b.classList.add('bg-white/5', 'text-gray-400');
        });
        e.currentTarget.classList.add('bg-appAccent', 'text-white');
        e.currentTarget.classList.remove('bg-white/5', 'text-gray-400');
        renderPickerList(e.currentTarget.dataset.group);
      });
    });
  };

  render();
};