import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import storeFactory from "./redux/store";
import { BrowserRouter } from "react-router-dom";

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

axios.defaults.baseURL = "http://localhost:5000/api/v1";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={storeFactory()}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
