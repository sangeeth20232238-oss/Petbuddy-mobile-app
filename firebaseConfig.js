import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

 const firebaseConfig = {
    apiKey: "AIzaSyDkR3kv_5rsUrUKa9qJdU61ci7IZnczDgA",
    authDomain: "petbuddy-fd1d8.firebaseapp.com",
    projectId: "petbuddy-fd1d8",
    storageBucket: "petbuddy-fd1d8.firebasestorage.app",
    messagingSenderId: "714854625893",
    appId: "1:714854625893:web:e44de7620a31400345cc8c",
    measurementId: "G-8GWMPREPJ2"
  };

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };