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

languageSelector.addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    loadLanguage(selectedLanguage);
});

// Load default language on page load
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage('en');
});
