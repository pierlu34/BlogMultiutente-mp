import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, createBrowserRouter,
  Route,
  RouterProvider,
  Routes,} from 'react-router-dom';
import './index.scss';
import { Provider } from "react-redux";
import { store, persistor } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";
import { routes } from "./routes.jsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from 'react';

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);