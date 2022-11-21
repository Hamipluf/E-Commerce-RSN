import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { addProduct, selectProducto } from "../feature/product/productSlice";

import { v4 as uuid } from "uuid";

export default function Product(props) {
  const dispatch = useDispatch();
  const products = useSelector(selectProducto);

//   console.log(products);

  const handleAddCart = () => {
    console.log("Product Added");
    dispatch(
      addProduct({
        ...products,
        title: props.title,
        desciption: props.desciption,
        price: props.price,
        img: props.img,
        inCart: true,
        id: uuid(),
      })
    );
  };
  // console.log(addProduct)
  // console.log(products, props)
  return (
    <div className="p-5">
      <div className="card card-compact w-72 m-5 p-5 bg-obscure shadow-card hover:bg-grayx transition-all ">
        <figure>
          <Image
            src={props.img}
            width={256}
            height={256}
            alt={props.description}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{props.title}</h2>
          <p>{props.desciption}</p>
          <div className="card-actions justify-between">
            <h2 className="text-center text-lg font-bold pt-3">
              {props.price}$
            </h2>
            <button onClick={handleAddCart} className="btn btn-primary">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
