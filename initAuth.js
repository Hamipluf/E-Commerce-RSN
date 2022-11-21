import { init } from "next-firebase-auth";

const initAuth = () => {
  init({
    authPageURL: "/auth",
    appPageURL: "/",
    loginAPIEndpoint: "/api/login", // required
    logoutAPIEndpoint: "/api/logout", // required
    firebaseAdminInitConfig: {
      credential: {
        projectId: "my-example-app-id",
        clientEmail: "example-abc123@my-example-app.iam.gserviceaccount.com",
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
    },
    // Usar las credenciales por defecto de la aplicación (tiene prioridad sobre firebaseAdminInitConfig si se establece)
    // useFirebaseAdminDefaultCredential: true,
    firebaseClientInitConfig: {
      apiKey: "MyExampleAppAPIKey123", // required
      authDomain: "my-example-app.firebaseapp.com",
      databaseURL: "https://my-example-app.firebaseio.com",
      projectId: "my-example-app-id",
    },
    cookies: {
      name: "e-commerce-coockie-app", // required
      // Las claves son necesarias a menos que se establezca `signed` a `false`.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // Doce dias max persiste la cookie
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: false, // establecer esto como falso en el desarrollo local (no HTTPS)
      signed: true,
    },
    onVerifyTokenError: (err) => {
      console.error(err);
    },
    onTokenRefreshError: (err) => {
      console.error(err);
    },
  });
};

export default initAuth;
