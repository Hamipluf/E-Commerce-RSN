const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
/** 
 * pega aca el handler de node...
 * 
 * app.get("/config", async (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

insomnia al 
localhost:3000/api/config
y
localhost:3000/api/create-payment-intent


app.post("/create-payment-intent", async (req, res) => {
  // console.log(req.body.amount)
  const amount = req.body.amount;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: amount,
      automatic_payment_methods: { enabled: true },
    });

    // Envio publishable key y los detalles de PaymentIntent al cliente
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});
  */
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Crear sesiones de pago a partir de los parámetros del cuerpo.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "{{PRICE_ID}}",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
