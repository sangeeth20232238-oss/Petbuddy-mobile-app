import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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

// Safe App Initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Safe Auth Initialization
const auth = (() => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch (error) {
    return getAuth(app);
  }
})();

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };