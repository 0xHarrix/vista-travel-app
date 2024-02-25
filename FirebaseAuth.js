import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyixfiMri1mmH7-SZJ9VVTPe2dsAhbR3c",
  authDomain: "my-app-13de1.firebaseapp.com",
  databaseURL: "https://my-app-13de1-default-rtdb.firebaseio.com",
  projectId: "my-app-13de1",
  storageBucket: "my-app-13de1.appspot.com",
  messagingSenderId: "834633713618",
  appId: "1:834633713618:web:bad865544f01e563b36a0b",
  measurementId: "G-ENZK4HE2JG"
};

// Initialize Firebase

export const firebase_app = initializeApp(firebaseConfig);
  export const firebase_auth = initializeAuth(firebase_app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const firebase_db = getDatabase(firebase_app);