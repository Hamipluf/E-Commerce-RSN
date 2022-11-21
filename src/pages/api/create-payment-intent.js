// Replace if using a different env file or config
// const env = require("dotenv").config({ path: ".env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  // console.log(req.body.amount)
  /**
   * {
   *    "amount": 123
   * }
   */
  const amount = req.body.amount;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount,
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
}
