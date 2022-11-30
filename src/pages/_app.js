import initAuth from "../../initAuth";


import "../styles/index.css";

import { Provider } from "react-redux";

import { store } from "../app/store";
 initAuth();


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
