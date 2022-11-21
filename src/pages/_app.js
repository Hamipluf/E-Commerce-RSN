import { useEffect } from "react";

import initAuth from "../../initAuth"; //configuracion next auth firebase

import "../styles/index.css";

import { useRouter } from "next/router";

import { Provider } from "react-redux";

import { store } from "../app/store";
import { auth } from "../feature/firebase-config";

initAuth(); //inicializo next auth firebase

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // console.log(user)
      if (!user) {
        router.push("/logIn");
      }
    });
  }, []);

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
