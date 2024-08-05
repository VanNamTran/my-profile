// load-components
document.addEventListener('DOMContentLoaded', () => {
      const loadComponent = async (url, selector) => {
          const response = await fetch(url);
          if (response.ok) {
              const html = await response.text();
              document.querySelector(selector).innerHTML = html;
              if (selector === '#header2') {
                  setupHeaderScripts();
                  initializeMenu();
              }
              translateContent();
          } else {
              console.error('Failed to load component:', url);
          }
      };
  
      const setupHeaderScripts = () => {
          const languageSelector = document.getElementById('language-selector');
          if (languageSelector) {
              languageSelector.addEventListener('change', (event) => {
                  const selectedLanguage = event.target.value;
                  loadLanguage(selectedLanguage);
                  saveLanguage(selectedLanguage);
              });
          }
          
          const testButton = document.getElementById('test');
          if (testButton) {
              testButton.addEventListener('click', () => {
                  alert('Test button clicked!');
              });
          }
      };
  
      loadComponent('components/header.html', '#header2');
      loadComponent('components/footer.html', '#footer');
      loadComponent('components/nav.html', '#nav');
      loadComponent('components/nav.html', '#main-nav');
  });
  
  function translateContent() {
      if (typeof loadLanguage === 'function') {
          const savedLanguage = getSavedLanguage();
          loadLanguage(savedLanguage);
          updateLanguageSelector(savedLanguage);
      }
  }
  function updateLanguageSelector(lang) {
      const languageSelector = document.getElementById('language-selector');
      if (languageSelector) {
          languageSelector.value = lang;
      }
  }
  function initializeMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const overlay = document.getElementById('overlay');
    const close= document.getElementById('closeMenu')
    const body = document.body;

    function toggleMenu() {
        if (mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
            overlay.classList.remove('visible');
            body.classList.remove('no-scroll');
        } else {
            mainNav.classList.add('show');
            overlay.classList.add('visible');
            body.classList.add('no-scroll');
        }
    }

    function closeMenu() {
        if (mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
            overlay.classList.remove('visible');
            body.classList.remove('no-scroll');
        }
    }

    if (menuToggle && mainNav && overlay) {
        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', closeMenu);
        if (close) {
            close.addEventListener('click', closeMenu);
        }else{
            console.log("Element #closeMenu not found")
        }
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 800) {
            closeMenu();
        }
    });
}
  