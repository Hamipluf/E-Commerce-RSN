import { useDispatch } from "react-redux";

import { getAuth, signOut } from "firebase/auth";

import Link from "next/link";
import Image from "next/image";

import { logout } from "../feature/user/userSlice";

import phone from "../../public/smartphone.png";

export default function NavBarProfile() {
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(logout());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="navbar z-10 bg-dark">
        <div className="flex-1">
          <div className="btn btn-ghost normal-case text-lg desktop:text-xl">
            <Image src={phone} width={44} height={44} alt="LOGO" />
            <Link href="/home">
              <h3 className="mx-2">E-Commerce</h3>
            </Link>
          </div>
        </div>
        <div className="flex-none text-light tablet:px-5 text-sm">
          <ul className="menu menu-horizontal z-10 p-0">
            <li tabIndex={0}>
              <a>
                Menu
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-dark">
                <li>
                  <button>
                    <Link href="/home">Home</Link>
                  </button>
                </li>
                <li>
                  <Link href="/proximamente">Addresses</Link>
                </li>
                <li>
                  <Link href="/proximamente">My Orders</Link>
                </li>
                <li>
                  <Link href="/cart">My Cart</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-7 desktop:w-14 desktop:mr-2 rounded-full">
              <img
                src="https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1606/tuktukdesign160600119/59070200-icono-de-usuario-hombre-perfil-hombre-de-negocios-avatar-icono-persona-en-la-ilustraci%C3%B3n-vectorial.jpg?ver=6"
                alt="Imagen de Perfil"
              />
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
              <button onClick={handleLogOut}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
