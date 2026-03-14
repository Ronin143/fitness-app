window.Views = window.Views || {};

window.Views.renderProgress = async function(container, user) {
  const t = window.miniappI18n.t.bind(window.miniappI18n);
  Chart.defaults.color = (user.mode === 'light') ? '#4B5563' : '#9ca3af';
  Chart.defaults.borderColor = (user.mode === 'light') ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)';
  const logs = await DataStore.getLogs();
  
  if(logs.weight.length === 0) {
    const today = new Date();
    for(let i=4; i>=0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i*7);
      let mockW = user.weight;
      if(user.goal === 'cut') mockW = user.weight + i*0.5;
      if(user.goal === 'bulk') mockW = user.weight - i*0.5;
      logs.weight.push({ date: d.toISOString().split('T')[0], weight: mockW });
    }
    await DataStore.saveLogs(logs);
  }

  const totalWorkouts = logs.workouts.length;
  const currentWeight = logs.weight[logs.weight.length - 1].weight;
  const totalVolume = logs.workouts.reduce((acc, w) => acc + (w.volume || 0), 0);
  const measurements = await DataStore.getMeasurements();
  const todayStr = new Date().toISOString().split('T')[0];
  const activity = await DataStore.getActivityLog(todayStr);
  const last7Days = [];
  for(let i=6; i>=0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last7Days.push(d.toISOString().split('T')[0]);
  }
  const activityLogs7 = await Promise.all(last7Days.map(d => DataStore.getActivityLog(d)));
  let progTab = window._progTab || 'weight';

  const achievements = [
    { id: 'first_blood', icon: '🩸', name: t('progress.ach_first_blood') || 'Первый шаг', desc: t('progress.ach_first_blood_desc') || 'Первая тренировка', unlocked: totalWorkouts > 0 },
    { id: 'machine', icon: '🚜', name: t('progress.ach_machine') || 'Машина', desc: t('progress.ach_machine_desc') || 'Более 1500 кг', unlocked: totalVolume >= 1500 },
    { id: 'streak_3', icon: '🔥', name: t('progress.ach_streak') || 'В ритме', desc: t('progress.ach_streak_desc', {days: 3}) || 'Стрик 3 дня', unlocked: (user.streak || 0) >= 3 },
    { id: 'streak_7', icon: '⚡', name: t('progress.ach_streak') || 'Дисциплина', desc: t('progress.ach_streak_desc', {days: 7}) || 'Стрик 7 дней', unlocked: (user.streak || 0) >= 7 },
  ];
  let achHtml = '<h3 class="text-lg font-bold mb-3 mt-8">' + (t('progress.achievements_title') || '🏆 Достижения') + '</h3><div class="grid grid-cols-2 gap-3 mb-6">';
  achievements.forEach(a => {
    achHtml += `
      <div class="bg-appCard border border-white/5 rounded-xl p-3 flex items-center gap-3 ${a.unlocked ? '' : 'opacity-40 grayscale'}">
        <div class="text-3xl">${a.icon}</div>
        <div>
          <p class="font-bold text-sm text-white leading-tight">${a.name}</p>
          <p class="text-[10px] text-gray-400 leading-tight mt-1">${a.unlocked ? a.desc : (t('progress.locked') || 'Не открыто')}</p>
            ${a.unlocked ? `<button class="btn-share-ach text-[10px] bg-appAccent/20 text-appAccent hover:bg-appAccent/40 px-2 py-1 rounded transition mt-1" data-name="${a.name}">↗ ${t('progress.share_btn') || 'Поделиться'}</button>` : ''}
        </div>
      </div>
    `;
  });
  achHtml += '</div>';

  let historyHtml = '';
  if(totalWorkouts === 0) {
    historyHtml = `
      <div class="flex flex-col items-center justify-center py-8 px-4 text-center empty-glow-card relative bg-white/5 border border-white/5 rounded-3xl border-dashed mb-4">
        <div class="text-5xl mb-4 drop-shadow-lg">📉</div>
        <h4 class="text-white font-bold mb-1">${t('progress.empty_history_title')}</h4>
        <p class="text-xs text-gray-400 max-w-[220px]">${t('progress.empty_history_desc')}</p>
      </div>
    `;
  } else {
    [...logs.workouts].reverse().forEach(w => {
      historyHtml += `
        <div class="bg-appCard border border-white/5 rounded-xl p-3 mb-2 flex justify-between items-center">
          <div>
            <p class="font-semibold text-white text-sm">${w.sessionName}</p>
            <p class="text-xs text-gray-400">${w.date}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-appAccent">${t('progress.stat_volume')}: ${w.volume || 0} ${t('progress.volume_unit')}</p>
            <p class="text-[10px] text-gray-400 tracking-wide">${w.completionRatio}</p>
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = `
    <div class="fade-in p-5">
      <h2 class="text-2xl font-bold mb-6">${t('progress.title')}</h2>
      
      <!-- Tabs -->
      <div class="flex bg-white/5 rounded-xl p-1 mb-6">
        <button class="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors prog-tab-btn ${progTab==='weight' ? 'bg-appCard text-white shadow' : 'text-gray-400 hover:text-white'}" data-tab="weight">${t('progress.tab_weight') || 'Вес'}</button>
        <button class="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors prog-tab-btn ${progTab==='measure' ? 'bg-appCard text-white shadow' : 'text-gray-400 hover:text-white'}" data-tab="measure">${t('progress.tab_measure') || 'Объемы'}</button>          <button class="flex-1 py-2 text-sm font-semibold rounded-lg transition-colors prog-tab-btn ${progTab==='activity' ? 'bg-appCard text-white shadow' : 'text-gray-400 hover:text-white'}" data-tab="activity">${t('progress.tab_activity') || 'Активность'}</button>
      </div>

      ${progTab === 'weight' ? `
      <!-- Export/Import -->
      <button id="btn-export-png" class="w-full bg-gradient-to-r from-purple-600 to-appAccent hover:opacity-90 text-white font-bold py-4 rounded-xl mb-6 transition active:scale-[0.98] shadow-lg shadow-appAccent/30 flex items-center justify-center gap-2">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
        ${t('progress.export_png') || 'Экспорт в картинку (PNG)'}
      </button>
      <div id="exportable-stats-container" class="bg-appBg/40 p-1 -mx-1 rounded-3xl">
      <!-- Stats Grid -->
      <div class="grid grid-cols-3 gap-3 mb-6">
        <div class="bg-appCard border border-white/5 rounded-2xl p-4 text-center">
          <p class="text-2xl font-bold text-white">${totalWorkouts}</p>
          <p class="text-[10px] text-gray-400 uppercase tracking-wide mt-1">${t('progress.stat_workouts')}</p>
        </div>
        <div class="bg-appCard border border-white/5 rounded-2xl p-4 text-center">
          <p class="text-2xl font-bold text-appAccent" id="current-weight-display">${currentWeight}</p>
          <p class="text-[10px] text-gray-400 uppercase tracking-wide mt-1">${t('progress.stat_weight')}</p>
        </div>
        <div class="bg-appCard border border-white/5 rounded-2xl p-4 text-center">
          <p class="text-2xl font-bold text-white">${totalVolume}</p>
          <p class="text-[10px] text-gray-400 uppercase tracking-wide mt-1">${t('progress.stat_volume')}</p>
        </div>
      </div>

      <!-- Update Weight Form -->
      <div class="flex gap-2 mb-6">
        <input type="number" id="new-weight-input" placeholder="${t('progress.weight_placeholder')}" class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-appAccent">
        <button id="btn-save-weight" class="bg-appAccent hover:bg-appAccentHover text-white font-semibold px-4 py-3 rounded-xl transition active:scale-95">
          ${t('progress.save')}
        </button>
      </div>

      <!-- Chart -->
      <div class="bg-appCard border border-white/5 rounded-2xl p-4 mb-6">
        <h3 class="text-sm font-bold mb-4">${t('progress.chart_title')}</h3>
        <div class="relative w-full h-48">
          <canvas id="weightChart"></canvas>
        </div>
      </div>
      </div>
      ` : progTab === 'measure' ? `
      <!-- Measurements View -->
      <div class="bg-appCard border border-white/5 rounded-2xl p-4 mb-6">
        <h3 class="text-sm font-bold mb-4">${t('progress.measurements_title') || 'Замеры тела (см)'}</h3>
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div><label class="text-xs text-gray-400">${t('progress.measure_chest') || 'Грудь'}</label><input type="number" id="m-chest" class="w-full bg-white/5 rounded-lg p-2 mt-1 text-white border border-white/10" value="${measurements.chest[measurements.chest.length-1] || ''}"></div>
          <div><label class="text-xs text-gray-400">${t('progress.measure_waist') || 'Талия'}</label><input type="number" id="m-waist" class="w-full bg-white/5 rounded-lg p-2 mt-1 text-white border border-white/10" value="${measurements.waist[measurements.waist.length-1] || ''}"></div>
          <div><label class="text-xs text-gray-400">${t('progress.measure_hips') || 'Бедра'}</label><input type="number" id="m-hips" class="w-full bg-white/5 rounded-lg p-2 mt-1 text-white border border-white/10" value="${measurements.hips[measurements.hips.length-1] || ''}"></div>
          <div><label class="text-xs text-gray-400">${t('progress.measure_biceps') || 'Бицепс'}</label><input type="number" id="m-biceps" class="w-full bg-white/5 rounded-lg p-2 mt-1 text-white border border-white/10" value="${measurements.biceps[measurements.biceps.length-1] || ''}"></div>
        </div>
        <button id="btn-save-measure" class="w-full bg-appAccent hover:bg-appAccentHover text-white font-semibold py-3 rounded-xl transition active:scale-95 mb-6">${t('progress.save_measure') || 'Сохранить замеры'}</button>
        <div class="relative w-full h-48">
          <canvas id="measureChart"></canvas>
        </div>
      </div>
      ` : progTab === 'activity' ? `
      <!-- Activity Widgets -->
      <h3 class="text-lg font-bold mb-4">${t('progress.daily_activity') || 'Активность за сегодня'}</h3>
      <div class="space-y-4 mb-8">
        
        <!-- Water -->
        <div class="bg-appCard border border-white/5 rounded-2xl p-4 shadow-lg flex flex-col relative overflow-hidden">
          <div class="flex justify-between items-center mb-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-2xl">💧</div>
              <div>
                <p class="font-bold text-white">${t('dashboard.widget_water') || 'Выпито воды'}</p>
                <p class="text-xs text-gray-400 mt-1"><span id="water-val-prog" class="font-bold text-blue-400 text-sm">${activity.water}</span> / 2000 мл</p>
              </div>
            </div>
            <button id="btn-add-water-prog" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-3 rounded-xl transition active:scale-95 text-xs shadow-lg shadow-blue-500/30 shrink-0 whitespace-nowrap">+250 мл</button>
          </div>
          <div class="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-1">
            <div id="water-bar" class="h-full bg-blue-500 transition-all duration-500" style="width: ${Math.min(100, (activity.water/2000)*100)}%"></div>
          </div>
        </div>

        <!-- Steps -->
        <div class="bg-appCard border border-white/5 rounded-2xl p-4 shadow-lg flex flex-col relative overflow-hidden">
          <div class="flex justify-between items-center mb-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center text-2xl">👟</div>
              <div>
                <p class="font-bold text-white">${t('dashboard.widget_steps') || 'Шаги за день'}</p>
                <p class="text-xs text-gray-400 mt-1"><span id="steps-val-prog" class="font-bold text-green-400 text-sm">${activity.steps}</span> / 10000 шаг.</p>
              </div>
            </div>
            <button class="btn-edit-activity bg-white/10 hover:bg-white/20 text-white font-semibold py-1.5 px-3 rounded-xl transition active:scale-95 text-xs border border-white/5 shrink-0 flex items-center gap-1.5 whitespace-nowrap" data-type="steps" data-val="${activity.steps}">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              Изменить
            </button>
          </div>
          <div class="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-1">
            <div id="steps-bar" class="h-full bg-green-500 transition-all duration-500" style="width: ${Math.min(100, (activity.steps/10000)*100)}%"></div>
          </div>
        </div>

        <!-- Sleep -->
        <div class="bg-appCard border border-white/5 rounded-2xl p-4 shadow-lg flex flex-col relative overflow-hidden">
          <div class="flex justify-between items-center mb-3">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-2xl">🌙</div>
              <div>
                <p class="font-bold text-white">${t('dashboard.widget_sleep') || 'Время сна'}</p>
                <p class="text-xs text-gray-400 mt-1"><span id="sleep-val-prog" class="font-bold text-indigo-400 text-sm">${activity.sleep}</span> / 8 ч.</p>
              </div>
            </div>
            <button class="btn-edit-activity bg-white/10 hover:bg-white/20 text-white font-semibold py-1.5 px-3 rounded-xl transition active:scale-95 text-xs border border-white/5 shrink-0 flex items-center gap-1.5 whitespace-nowrap" data-type="sleep" data-val="${activity.sleep}">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              Изменить
            </button>
          </div>
          <div class="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-1">
            <div id="sleep-bar" class="h-full bg-indigo-500 transition-all duration-500" style="width: ${Math.min(100, (activity.sleep/8)*100)}%"></div>
          </div>
        </div>

      </div>
      <!-- Activity/Volume View -->
      <div class="bg-appCard border border-white/5 rounded-2xl p-4 mb-6">
        <h3 class="text-sm font-bold mb-4">${t('progress.chart_volume_title') || 'Тоннаж (объем нагрузки)'}</h3>
        <div class="relative w-full h-48">
          <canvas id="activityChart"></canvas>
        </div>
      </div>
      <!-- Steps View -->
      <div class="bg-appCard border border-white/5 rounded-2xl p-4 mb-6 shadow-lg shadow-appAccent/5">
        <h3 class="text-sm font-bold mb-4 flex items-center justify-between">
          <span>👟 Шаги (за 7 дней)</span>
          <span class="text-xs text-appAccent bg-appAccent/20 px-2 py-1 rounded-md">Цель: 10000</span>
        </h3>
        <div class="relative w-full h-48">
          <canvas id="stepsChart"></canvas>
        </div>
      </div>
      ` : ''}

      ${achHtml}

      <!-- History -->
      <h3 class="text-lg font-bold mb-3">${t('progress.history_title')}</h3>
      <div class="space-y-2 tab-content-enter">
        ${historyHtml}
      </div>

      <!-- Export/Import -->
      <div class="grid grid-cols-2 gap-3 mt-8 mb-4">
        <button id="btn-export" class="bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-semibold transition active:scale-95">💾 ${t('progress.export_data') || 'Экспорт'}</button>
        <label class="bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-semibold transition active:scale-95 flex items-center justify-center cursor-pointer">
          📁 ${t('progress.import_data') || 'Импорт'}
          <input type="file" id="btn-import" accept=".json" class="hidden">
        </label>
      </div>

      <button id="btn-reset-profile" class="w-full border border-red-500/30 text-red-400 hover:bg-red-500/10 py-4 rounded-xl mb-4 font-semibold transition active:scale-95">
        ${t('progress.reset_profile')}
      </button>
    </div>

    <!-- Activity Edit Modal -->
    <div id="activity-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center hidden opacity-0 transition-opacity">
      <div class="bg-appCard w-full max-w-md rounded-t-3xl p-6 transform translate-y-full transition-transform flex flex-col" id="activity-modal-content">
        <div class="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6 shrink-0"></div>
        <h3 class="text-xl font-bold mb-2 text-center" id="activity-modal-title">Изменить</h3>
        <p class="text-sm text-gray-400 text-center mb-6" id="activity-modal-desc"></p>
        
        <div class="flex justify-center mb-8">
          <input type="number" id="activity-modal-input" class="w-32 bg-transparent text-5xl text-white font-bold text-center border-b-2 border-appAccent focus:outline-none pb-2 placeholder-white/20">
        </div>
        
        <div class="flex gap-3 mt-auto pb-4">
          <button id="activity-modal-close" class="flex-1 bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold transition active:scale-95 text-white">Отмена</button>
          <button id="activity-modal-save" class="flex-1 bg-appAccent hover:bg-appAccentHover py-4 rounded-xl font-bold transition active:scale-[0.98] text-white shadow-lg shadow-appAccent/30">Сохранить</button>
        </div>
      </div>
    </div>

    <!-- Share Modal -->
    <div id="share-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center hidden opacity-0 transition-opacity">
      <div class="bg-appCard w-full max-w-md rounded-t-3xl p-5 transform translate-y-full transition-transform" id="share-modal-content">
        <div class="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 shrink-0"></div>
        <h3 class="text-xl font-bold mb-6 text-center">${t('progress.share_title') || 'Поделиться в соцсетях'}</h3>
        
        <div class="grid grid-cols-3 gap-3 mb-6">
          <button id="share-tg" class="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition active:scale-95">
            <div class="w-12 h-12 bg-[#0088cc] rounded-full flex items-center justify-center text-white">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/></svg>
            </div>
            <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">${t('progress.share_tg') || 'Telegram'}</span>
          </button>
          <button id="share-wa" class="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition active:scale-95">
            <div class="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.398 0 .012 5.385.012 12.016c0 2.12.552 4.185 1.6 6.002L.002 24l6.124-1.606c1.764.954 3.754 1.458 5.807 1.458 6.634 0 12.022-5.386 12.022-12.017C23.955 5.385 18.566 0 12.031 0zm0 21.854c-1.8 0-3.565-.483-5.115-1.401l-.367-.217-3.801.996.997-3.706-.239-.379c-1.006-1.597-1.536-3.447-1.536-5.353 0-5.524 4.498-10.021 10.023-10.021 5.525 0 10.022 4.498 10.022 10.021 0 5.525-4.497 10.022-10.022 10.022zm5.498-7.513c-.301-.151-1.785-.881-2.062-.982-.278-.101-.481-.151-.683.151-.202.302-.782.982-.958 1.183-.176.201-.352.226-.653.075-1.54-.775-2.68-1.488-3.714-3.25-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.527-.075-.151-.683-1.646-.935-2.254-.247-.593-.497-.513-.683-.522l-.582-.01c-.201 0-.528.075-.805.377-.276.302-1.056 1.031-1.056 2.515 0 1.484 1.082 2.918 1.233 3.119.151.201 2.127 3.245 5.151 4.548 2.053.882 2.825.961 3.914.808 1.229-.172 2.81-1.147 3.204-2.254.394-1.107.394-2.054.276-2.254-.118-.201-.42-.301-.722-.452z"/></svg>
            </div>
            <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">${t('progress.share_wa') || 'WhatsApp'}</span>
          </button>
          <button id="share-copy" class="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition active:scale-95">
            <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/20">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            </div>
            <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider" id="share-copy-text">${t('progress.share_copy') || 'Ссылка'}</span>
          </button>
        </div>
        
        <button id="share-modal-close" class="w-full bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold transition active:scale-95">${t('workout.rest_close') || 'Закрыть'}</button>
      </div>
    </div>
  `;

  // Initialize Chart
  let weightChart = null;
  let chartLabels = [];
  let chartData = [];

  const weightCanvas = document.getElementById('weightChart');
  if (weightCanvas) {
    const ctx = weightCanvas.getContext('2d');
    chartLabels = logs.weight.map(w => {
      const parts = w.date.split('-');
      return `${parts[2]}.${parts[1]}`;
    });
    chartData = logs.weight.map(w => w.weight);
    
    const minWeight = Math.min(...chartData);
    const maxWeight = Math.max(...chartData);

    const rootStyles = getComputedStyle(document.documentElement);
    const accentRgb = rootStyles.getPropertyValue('--color-accent-rgb').trim() || '59, 130, 246';
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, `rgba(${accentRgb}, 0.5)`);
    gradient.addColorStop(1, `rgba(${accentRgb}, 0.0)`);

    weightChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [{
        label: t('progress.stat_weight'),
        data: chartData,
        borderColor: `rgb(${accentRgb})`,
        backgroundColor: gradient,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: `rgb(${accentRgb})`,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { 
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(26, 26, 26, 0.95)',
          titleColor: '#9ca3af',
          bodyColor: '#fff',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          cornerRadius: 12,
          callbacks: {
            label: (ctx) => `${ctx.raw} ${t('progress.kg')}`
          }
        }
      },
      scales: {
        y: { 
          suggestedMin: minWeight - 2, 
          suggestedMax: maxWeight + 2,
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
  }

  // Export PNG
  const btnExportPng = document.getElementById('btn-export-png');
  if(btnExportPng) btnExportPng.addEventListener('click', async () => {
    const originalHtml = btnExportPng.innerHTML;
    btnExportPng.innerHTML = `<span class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full block mx-auto"></span>`;
    try {
      const containerToExport = document.getElementById('exportable-stats-container');
      const canvas = await html2canvas(containerToExport, { backgroundColor: user.mode === 'light' ? '#f3f4f6' : '#0A0A0A', scale: 2 });
      const link = document.createElement('a');
      link.download = 'fitness_stats.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch(e) {
      console.error('Export failed', e);
      window.showToast('Ошибка при экспорте изображения', 'error');
    } finally {
      btnExportPng.innerHTML = originalHtml;
    }
  });

  // Export / Import JSON
  const btnExport = document.getElementById('btn-export');
  if(btnExport) btnExport.addEventListener('click', async () => {
    const data = await DataStore.exportAll();
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'fitness_profile.json'; a.click();
    URL.revokeObjectURL(url);
  });
  const btnImport = document.getElementById('btn-import');
  if(btnImport) btnImport.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        await DataStore.importAll(data);
        window.showToast('✅ Данные успешно импортированы!');
        window.location.reload();
      } catch(err) {
        window.showToast('Ошибка импорта!', 'error');
      }
    };
    reader.readAsText(file);
  });

  // Progress Tabs
  document.querySelectorAll('.prog-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      window._progTab = e.currentTarget.dataset.tab;
      window.Router.navigate('progress');
    });
  });

  // Save Measure
  const btnSaveMeasure = document.getElementById('btn-save-measure');
  if(btnSaveMeasure) btnSaveMeasure.addEventListener('click', async () => {
    const todayStr = new Date().toISOString().split('T')[0];
    await DataStore.addMeasurement(todayStr, {
      chest: parseFloat(document.getElementById('m-chest').value) || 0,
      waist: parseFloat(document.getElementById('m-waist').value) || 0,
      hips: parseFloat(document.getElementById('m-hips').value) || 0,
      biceps: parseFloat(document.getElementById('m-biceps').value) || 0
    });
    window.haptic('success');
    window.showToast('✅ Замеры сохранены!');
    window.Router.navigate('progress');
  });

  // Measure Chart
  if (progTab === 'measure' && measurements.dates.length > 0) {
    const ctxM = document.getElementById('measureChart').getContext('2d');
    new Chart(ctxM, {
      type: 'line',
      data: {
        labels: measurements.dates.map(d => `${d.split('-')[2]}.${d.split('-')[1]}`),
        datasets: [
          { label: t('progress.measure_chest') || 'Грудь', data: measurements.chest, borderColor: '#ef4444', tension: 0.4 },
          { label: t('progress.measure_waist') || 'Талия', data: measurements.waist, borderColor: '#3b82f6', tension: 0.4 },
          { label: t('progress.measure_hips') || 'Бедра', data: measurements.hips, borderColor: '#10b981', tension: 0.4 },
          { label: t('progress.measure_biceps') || 'Бицепс', data: measurements.biceps, borderColor: '#f59e0b', tension: 0.4 }
        ]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false, 
        interaction: { mode: 'index', intersect: false },
        plugins: { 
          legend: { position: 'bottom', labels: {color: '#9ca3af', usePointStyle: true} },
          tooltip: {
            backgroundColor: user.mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(26, 26, 26, 0.95)',
            titleColor: user.mode === 'light' ? '#4B5563' : '#9ca3af',
            bodyColor: user.mode === 'light' ? '#111827' : '#fff',
            borderColor: user.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 12
          }
        }, 
        scales: { 
          y: { grid: { color: 'rgba(255,255,255,0.05)' } }, 
          x: { grid: { display: false } } 
        } 
      }
    });
  }

  // Activity Chart (Volume per day)
  if (progTab === 'activity') {
    const workoutsByDate = {};
    logs.workouts.forEach(w => {
       if(!workoutsByDate[w.date]) workoutsByDate[w.date] = 0;
       workoutsByDate[w.date] += (w.volume || 0);
    });
    let sortedDates = Object.keys(workoutsByDate).sort();
    
    if(sortedDates.length === 0) {
       const today = new Date();
       for(let i=4; i>=0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i*3);
          const dStr = d.toISOString().split('T')[0];
          workoutsByDate[dStr] = Math.floor(Math.random() * 2000) + 1500;
       }
       sortedDates = Object.keys(workoutsByDate).sort();
    }

    const activityLabels = sortedDates.map(d => `${d.split('-')[2]}.${d.split('-')[1]}`);
    const activityData = sortedDates.map(d => workoutsByDate[d]);
    const ctxA = document.getElementById('activityChart').getContext('2d');
    
    const rootStyles = getComputedStyle(document.documentElement);
    const accentRgb = rootStyles.getPropertyValue('--color-accent-rgb').trim() || '59, 130, 246';

    new Chart(ctxA, {
      type: 'bar',
      data: {
        labels: activityLabels,
        datasets: [{
          label: t('progress.stat_volume') || 'Тоннаж',
          data: activityData,
          backgroundColor: `rgba(${accentRgb}, 0.8)`,
          borderRadius: 6,
          barThickness: 16
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: user.mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(26, 26, 26, 0.95)',
            titleColor: user.mode === 'light' ? '#4B5563' : '#9ca3af',
            bodyColor: user.mode === 'light' ? '#111827' : '#fff',
            borderColor: user.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 12,
            callbacks: {
              label: (ctx) => `${ctx.raw} ${t('progress.kg') || 'кг'}`
            }
          }
        },
        scales: {
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, beginAtZero: true },
          x: { grid: { display: false } }
        }
      }
    });

    // Steps Chart
    const ctxS = document.getElementById('stepsChart').getContext('2d');
    const stepsLabels = last7Days.map(d => `${d.split('-')[2]}.${d.split('-')[1]}`);
    const stepsData = activityLogs7.map((log, i) => {
       // Mock data if none exists
       if (!log.steps || log.steps === 0) {
         if (last7Days[i] !== todayStr) return Math.floor(Math.random() * 5000) + 3000;
         return 0;
       }
       return log.steps;
    });

    const stepGradient = ctxS.createLinearGradient(0, 0, 0, 200);
    stepGradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
    stepGradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    new Chart(ctxS, {
      type: 'line',
      data: {
        labels: stepsLabels,
        datasets: [{
          label: 'Шаги',
          data: stepsData,
          borderColor: '#10b981', // green
          backgroundColor: stepGradient,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: user.mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(26, 26, 26, 0.95)',
            titleColor: user.mode === 'light' ? '#4B5563' : '#9ca3af',
            bodyColor: user.mode === 'light' ? '#111827' : '#fff',
            borderColor: user.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 12,
            callbacks: {
              label: (ctx) => `${ctx.raw} шагов`
            }
          }
        },
        scales: {
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, suggestedMax: 10000 },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Share logic
  let currentShareText = '';
  document.querySelectorAll('.btn-share-ach').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const achName = e.currentTarget.dataset.name;
      currentShareText = t('progress.share_text', {ach: achName}) || `Я получил достижение «${achName}» в Фитнес-Тренере! Присоединяйся!`;
      
      const m = document.getElementById('share-modal');
      const mc = document.getElementById('share-modal-content');
      m?.classList?.remove('hidden');
      setTimeout(() => { m?.classList?.remove('opacity-0'); mc?.classList?.remove('translate-y-full'); }, 10);
    });
  });

  const closeShareModal = () => {
    const m = document.getElementById('share-modal');
    const mc = document.getElementById('share-modal-content');
    m?.classList?.add('opacity-0'); mc?.classList?.add('translate-y-full');
    setTimeout(() => m?.classList?.add('hidden'), 300);
  };

  document.getElementById('share-modal-close')?.addEventListener('click', closeShareModal);
  document.getElementById('share-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'share-modal') closeShareModal();
  });

  document.getElementById('share-tg')?.addEventListener('click', () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(currentShareText)}`, '_blank');
  });
  document.getElementById('share-wa')?.addEventListener('click', () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(currentShareText + ' ' + window.location.href)}`, '_blank');
  });
  document.getElementById('share-copy')?.addEventListener('click', () => {
    navigator.clipboard.writeText(currentShareText + ' ' + window.location.href).then(() => {
      const span = document.getElementById('share-copy-text');
      const old = span.innerText;
      span.innerText = t('progress.copied') || 'Скопировано!';
      setTimeout(() => span.innerText = old, 2000);
    });
  });

  // Handle Weight Update
  document.getElementById('btn-save-weight')?.addEventListener('click', async () => {
    const input = document.getElementById('new-weight-input');
    const val = parseFloat(input.value);
    if(val && val > 30 && val < 250) {
      const todayStr = new Date().toISOString().split('T')[0];
      
      // Update Chart array
      const existingIdx = logs.weight.findIndex(w => w.date === todayStr);
      if(existingIdx > -1) {
        logs.weight[existingIdx].weight = val;
        chartData[existingIdx] = val;
      } else {
        logs.weight.push({ date: todayStr, weight: val });
        chartLabels.push(`${todayStr.split('-')[2]}.${todayStr.split('-')[1]}`);
        chartData.push(val);
      }

      if (weightChart) weightChart.update();
      document.getElementById('current-weight-display').innerText = val;
      input.value = '';
      
      await DataStore.addWeightLog(todayStr, val);
    }
  });

  const btnWaterProg = document.getElementById('btn-add-water-prog');
  if (btnWaterProg) {
    btnWaterProg.addEventListener('click', async () => {
      activity.water += 250;
      await DataStore.saveActivityLog(todayStr, activity);
      document.getElementById('water-val-prog').innerText = activity.water;
      const bar = document.getElementById('water-bar');
      if(bar) bar.style.width = Math.min(100, (activity.water/2000)*100) + '%';
      window.haptic('medium');
      window.showToast(`💦 +250 мл воды (${activity.water} мл)`);
    });
  }

  let activeEditType = null;
  const activityModal = document.getElementById('activity-modal');
  const activityModalContent = document.getElementById('activity-modal-content');
  const activityModalInput = document.getElementById('activity-modal-input');
  
  const openActivityModal = (type, currentVal) => {
    activeEditType = type;
    activityModalInput.value = currentVal;
    
    const isSteps = type === 'steps';
    document.getElementById('activity-modal-title').innerText = isSteps ? (t('dashboard.widget_steps') || 'Шаги за день') : (t('dashboard.widget_sleep') || 'Время сна');
    document.getElementById('activity-modal-desc').innerText = isSteps ? 'Укажите, сколько шагов вы прошли сегодня' : 'Укажите, сколько часов вы спали (например: 7.5)';
    
    activityModal?.classList?.remove('hidden');
    setTimeout(() => { 
      activityModal?.classList?.remove('opacity-0'); 
      activityModalContent?.classList?.remove('translate-y-full'); 
      activityModalInput?.focus();
    }, 10);
  };

  const closeActivityModal = () => {
    activityModal?.classList?.add('opacity-0'); 
    activityModalContent?.classList?.add('translate-y-full');
    setTimeout(() => activityModal?.classList?.add('hidden'), 300);
    activeEditType = null;
  };

  document.querySelectorAll('.btn-edit-activity').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.currentTarget.dataset.type;
      const val = e.currentTarget.dataset.val;
      openActivityModal(type, val);
    });
  });

  document.getElementById('activity-modal-close')?.addEventListener('click', closeActivityModal);
  document.getElementById('activity-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'activity-modal') closeActivityModal();
  });

  document.getElementById('activity-modal-save')?.addEventListener('click', async () => {
    if(!activeEditType) return;
    const valStr = activityModalInput.value.replace(',', '.');
    const val = activeEditType === 'steps' ? parseInt(valStr) : parseFloat(valStr);
    
    if (!isNaN(val) && val >= 0) {
      if(activeEditType === 'steps') {
        activity.steps = val;
        document.getElementById('steps-val-prog').innerText = activity.steps;
        document.querySelector('.btn-edit-activity[data-type="steps"]').dataset.val = activity.steps;
        const bar = document.getElementById('steps-bar');
        if(bar) bar.style.width = Math.min(100, (activity.steps/10000)*100) + '%';
      } else {
        activity.sleep = val;
        document.getElementById('sleep-val-prog').innerText = activity.sleep;
        document.querySelector('.btn-edit-activity[data-type="sleep"]').dataset.val = activity.sleep;
        const bar = document.getElementById('sleep-bar');
        if(bar) bar.style.width = Math.min(100, (activity.sleep/8)*100) + '%';
      }
      await DataStore.saveActivityLog(todayStr, activity);
      window.haptic('success');
      window.showToast(activeEditType === 'steps' ? '👟 Шаги: ' + activity.steps : '🌙 Сон: ' + activity.sleep + ' ч');
    }
    closeActivityModal();
  });

  const resetBtn = document.getElementById('btn-reset-profile');
  if(resetBtn) {
    resetBtn.addEventListener('click', async () => {
      if(confirm(t('progress.confirm_reset'))) {
        await DataStore.clearUser();
        window.Router.navigate('onboarding');
      }
    });
  }
};