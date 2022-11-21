import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  deleteProduct,
  selectProducto,
  selectTotal,
} from "../feature/product/productSlice";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Cart() {
  const product = useSelector(selectProducto);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handlePay = (e) => {
    e.preventDefault();
    router.push("/payment");
  };

  return (
    <>
      <NavBar />
      <div>
        <div className="bg-gray-ligth">
          <div className="p-10 w-11/12 m-auto">
            <h2 className="text-3xl text-obscure">Your Cart :</h2>
            <br />
            <p className="text-gray-ligth">{product.length} product</p>
            <div className="divider h-1 bg-grayx"></div>
            {product.map((product) => (
              <div key={product.id}>
                <div className="card  phone:card-compact phone:my-5 text-light card-side bg-obscure shadow-xl">
                  <figure>
                    <img
                      className="w-56 phone:w-20 phone:m-5"
                      src={product.img.src}
                      alt={product.desciption}
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
                      <button
                        onClick={() => {
                          navegate("/");
                        }}
                        className="btn btn-secondary phone:btn-xs"
                      >
                        Back To Shop
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl text-obscure">${product.price} </h2>
                </div>
                <div className="divider h-1 bg-obscure"></div>
              </div>
            ))}
          </div>
          <div className="divider h-1 bg-obscure"></div>
          <h2 className="text-3xl text-obscure">SUBTOTAL:{total}</h2>
          <div className="w-11/12 m-auto">
            <button onClick={handlePay} className="btn btn-block my-5">
              Go to pay
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
