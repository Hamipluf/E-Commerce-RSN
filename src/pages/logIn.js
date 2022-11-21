import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Link from "next/link";
import { useRouter } from "next/router";

import { auth } from "../feature/firebase-config";
import { login } from "../feature/user/userSlice";

var flag = false; 

export default function LogIn() {
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [error, setError] = useState();

  // Verificando si ya ingreso o si debe ingresar
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      // console.log(userAuth)
      if (userAuth && !flag) {
        flag = true;
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
        router.push("/home");
      }
    });
  }, []);

  // Ingresando al user
  const logIn = async (e) => {
    e.preventDefault();
    try {
      const sigin = await auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
      // console.log(logIn);
      console.log("Se autentico correctamente");
      router.push("/home");
    } catch (err) {
      // console.log(err.message);
      setError(err.message);
    }
  };
  return (
    <div>
      <div className="hero min-h-screen bg-login">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center text-dark lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6 text-lg font-semibold ">
              Welcome to my E-Commerce shop, you can fill in the form to log in
              with an account. If you are not registered click on the sign up
              button.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-dark">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  ref={emailRef}
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <button className="label-text-alt link link-hover">
                    <Link href="/signin">Don't have acount, Sing up NOW!</Link>
                  </button>
                </label>
                {error && (
                  <h2 className="text-error text-lg font-bold">{error}</h2>
                )}
              </div>
              <div className="form-control mt-6">
                <button onClick={logIn} className="btn btn-primary">
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
