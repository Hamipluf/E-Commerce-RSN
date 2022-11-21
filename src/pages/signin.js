import { useRef, useState } from "react";

import { useRouter } from "next/router";

import { auth } from "../feature/firebase-config";
import { login } from "../feature/user/userSlice";

import { useDispatch } from "react-redux";

import Link from "next/link";

function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const router = useRouter();

  // Registrando Usuario
  const register = async (e) => {
    e.preventDefault();
    setError(); // borro el mensaje de error en reintento

    await auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value // firbase te pide que sea mas de 6 caracteres
      )
      .then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            const uid = user.uid;
            dispatch(login(user));
            // aca iria el route forward ....
            // ...
            router.push("/home");
          }
        },
        ({ code, message }) => {
            console.log(code);
            if (code === "auth/email-already-in-use") {
                alert("Email already in use");
            }
            console.log(message);
            // rechazado el signin por alguna razon...
            // debuguear razones
            setError(code); 
        } //aca esta cayendo el error
      )
      .catch((error) => {
        //cuando no responde la api 500
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
        // .. 
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-signin text-dark">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign In now!</h1>
            <p className="py-6">
              Register with your email and password of your choice.
            </p>
          </div>
          <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-light">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-dark">Your Email</span>
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="email"
                  className="input text-light input-bordered input-accent w-full max-w-xs"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-dark">Create Password</span>
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="******"
                  className="input text-light  input-bordered input-accent w-full max-w-xs"
                />
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-dark"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              {error && (
                <h2 className="text-error text-lg font-bold">{`${error}`}</h2>
              )}
              <div className="form-control mt-6">
                <button onClick={register} className="btn btn-accent">
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
