/* Nav Bar */

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


/* Stripe */

document.addEventListener('DOMContentLoaded', function() {
    const stripe = Stripe('pk_test_51PDrJ6KNL9CjG5re81t5kukFjTMYw7r5TSdCUUVeg4V42Fc40sWZAATGRmZulSX0ZyBkcXsm08WQGapuIvhL8gm0004fqkK4Ho'); // Reemplaza con tu clave pública de Stripe
    const buyButton = document.getElementById('buy-button');
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutButton = document.getElementById('checkout-button');

    if (buyButton) {
        buyButton.addEventListener('click', function () {
            checkoutForm.classList.remove('hidden');
            window.scrollTo(0, checkoutForm.offsetTop);
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const address = document.getElementById('address').value.trim();
            const city = document.getElementById('city').value.trim();
            const country = document.getElementById('country').value.trim();
            const zip = document.getElementById('zip').value.trim();

            // Validar el formulario
            if (!name || !email || !address || !city || !country || !zip) {
                alert('Por favor, completa todos los campos del formulario.');
                return;
            }

            if (!validateEmail(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            // Enviar los datos a Stripe
            fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    address: address,
                    city: city,
                    country: country,
                    zip: zip
                })
            })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function (session) {
                return stripe.redirectToCheckout({ sessionId: session.id });
            })
            .then(function (result) {
                if (result.error) {
                    alert(result.error.message);
                }
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
        });
    }

    // Función para validar el correo electrónico
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});








