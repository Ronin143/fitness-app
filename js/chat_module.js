window.Views.renderChat = async function(container, user) {
  const t = window.miniappI18n.t.bind(window.miniappI18n);
  const chatHistory = await DataStore.getChatHistory();
  const logs = await DataStore.getLogs();
  const MODEL_ID = "83980b26-79ba-4962-831f-8c1dc91a531a"; // Gemini 2.5 Flash

  container.innerHTML = `
    <div class="flex flex-col min-h-full pb-[180px] relative">
      <div id="chat-messages" class="flex-1 p-4 space-y-4 flex flex-col justify-end">
        <!-- Messages inject here -->
      </div>
    </div>
    
    <div class="fixed bottom-[80px] left-0 right-0 w-full px-4 z-30 pb-4 bg-gradient-to-t from-appBg via-appBg/95 to-transparent pt-10 pointer-events-none">
      <div class="max-w-md mx-auto relative pointer-events-auto flex flex-col gap-3">
        <!-- Quick Commands -->
        <div class="flex gap-2 overflow-x-auto hide-scrollbar w-full snap-x transition-opacity duration-300" id="chat-quick-cmds">
           <button class="quick-cmd-btn shrink-0 snap-start bg-appCard/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl text-xs font-medium text-gray-300 hover:text-white hover:border-appAccent transition active:scale-95 shadow-lg">${t('chat.cmd_1')}</button>
           <button class="quick-cmd-btn shrink-0 snap-start bg-appCard/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl text-xs font-medium text-gray-300 hover:text-white hover:border-appAccent transition active:scale-95 shadow-lg">${t('chat.cmd_5') || 'Оцени мою форму 📸'}</button>
           <button class="quick-cmd-btn shrink-0 snap-start bg-appCard/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl text-xs font-medium text-gray-300 hover:text-white hover:border-appAccent transition active:scale-95 shadow-lg">${t('chat.cmd_2')}</button>
           <button class="quick-cmd-btn shrink-0 snap-start bg-appCard/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl text-xs font-medium text-gray-300 hover:text-white hover:border-appAccent transition active:scale-95 shadow-lg">${t('chat.cmd_3')}</button>
        </div>

        <!-- Image Preview -->
        <div id="chat-preview-container" class="hidden px-2 pb-1">
          <div class="relative inline-block">
            <img id="chat-preview-img" class="h-16 w-16 object-cover rounded-xl border border-white/20 shadow-lg">
            <button id="chat-preview-remove" class="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs font-bold shadow-lg flex items-center justify-center">✕</button>
          </div>
        </div>

        <!-- Input Area -->
        <div class="bg-appCard/95 backdrop-blur-xl border border-white/10 p-2 rounded-3xl flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.6)] w-full transition-all" id="chat-input-wrapper">
          <label class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition shrink-0 bg-white/5 rounded-full ml-1" title="${t('chat.attach_photo') || 'Прикрепить фото'}">
            <input type="file" id="chat-file" accept="image/*" class="hidden">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </label>
          <input type="text" id="chat-input" placeholder="${t('chat.placeholder') || 'Задайте вопрос...'}" class="flex-1 bg-transparent border-none py-2 px-3 text-sm text-white focus:outline-none focus:ring-0" autocomplete="off">
          <button id="chat-send" class="w-10 h-10 bg-appAccent text-white rounded-full flex items-center justify-center hover:bg-appAccentHover active:scale-95 transition shrink-0 mr-1 shadow-md shadow-appAccent/20">
            <svg class="w-5 h-5 transform rotate-90 translate-x-[1px]" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  const chatContainer = document.getElementById('chat-messages');
  const containerElement = container;
  const fileInput = document.getElementById('chat-file');
  const previewContainer = document.getElementById('chat-preview-container');
  const previewImg = document.getElementById('chat-preview-img');
  const previewRemove = document.getElementById('chat-preview-remove');
  let currentFile = null;

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file) {
      currentFile = file;
      previewImg.src = URL.createObjectURL(file);
      previewContainer.classList.remove('hidden');
    }
  });

  previewRemove.addEventListener('click', () => {
    currentFile = null;
    fileInput.value = '';
    previewContainer.classList.add('hidden');
  });

  const appendMessage = (role, text, imgUrl = null) => {
    const isAI = role === 'assistant';
    const msgDiv = document.createElement('div');
    msgDiv.className = `flex ${isAI ? 'justify-start' : 'justify-end'} slide-up w-full`;
    
    let imgHtml = imgUrl ? `<img src="${imgUrl}" class="w-full max-w-[220px] rounded-xl mb-3 border border-white/10 shadow-sm mt-1">` : '';
    
    msgDiv.innerHTML = `
      <div class="max-w-[85%] rounded-2xl px-4 py-3 ${isAI ? 'bg-appCard border border-white/5 text-gray-200 rounded-tl-sm' : 'bg-appAccent text-white rounded-tr-sm shadow-lg shadow-appAccent/20'} overflow-hidden">
        ${isAI ? '<div class="text-[10px] text-appAccent font-bold mb-1 uppercase tracking-wider">' + (t('chat.ai_name') || 'Тренер') + '</div>' : ''}
        ${imgHtml}
        <div class="text-sm leading-relaxed whitespace-pre-wrap break-words">${text}</div>
      </div>
    `;
    chatContainer.appendChild(msgDiv);
    setTimeout(() => {
      containerElement.scrollTo({ top: containerElement.scrollHeight, behavior: 'smooth' });
    }, 50);
  };

  if (chatHistory && chatHistory.length > 0) {
    chatHistory.forEach(m => {
      if (m.imgUrl && m.imgUrl.startsWith('blob:')) m.imgUrl = null;
      if(m.role !== 'system') appendMessage(m.role, m.content, m.imgUrl);
    });
  }

  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const cmdsContainer = document.getElementById('chat-quick-cmds');
  let isWaiting = false;

  const sendMessage = async () => {
    const text = input.value.trim();
    if((!text && !currentFile) || isWaiting) return;

    input.value = '';
    isWaiting = true;
    sendBtn.innerHTML = `<span class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full block"></span>`;
    
    let fileId = null;
    let imgUrl = null;
    
    if (currentFile) {
      try {
        const uploaded = await miniappsAI.uploadFile(currentFile);
        fileId = uploaded.id;
        imgUrl = uploaded.path;
      } catch(e) {
        console.error("Upload failed", e);
        window.showToast(t('nutrition.scan_error') || 'Ошибка загрузки фото', 'error');
      }
      currentFile = null;
      previewContainer.classList.add('hidden');
      fileInput.value = '';
    }

    if(cmdsContainer) {
      cmdsContainer.style.opacity = '0';
      setTimeout(() => cmdsContainer.style.display = 'none', 300);
    }

    const fallbackText = text || (fileId ? 'Что ты можешь сказать по этому фото?' : '');
    appendMessage('user', fallbackText, imgUrl);
    chatHistory.push({ role: 'user', content: fallbackText, imgUrl });
    
    let eqList = user.equipment ? user.equipment.map(e => {
      if(e === 'bodyweight') return t('data.equipment_bodyweight');
      if(e === 'dumbbell') return t('data.equipment_dumbbell');
      if(e === 'barbell') return t('data.equipment_barbell');
      if(e === 'machine') return t('data.equipment_machine');
      return e;
    }).join(', ') : 'Свой вес';

    const systemPrompt = t('chat.prompt_context', {
      goal: user.goal,
      equipment: eqList,
      weight: user.weight,
      workouts: logs.workouts ? logs.workouts.length : 0
    }) || `Ты опытный фитнес-тренер Алекс. Цель: ${user.goal}, Вес: ${user.weight}кг. Если прислали фото формы или техники, дай профессиональную оценку, похвали и дай советы.`;
    
    const payloadMessages = [
      { role: 'system', content: systemPrompt }
    ];
    
    chatHistory.slice(-6, -1).forEach(m => {
      if(m.role !== 'system') payloadMessages.push({ role: m.role, content: m.content });
    });
    
    if (fileId) {
       payloadMessages.push({
         role: 'user',
         content: [
           { type: 'file_id', fileId: fileId },
           { type: 'text', text: fallbackText }
         ]
       });
    } else {
       payloadMessages.push({ role: 'user', content: fallbackText });
    }

    try {
      const result = await miniappsAI.callModel({
        modelId: MODEL_ID,
        messages: payloadMessages
      });
      
      const reply = miniappsAI.extractText(result) || (t('chat.fallback') || 'Извини, я задумался. Можешь повторить?');
      appendMessage('assistant', reply);
      chatHistory.push({ role: 'assistant', content: reply });
      await DataStore.saveChatHistory(chatHistory);

    } catch (err) {
      console.error("Chat error", err);
      appendMessage('assistant', t('chat.error') || 'Ошибка связи. Попробуйте позже.');
    } finally {
      isWaiting = false;
      sendBtn.innerHTML = `<svg class="w-5 h-5 transform rotate-90 translate-x-[1px]" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>`;
    }
  };

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') sendMessage();
  });

  document.querySelectorAll('.quick-cmd-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if(isWaiting) return;
      input.value = e.currentTarget.innerText;
      if (e.currentTarget.innerText.includes('📸')) {
        fileInput.click();
        input.value = 'Оцени мою форму!';
      } else {
        sendMessage();
      }
    });
  });
};
