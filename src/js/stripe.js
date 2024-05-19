/* Stripe */
const stripe = Stripe('pk_test_51PDrJ6KNL9CjG5re81t5kukFjTMYw7r5TSdCUUVeg4V42Fc40sWZAATGRmZulSX0ZyBkcXsm08WQGapuIvhL8gm0004fqkK4Ho');

document.getElementById('checkout-button').addEventListener('click', async (event) => {
    event.preventDefault();

    const quantity = parseInt(document.getElementById('quantity').value);
    const purchase = parseFloat(document.querySelector('input[name="purchase"]:checked').value);
    const productName = "FULL READY"; // Nombre del producto
    const productImage = "./img/primex.webp"; // URL de la imagen del producto

    const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: purchase * 100, // Convierte a centavos
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
