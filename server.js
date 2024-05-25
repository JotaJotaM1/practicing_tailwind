const express = require('express');
const stripe = require('stripe')('sk_test_51PDrJ6KNL9CjG5renXP2Myroedu8mdGrZgXGH7SIGEt6J8JCMncgrpFVLziI5FGbQGFIizetpMtmxHdQl18MUejG00AfuLwR6o');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { cart } = req.body;

        console.log("Received Cart Data:", cart); // Log para verificar los datos recibidos
        debugger; // <<<<<<<< INSTRUCCIÓN PARA PAUSAR EL CÓDIGO

        const line_items = cart.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.productName,
                    images: [item.productImage],
                },
                unit_amount: item.amount,
            },
            quantity: item.quantity, // Asegúrate de que la cantidad esté incluida
        }));

        console.log("Line Items:", line_items); // Log para verificar los line items

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: 'http://localhost:4242/success.html',
            cancel_url: 'http://localhost:4242/cancel.html',
        });

        console.log("Session Created:", session.id); // Log para verificar el session ID creado

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating session:", error); // Log para errores
        res.status(500).send({ error: error.message });
    }
});

app.listen(4242, () => console.log('El servidor está ejecutándose en http://localhost:4242'));
