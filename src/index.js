import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PrismicProvider } from "@prismicio/react";
import { client } from "./prismic";
import { BrowserRouter } from "react-router-dom";

import "./main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PrismicProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PrismicProvider>
);
