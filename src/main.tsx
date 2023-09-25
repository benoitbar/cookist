import React from 'react';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { createRoot } from 'react-dom/client';

import App from './App';
import {
  FirebaseContext,
  initializeFirebase,
} from './modules/contexts/FirebaseContext';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

// Firebase initialization
const { app, db } = initializeFirebase();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ app, db }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
);
