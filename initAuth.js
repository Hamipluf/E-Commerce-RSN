import { init } from "next-firebase-auth";
import { getAuth } from "firebase/auth";

const initAuth = () => {
  
    init({
    authPageURL: "/login",
    appPageURL: "/home",
    loginAPIEndpoint: "/api/login", // required
    logoutAPIEndpoint: "/api/logout", // required
    firebaseAdminInitConfig: {
      credential: {
        projectId: "e-commerce-redux-62ac1",
        clientEmail:
          "firebase-adminsdk-3sg54@e-commerce-redux-62ac1.iam.gserviceaccount.com",
        // The private key must not be accessible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
    },
    firebaseClientInitConfig: {
      apiKey: "AIzaSyBeLRpmTB_hNAN3Swmy6UuQDtnYmVNf_xs",
      authDomain: "e-commerce-redux-62ac1.firebaseapp.com",
      projectId: "e-commerce-redux-62ac1",
    },
    cookies: {
      name: "E-Commerce cookie", // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  });


};

export default initAuth;
