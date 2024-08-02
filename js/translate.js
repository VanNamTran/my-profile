const languageSelector = document.getElementById('language-selector');

async function loadLanguage(lang) {
    try {
        const response = await fetch(`./locales/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load language file: ${response.status}`);
        }
        const translations = await response.json();
        applyTranslations(translations);
    } catch (error) {
        console.error('Error loading language:', error);
    }
}

function applyTranslations(translations) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
            element.innerHTML = translations[key];
        }
    });
}

function saveLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
}

function getSavedLanguage() {
    return localStorage.getItem('preferredLanguage') || 'en';
}

if (languageSelector) {
    languageSelector.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        loadLanguage(selectedLanguage);
        saveLanguage(selectedLanguage);
    });
}

// Load default language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = getSavedLanguage();
    if (languageSelector) {
        languageSelector.value = savedLanguage;
    }
    loadLanguage(savedLanguage);
});
