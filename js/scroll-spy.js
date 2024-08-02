document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main h2');
    const catalogLinks = document.querySelectorAll('.catalog ul li a');
    const headerHeight = 100;

    const getOffsetTop = (elem) => {
        let offsetTop = 0;
        while (elem) {
            offsetTop += elem.offsetTop;
            elem = elem.offsetParent;
        }
        return offsetTop;
    };

    let lastActiveSection = sections[0]; // Initialize to the first section

    const updateActiveLink = () => {
        let fromTop = window.scrollY + headerHeight;
        let currentSection = lastActiveSection;

        for (let i = sections.length - 1; i >= 0; i--) {
            if (fromTop >= getOffsetTop(sections[i]) - 1) {
                currentSection = sections[i];
                break;
            }
        }

        if (currentSection !== lastActiveSection) {
            lastActiveSection = currentSection;
            const id = currentSection.getAttribute('id');
            catalogLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === id) {
                    link.classList.add('active');
                }
            });
        }
    };

    catalogLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const targetPosition = getOffsetTop(targetElement) - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call to set the active link on load
});