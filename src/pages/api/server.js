const express = require("express");
const app = express();
const cors = require("cors");
const { resolve } = require("path");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: ".env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {});
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/config", async (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

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

app.listen(5252, () =>
  console.log(`Server escuchando en http://localhost:5252`)
);
