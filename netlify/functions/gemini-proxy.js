// netlify/functions/gemini-proxy.js
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // ключ будет передан через переменные окружения Netlify
// Список моделей для перебора (как было в клиенте)
const MODELS = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro'];

exports.handler = async (event) => {
  // Настройка CORS (разрешаем запросы с вашего домена)
  const headers = {
    'Access-Control-Allow-Origin': '*', // В продакшене лучше заменить на ваш домен, например https://ваш-аккаунт.github.io
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Обработка preflight-запроса (OPTIONS)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body);

    // Здесь повторяем логику формирования запроса к Gemini, которая была в клиенте
    let systemInstruction = null;
    const contents = [];

    for (const msg of messages) {
      if (msg.role === 'system') {
        systemInstruction = { parts: [{ text: msg.content }] };
      } else {
        let parts = [];
        if (Array.isArray(msg.content)) {
          for (const c of msg.content) {
            if (c.type === 'text') parts.push({ text: c.text });
            if (c.type === 'file_id' || c.type === 'image_url') {
              const base64Data = (c.fileId || c.url || '');
              if (base64Data.startsWith('data:image')) {
                const mime = base64Data.match(/data:(.*?);/)?.[1] || 'image/jpeg';
                const b64 = base64Data.split(',')[1];
                parts.push({ inline_data: { mime_type: mime, data: b64 } });
              }
            }
          }
        } else {
          parts.push({ text: msg.content });
        }
        if (parts.length > 0) {
          contents.push({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: parts
          });
        }
      }
    }

    // Слияние последовательных сообщений от одной роли (как было в клиенте)
    const mergedContents = [];
    for (const c of contents) {
      if (mergedContents.length > 0 && mergedContents[mergedContents.length - 1].role === c.role) {
        mergedContents[mergedContents.length - 1].parts.push(...c.parts);
      } else {
        mergedContents.push(c);
      }
    }
    const body = { contents: mergedContents };
    if (systemInstruction) body.system_instruction = systemInstruction;

    // Перебор моделей, пока не получим успешный ответ
    let data = null;
    let lastError = "Не удалось подключиться к ИИ";

    for (const modelName of MODELS) {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      data = await res.json();

      if (data.error) {
        lastError = data.error.message;
        if (lastError.includes('not found') || data.error.code === 404) {
          continue;
        } else {
          throw new Error(lastError);
        }
      }
      break;
    }

    if (!data || data.error) throw new Error(lastError);

    let reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

    if (reply.includes('```')) {
      reply = reply.replace(/```(json)?/g, '').trim();
    }

    // Возвращаем ответ в том же формате, который ожидает клиент
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ output: [{ type: 'text', text: reply }] })
    };

  } catch (error) {
    console.error('Proxy Error:', error);
    const isTechCall = event.body?.includes('ТОЛЬКО валидный JSON');
    const errorMessage = isTechCall ? '{}' : 'Ошибка при запросе к Gemini: ' + error.message;
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ output: [{ type: 'text', text: errorMessage }] })
    };
  }
};