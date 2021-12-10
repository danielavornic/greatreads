import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAYwb0MtvdC1VS6o5T-XLalOZ4qYAG7r2s',
  authDomain: 'greatreads-12f5f.firebaseapp.com',
  projectId: 'greatreads-12f5f',
  storageBucket: 'greatreads-12f5f.appspot.com',
  messagingSenderId: '396073914493',
  appId: '1:396073914493:web:b1dcb2d58a6580ec616114',
  measurementId: 'G-71Q2JCY62V',
}

export const FirebaseApp = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();