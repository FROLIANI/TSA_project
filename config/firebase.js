import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// add firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBadbWypGwvbspbZnETnhRuyGa4Otc4M_M",
  authDomain: "tsa123-76b2e.firebaseapp.com",
  projectId: "tsa123-76b2e",
  storageBucket: "tsa123-76b2e.appspot.com",
  messagingSenderId: "857914660045",
  appId: "1:857914660045:web:e3b944b7898868bf7d8584",
  measurementId: "G-M345CGEJ8K"
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  // persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
