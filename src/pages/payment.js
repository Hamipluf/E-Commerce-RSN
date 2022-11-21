import { useEffect, useState } from "react";

import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  selectProducto,
  selectTotal,
} from "../feature/product/productSlice";

import CheckoutForm from "../components/CheckoutForm";
import NavBarProfile from "../components/NavBarProfile";
import Footer from "../components/Footer";
import Link from "next/link";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const product = useSelector(selectProducto);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    axios
      .post(
        "/api/create-payment-intent", //clave privada mando por metodo post
        { amount: total },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        const clientSecret = res.data.clientSecret;
        // console.log(clientSecret);
        setClientSecret(clientSecret);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(
        "/api/config", //clave publica obtengo por metodo get
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        const publishableKey = res.data.publishableKey;
        // console.log(publishableKey)
        setStripePromise(loadStripe(publishableKey));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <NavBarProfile />

      {/* MODAL TARJETA PRUEBA */}
      <div>
        <input type="checkbox" id="my-modal-1" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <label
              htmlFor="my-modal-1"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">Test card succefuly</h3>
            <hr />
            <ul>
              <li>
                <span className="font-bold text-light">Card Number:</span> 4242
                4242 4242 4242
              </li>
              <li>
                <span className="font-bold text-light">CVC:</span> 3 random
                digits
              </li>
              <li>
                <span className="font-bold text-light"> Date:</span> Any future
                dates
              </li>
            </ul>
            <h3 className="pt-4 text-lg font-bold">
              Test card rejected {"(wrong cvc)"}{" "}
            </h3>
            <hr />
            <ul>
              <li>
                <span className="font-bold text-light">Card Number:</span> 4000
                0000 0000 0127
              </li>
              <li>
                <span className="font-bold text-light">CVC:</span> 3 random
                digits
              </li>
              <li>
                <span className="font-bold text-light"> Date:</span> Any future
                dates
              </li>
            </ul>
          </label>
        </label>
      </div>
      <div className="min-h-screen bg-grayx flex flex-wrap-reverse desktop:grid  desktop:grid-cols-2">
        <div className="card w-11/12 desktop:w-full p-10 m-5 desktop:order-first bg-second shadow-xl text-light">
          <div className="w-10/12">
            {/* Boton Para abrir modal de la tarjeta */}
            <label
              htmlFor="my-modal-1"
              className="btn my-5 desktop:mx-5 w-32 btn-info"
            >
              Tarjeta de prueba
            </label>
            {/* Boton para volver al home */}
            <button className="btn w-32 btn-warning">
              <Link href="/home"> Back to Home {">"}</Link>
            </button>
          </div>
          <h2 className="text-2xl text-obscure font-bold tracking-tight p-5">
            Fill in the form with your credit card information to complete the
            payment.
          </h2>
          <hr />
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
        <div className="mx-auto desktop:order-last tablet:w-10/11">
          {product.map((product) => (
            <div key={product.id}>
              <div className="card card-compact my-5 tablet:card-side text-light tablet:w-10/12 desktop:card-side bg-obscure shadow-xl">
                <figure>
                  <img
                    className="w-56 phone:w-20 phone:m-5"
                    src={product.img.src}
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.title}</h2>
                  <p>{product.desciption}.</p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-error phone:btn-xs"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
