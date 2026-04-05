// DOM Elements
const inputText = document.getElementById('inputText');
const translateBtn = document.getElementById('translateBtn');
const startOverBtn = document.getElementById('startOverBtn');
const inputPanel = document.getElementById('inputPanel');
const outputPanel = document.getElementById('outputPanel');
const originalText = document.getElementById('originalText');
const outputText = document.getElementById('outputText');

// Get selected language from radio buttons
function getSelectedLanguage() {
    const selected = document.querySelector('input[name="targetLang"]:checked');
    return selected ? selected.value : 'French';
}

// Event Listeners
translateBtn.addEventListener('click', translateText);
startOverBtn.addEventListener('click', startOver);

// Functions
async function translateText() {
    const text = inputText.value.trim();

    if (!text) {
        showError('Please enter text to translate');
        return;
    }

    const targetLang = getSelectedLanguage();

    // Show loading state
    translateBtn.disabled = true;
    translateBtn.textContent = 'Translating...';

    try {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                targetLang: targetLang
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Server Error: ${response.status}`);
        }

        // Switch to output panel
        showResult(text, data.translation);

    } catch (error) {
        console.error('Translation error:', error);
        showError(error.message || 'Failed to translate. Please try again.');
    } finally {
        translateBtn.disabled = false;
        translateBtn.textContent = 'Translate';
    }
}

function showResult(original, translation) {
    originalText.textContent = original;
    outputText.textContent = translation;
    inputPanel.style.display = 'none';
    outputPanel.style.display = 'block';
}

function startOver() {
    inputPanel.style.display = 'block';
    outputPanel.style.display = 'none';
    inputText.value = '';
}

function showError(message) {
    outputText.innerHTML = `<div class="error">⚠️ ${message}</div>`;
}
