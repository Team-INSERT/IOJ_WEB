import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./index.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactGA from "react-ga4";
import App from "./app/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
}

root.render(
  <Router>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Router>,
);
