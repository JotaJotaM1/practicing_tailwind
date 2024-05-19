
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

/* Add to Cart */
document.addEventListener('DOMContentLoaded', function () {
    const decreaseButton = document.getElementById('decrease');
    const increaseButton = document.getElementById('increase');
    const quantityInput = document.getElementById('quantity');
    const addToCartButton = document.getElementById('add-to-cart');
    const cart = document.getElementById('shopping-cart');
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const closeCartButton = document.getElementById('close-cart');
    const checkoutButton = document.getElementById('checkout-button');

    // Función para actualizar la cantidad de productos

    function updateQuantity(delta) {
        let currentValue = parseInt(quantityInput.value);
        let newValue = currentValue + delta;
        if (newValue < 1) {
            newValue = 1;
        }
        quantityInput.value = newValue;
    }

    decreaseButton.addEventListener('click', function () {
        updateQuantity(-1);
    });

    increaseButton.addEventListener('click', function () {
        updateQuantity(1);
    });

    addToCartButton.addEventListener('click', function () {
        const quantity = parseInt(quantityInput.value);
        const price = parseFloat(document.querySelector('input[name="purchase"]:checked').value);
        const productName = "FULL READY";
        const productTotal = (price * quantity).toFixed(2);

        const cartItem = document.createElement('li');
        cartItem.className = "flex py-6";
        cartItem.innerHTML = `
            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src="./img/primex.webp" alt="Producto" class="h-full w-full object-cover object-center">
            </div>
            <div class="ml-4 flex flex-1 flex-col">
                <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3>${productName}</h3>
                        <p class="total">$${productTotal}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">Qty ${quantity}</p>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm">
                    <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500 remove-item">Remove</button>
                </div>
            </div>
        `;

        cartItems.appendChild(cartItem);
        updateSubtotal();
        cart.classList.remove('hidden');
    });

    function updateSubtotal() {
        let subtotal = 0;
        document.querySelectorAll('#cart-items > li').forEach(item => {
            const itemPrice = parseFloat(item.querySelector('.total').innerText.replace('$', ''));
            subtotal += itemPrice;
        });
        cartSubtotal.innerText = `$${subtotal.toFixed(2)}`;
    }

    cartItems.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-item')) {
            e.target.closest('li').remove();
            updateSubtotal();
        }
    });

    closeCartButton.addEventListener('click', function () {
        cart.classList.add('hidden');
    });

    checkoutButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const quantity = parseInt(quantityInput.value);
        const purchase = parseFloat(document.querySelector('input[name="purchase"]:checked').value) * 100; // Convertir a centavos
        const productName = "FULL READY";
        const productImage = "./img/primex.webp";

        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: purchase,
                quantity: quantity,
                productName: productName,
                productImage: productImage
            })
        });

        const session = await response.json();

        // Redirige a Stripe Checkout
        const result = await stripe.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
            alert(result.error.message);
        }
    });
});

