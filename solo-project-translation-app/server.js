import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Заголовки безопасности и CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' http://localhost:3001; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:");
    next();
});

// Блокируем запросы Chrome DevTools к .well-known
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// ============================================
// 🔑 OPENROUTER API CONFIGURATION
// Загрузите ключ из файла .env
// ============================================
const API_KEY = process.env.OPENROUTER_API_KEY;
// ============================================

if (!API_KEY) {
    console.error('❌ OPENROUTER_API_KEY not set! Create a .env file with your API key.');
    console.error('   See .env.example for reference.');
    process.exit(1);
}

const API_URL = 'https://openrouter.ai/api/v1';
const MODEL = process.env.MODEL || 'openai/gpt-oss-20b:free';

// Заголовки для OpenRouter
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    'HTTP-Referer': 'http://localhost:5173',
    'X-Title': 'PollyGlot Translation App'
};

// Настройки по умолчанию
const TEMPERATURE = 0.3;
const MAX_TOKENS = 500;

// System prompt
const SYSTEM_PROMPT = 'You are a professional translator. Your task is to translate text from one language to another accurately while preserving the original meaning, tone, and style. Provide only the translated text without any additional explanations or commentary.';

app.post('/api/translate', async (req, res) => {
    const { text, targetLang } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    if (!targetLang) {
        return res.status(400).json({ error: 'Target language is required' });
    }

    try {
        const response = await fetch(`${API_URL}/chat/completions`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: `Please translate the following text to ${targetLang}:\n\n${text}` }
                ],
                temperature: TEMPERATURE,
                max_tokens: MAX_TOKENS
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({
                error: errorData.error?.message || `API Error: ${response.status}`
            });
        }

        const data = await response.json();
        const translatedText = data.choices[0].message.content.trim();

        res.json({ translation: translatedText });

    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Failed to translate. Please try again.' });
    }
});

app.listen(PORT, () => {
    console.log(`Translation server running on http://localhost:${PORT}`);
});
