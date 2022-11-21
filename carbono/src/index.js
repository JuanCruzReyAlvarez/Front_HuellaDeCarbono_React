//Este archivo es el corazon para que funcione Reactt
import React from "react";
import {createRoot} from "react-dom/client";
import App from "./react/App.js";
// importt { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";


const root = createRoot(document.getElementById("root")); // accedo al html del index.html 
root.render(
  <BrowserRouter>
  {/* //todo lo que renderizo en app lo conecto al html */}
     <App />                                           
  </BrowserRouter>,
);
