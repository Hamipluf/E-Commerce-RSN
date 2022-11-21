import { useSelector, useDispatch } from "react-redux";

import { selectProducto, selectTotal } from "../feature/product/productSlice";
import { logout } from "../feature/user/userSlice";
import { auth } from "../feature/firebase-config";

import Image from "next/image";
import Link from "next/link";

import phone from "../../public/smartphone.png";

export default function NavBar() {
  const product = useSelector(selectProducto);
  const total = useSelector(selectTotal);
  const dispatch = useDispatch();

  const exit = () => {
    auth.signOut();
    window.location.reload(true);
    const unsuscribe = auth.onAuthStateChanged((userAuth) => {
      console.log(userAuth);
      if (userAuth) {
        //Logged out
        dispatch(logout());
      }
    });
    return unsuscribe; //equivale a la funcion de limpieza
  };
  return (
    <>
      <div className="navbar bg-dark">
        <div className="flex-1">
          <div className="btn btn-ghost normal-case text-lg desktop:text-xl">
            <Image src={phone} width={44} height={44} alt="LOGO" />
            <Link href="/home">
              <h3 className="mx-2">E-Commerce</h3>
            </Link>
          </div>
        </div>

        {/* DROP DOWN CART */}
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {product.length}
                </span>
              </div>
            </label>
            {/* DROPDOWN CART */}
            {product.map((products) => (
              <div
                key={products.id}
                tabIndex={0}
                className="mt-3 text-light card card-compact dropdown-content w-72 tablet:w-96 desktop:w-96 bg-dark shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">
                    {products.length} Items
                  </span>
                  <p className="font-bold text-base text-light">
                    {products.title}
                  </p>
                  <img
                    className="h-24 w-24"
                    src={products.img.src}
                    alt={products.desciption}
                  />
                  <p className="font-bold text-base text-light">
                    {products.desciption}
                  </p>
                  <div className="divider h-1 bg-obscure"></div>
                  <span className="text-info">Subtotal:{total}</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      <Link href="/cart">View cart</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={exit}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
