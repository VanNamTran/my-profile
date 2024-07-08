const languageSelector = document.getElementById('language-selector');

async function loadLanguage(lang) {
    const response = await fetch(`./locales/${lang}.json`);
    const translations = await response.json();
    applyTranslations(translations);
}

function applyTranslations(translations) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.innerHTML = translations[key];
    });
}
function saveLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
}

function getSavedLanguage() {
    const lang = localStorage.getItem('preferredLanguage');
    return lang;
}
languageSelector.addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    loadLanguage(selectedLanguage);
    saveLanguage(selectedLanguage);
});

// Load default language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = getSavedLanguage();
    const defaultLanguage = 'en';
    
    const languageToLoad = savedLanguage || defaultLanguage;
    languageSelector.value = languageToLoad;
    loadLanguage(languageToLoad);
});
