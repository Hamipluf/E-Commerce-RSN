import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const total = useSelector((state) => state.products.total);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js no se cargo todavía.
      // Desactivo el envio de formulario si stripe no esta cargado todavia
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        //Pagina de confirmacion del pago
        return_url: `${window.location.origin}/thanksu`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form className="text-light p-5" id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      {/* se muestra el boton cuando stripe o los elementos esten cargados */}
      <button
        className="btn btn-primary btn-wide m-5"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">{isLoading ? "Processing ... " : "Buy"}</span>
      </button>
      {/* Muestro los mensajes de error o éxito */}
      {message && <div id="payment-message">{message}</div>}
      <h3 className="text-2xl font-bold text-obscure p-5">Total: {total}</h3>
    </form>
  );
}
