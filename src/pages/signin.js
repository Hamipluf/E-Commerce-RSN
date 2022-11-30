import { useRef, useState } from "react";

import { useDispatch } from "react-redux";

import { AuthAction, withAuthUser } from "next-firebase-auth";

import { useRouter } from "next/router";

import { login } from "../feature/user/userSlice";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import MyLoader from "../components/MyLoader";

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const auth = getAuth();

  // Registrando Usuario
  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
          })
        );
        setError("") //borro mensaje de error
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode)
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
                <button onClick={handleRegister} className="btn btn-accent">
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

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: MyLoader,
})(SignIn);
