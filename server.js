const express = require('express');
const stripe = require('stripe')('sk_test_51PDrJ6KNL9CjG5renXP2Myroedu8mdGrZgXGH7SIGEt6J8JCMncgrpFVLziI5FGbQGFIizetpMtmxHdQl18MUejG00AfuLwR6o');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: req.body.productName, // Nombre del producto desde el formulario
                            images: [req.body.productImage] // Imagen del producto desde el formulario
                        },
                        unit_amount: req.body.amount, // Monto en centavos
                    },
                    quantity: req.body.quantity,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:4242/success.html',
            cancel_url: 'http://localhost:4242/cancel.html',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(4242, () => console.log('El servidor está ejecutándose en http://localhost:4242'));
