// ==========================================
// NEXUSIQ GLOBAL APP UTILITIES & AI HANDLER
// ==========================================

// Global state
const AppState = {
  selectedLanguage: 'en',
  geminiApiKey: localStorage.getItem('nexus_gemini_api_key') || '',
  isVoiceActive: false,
  isRecording: false
};

// Available languages & flags
const Languages = {
  en: { name: 'English', flag: '🇺🇸' },
  ar: { name: 'العربية (Arabic)', flag: '🇸🇦' },
  es: { name: 'Español (Spanish)', flag: '🇪🇸' },
  fr: { name: 'Français (French)', flag: '🇫🇷' },
  pt: { name: 'Português (Portuguese)', flag: '🇵🇹' },
  ja: { name: '日本語 (Japanese)', flag: '🇯🇵' },
  hi: { name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  zh: { name: '中文 (Mandarin)', flag: '🇨🇳' },
  de: { name: 'Deutsch (German)', flag: '🇩🇪' },
  it: { name: 'Italiano (Italian)', flag: '🇮🇹' }
};

// Pre-loaded stadium response templates
const SimulatedAI = {
  gate: {
    en: "🗺️ **Route to Gate B**:\n- Proceed to Section 112 corridors and head East.\n- Estimated walking time: **4 minutes**.\n- Crowd density: **Low (23%)**.\n- **Accessibility option**: Elevator 4 (East Wall) is fully operational for wheelchair access.",
    ar: "🗺️ **طريق البوابة B**:\n- توجه إلى ممرات القسم 112 واتجه شرقاً.\n- وقت السير التقريبي: **4 دقائق**.\n- كثافة الجمهور: **منخفضة (23%)**.\n- **خيار ذوي الاحتياجات الخاصة**: المصعد رقم 4 يعمل بالكامل لمستخدمي الكراسي المتحركة.",
    es: "🗺️ **Ruta hacia la Puerta B**:\n- Diríjase a los pasillos de la Sección 112 y vaya hacia el Este.\n- Tiempo estimado de caminata: **4 minutos**.\n- Densidad de multitud: **Baja (23%)**.\n- **Opción de accesibilidad**: El ascensor 4 (Pared Este) está totalmente operativo para sillas de ruedas."
  },
  restroom: {
    en: "🚽 **Nearest Restroom**: \n- Located behind Section 104 (Level 1).\n- Direct flat path, fully wheelchair accessible.\n- Active occupancy: **30%** (Queue time: < 1 minute).\n- Next cleaning schedule: in 15 minutes.",
    ar: "🚽 **أقرب دورة مياه**: \n- تقع خلف القسم 104 (المستوى 1).\n- مسار مستوٍ ومناسب تماماً للكراسي المتحركة.\n- الإشغال الحالي: **30%** (وقت الانتظار: أقل من دقيقة).",
    es: "🚽 **Baño más cercano**: \n- Ubicado detrás de la Sección 104 (Nivel 1).\n- Camino plano directo, totalmente accesible en silla de ruedas.\n- Ocupación actual: **30%** (Tiempo de espera: < 1 minuto)."
  },
  food: {
    en: "🍔 **Food Stalls Near Section 12**: \n1. **Burger Arena** (Halal, Vegan options) - 2 mins walk (Queue: 5 mins)\n2. **Taco Kick** (Gluten-free available) - 3 mins walk (Queue: 2 mins)\n3. **Caffeine Goal** (Beverages & snacks) - 1 min walk (Queue: 1 min)\n\n*Tip: Pre-order via the NexusIQ app to skip lines!*",
    ar: "🍔 **أكشاك الطعام بالقرب من القسم 12**: \n1. **برجر أرينا** (حلال، خيارات نباتية) - دقيقتين مشي (الانتظار: 5 دقائق)\n2. **تاكو كيك** (خالي من الجلوتين) - 3 دقائق مشي (الانتظار: دقيقتين).",
    es: "🍔 **Puestos de comida cerca de la Sección 12**: \n1. **Burger Arena** (Halal, opciones veganas) - 2 min a pie (Espera: 5 min)\n2. **Taco Kick** (Sin gluten disponible) - 3 min a pie (Espera: 2 min)."
  },
  default: {
    en: "🤖 I am your **NexusIQ Stadium AI**. I can assist you with real-time navigation, crowd heatmaps, volunteer schedules, accessibility support, and live World Cup 2026 notifications. Ask me anything!",
    ar: "🤖 أنا **مساعد ملاعب NexusIQ الذكي**. يمكنني مساعدتك في الملاحة الفورية، وتحليلات الحشود، وخطط المتطوعين، ودعم ذوي الاحتياجات الخاصة. اسألني أي شيء!",
    es: "🤖 Soy tu **Asistente de Estadio NexusIQ**. Puedo ayudarte con navegación en tiempo real, mapas de calor de multitudes, horarios de voluntarios y asistencia de accesibilidad. ¡Pregúntame lo que quieras!"
  }
};

// ==========================================
// SCROLL REVEAL INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  setupScrollReveal();
  setupNavbarScroll();
  setupMobileMenu();
});

function setupScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(rev => observer.observe(rev));
}

function setupNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileClose');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
    });
  }
  
  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  }
}

// ==========================================
// GEMINI API & ASSISTANT LOGIC
// ==========================================
async function callGeminiAPI(prompt, systemInstruction = "") {
  const apiKey = AppState.geminiApiKey;
  if (!apiKey) {
    return null; // Force fallback to local simulation
  }
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        systemInstruction: systemInstruction ? {
          parts: [{ text: systemInstruction }]
        } : undefined,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });
    
    const data = await response.json();
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    }
    throw new Error('Invalid response structure');
  } catch (error) {
    console.error('Gemini API Error, falling back:', error);
    return null;
  }
}

// Global query engine
async function queryStadiumAI(userMessage) {
  const promptLower = userMessage.toLowerCase();
  const lang = AppState.selectedLanguage;
  
  // Try to use Gemini API first
  if (AppState.geminiApiKey) {
    const sysPrompt = `You are NexusIQ Stadium AI, an elite AI assistant for the FIFA World Cup 2026 stadium.
    You assist fans, volunteers, emergency teams, and organizers. You speak in a professional, concise, premium tone.
    Current venue: MetLife Stadium / CenturyLink Field (FIFA 2026 Venue).
    Help with: navigation, accessibility, food, gates, crowd warnings, carbon metrics. Keep answers concise. Format using Markdown.`;
    
    const result = await callGeminiAPI(userMessage, sysPrompt);
    if (result) return result;
  }
  
  // Local fallback logic
  return new Promise((resolve) => {
    setTimeout(() => {
      let key = 'default';
      if (promptLower.includes('gate b') || promptLower.includes('b門') || promptLower.includes('b门') || promptLower.includes('بوابة b')) {
        key = 'gate';
      } else if (promptLower.includes('restroom') || promptLower.includes('toilet') || promptLower.includes('washroom') || promptLower.includes('حمام') || promptLower.includes('baño')) {
        key = 'restroom';
      } else if (promptLower.includes('food') || promptLower.includes('stall') || promptLower.includes('section 12') || promptLower.includes('comer') || promptLower.includes('طعام')) {
        key = 'food';
      }
      
      const responses = SimulatedAI[key];
      // fallback to English if translation is missing
      const ans = responses[lang] || responses['en'] || responses['default'];
      resolve(ans);
    }, 600);
  });
}

// Speech recognition utility
function startVoiceRecognition(onResultCallback, onErrorCallback) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    onErrorCallback("Web Speech API not supported in this browser.");
    return null;
  }
  
  const recognition = new SpeechRecognition();
  recognition.lang = AppState.selectedLanguage === 'ar' ? 'ar-SA' : AppState.selectedLanguage === 'es' ? 'es-ES' : 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    onResultCallback(text);
  };
  
  recognition.onerror = (event) => {
    onErrorCallback(event.error);
  };
  
  recognition.start();
  return recognition;
}

// Speech synthesis utility
function speakText(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // Stop current speech
  
  // Clean markdown syntax for speech
  const speechText = text.replace(/[\*\_#\`\-]/g, '');
  const utterance = new SpeechSynthesisUtterance(speechText);
  
  // Match language
  const langMap = {
    en: 'en-US',
    ar: 'ar-SA',
    es: 'es-ES',
    fr: 'fr-FR',
    pt: 'pt-PT',
    ja: 'ja-JP',
    hi: 'hi-IN',
    zh: 'zh-CN',
    de: 'de-DE',
    it: 'it-IT'
  };
  
  utterance.lang = langMap[AppState.selectedLanguage] || 'en-US';
  window.speechSynthesis.speak(utterance);
}

// Helper to update API Key
function updateApiKey(key) {
  AppState.geminiApiKey = key;
  localStorage.setItem('nexus_gemini_api_key', key);
}
