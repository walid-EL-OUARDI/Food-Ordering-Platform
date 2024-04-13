import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider as Router } from "react-router-dom";
import { router } from "./AppRoutes";
import store from "./store";
import { Provider } from "react-redux";
import "./global.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router router={router} />
    </React.StrictMode>
  </Provider>
);
