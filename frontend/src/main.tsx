import React from "react";

import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import store from "./store/index.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
