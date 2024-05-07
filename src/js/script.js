document.addEventListener('DOMContentLoaded', function () {
    // Toggle para el menú móvil
    const menuButton = document.querySelector('[aria-controls="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');

    menuButton.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        mobileMenu.classList.toggle('hidden');
    });

    // Toggle para el menú desplegable del usuario
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenu = document.querySelector('.relative div[role="menu"]');

    userMenuButton.addEventListener('click', function () {
        userMenu.classList.toggle('hidden');
    });

    // Click fuera de los menús para cerrarlos
    document.addEventListener('click', function (event) {
        if (!menuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            menuButton.setAttribute('aria-expanded', 'false');
        }

        if (!userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
            userMenu.classList.add('hidden');
        }
    });
});


/* FAQS */

document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar todos los botones de los acordeones
    const accordionButtons = document.querySelectorAll('.accordion-toggle');

    accordionButtons.forEach(button => {
        const accordionContent = button.nextElementSibling;
        // Asegurarse de que el contenido esté inicialmente oculto
        accordionContent.classList.add('hidden');

        button.addEventListener('click', function () {
            // Alternar la clase 'hidden' para mostrar/ocultar el contenido del acordeón
            accordionContent.classList.toggle('hidden');

            // Opcional: Alternar la rotación del icono del acordeón
            const icon = button.querySelector('svg');
            icon.classList.toggle('rotate-180');
        });
    });
});

