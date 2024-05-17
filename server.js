const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51PDrJ6KNL9CjG5renXP2Myroedu8mdGrZgXGH7SIGEt6J8JCMncgrpFVLziI5FGbQGFIizetpMtmxHdQl18MUejG00AfuLwR6o'); // Reemplaza con tu clave secreta de Stripe
const cors = require('cors');

app.use(cors()); // Habilitar CORS
app.use(express.static('src'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Producto 1',
                    },
                    unit_amount: 1999,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando la sesión de pago' });
    }
});

app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));
