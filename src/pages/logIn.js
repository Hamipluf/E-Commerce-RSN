import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthAction, withAuthUser } from "next-firebase-auth";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import Link from "next/link";

import { login } from "../feature/user/userSlice";
import MyLoader from '../components/MyLoader';

const LogIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const auth = getAuth();
  // loggin
  const handleLogIn = () => {
    signInWithEmailAndPassword(
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
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
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
                <button onClick={handleLogIn} className="btn btn-primary">
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: MyLoader,
})(LogIn);
