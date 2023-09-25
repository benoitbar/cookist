import React from 'react';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { createRoot } from 'react-dom/client';

import App from './App';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </React.StrictMode>
);
