import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { createContext } from 'react';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBsQtvNIUX4AdiUkuf693-5UIYlX4rxXE8',
  authDomain: 'cookist-23672.firebaseapp.com',
  projectId: 'cookist-23672',
  storageBucket: 'cookist-23672.appspot.com',
  messagingSenderId: '72792569535',
  appId: '1:72792569535:web:d8ae037ede55ee272c780a',
};

export function initializeFirebase() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return { app, db };
}

export const FirebaseContext = createContext<{
  app: FirebaseApp;
  db: Firestore;
}>({
  app: undefined,
  db: undefined,
});
