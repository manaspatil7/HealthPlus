import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';  // Import GoogleAuthProvider
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMNs7sxvSJKr2psE3piYKBMV6kn1erXx0",
    authDomain: "health-plus-6d841.firebaseapp.com",
    projectId: "health-plus-6d841",
    storageBucket: "health-plus-6d841.appspot.com",
    messagingSenderId: "926251110618",
    appId: "1:926251110618:web:0110507a1df66199ac15e3",
    measurementId: "G-LSSXPX1T9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Google Auth provider
const provider = new GoogleAuthProvider();

// Force account selection every time
provider.setCustomParameters({
  prompt: "select_account"
});

export { auth, db, provider };  // Export the provider along with auth and db








// // firebase.js

// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyDMNs7sxvSJKr2psE3piYKBMV6kn1erXx0",
//   authDomain: "health-plus-6d841.firebaseapp.com",
//   projectId: "health-plus-6d841",
//   storageBucket: "health-plus-6d841.appspot.com",
//   messagingSenderId: "926251110618",
//   appId: "1:926251110618:web:0110507a1df66199ac15e3",
//   measurementId: "G-LSSXPX1T9R"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();



// const analytics = getAnalytics(app);

// // Export the auth and provider
// export { auth, provider };
