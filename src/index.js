import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

//set colors
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.querySelector("body").classList.add("night-mode");
}
      
if (parseFloat(window.getComputedStyle(document.body).getPropertyValue("--l")) > 60 ) {
  document.querySelector("body").classList.add("light");
}

//initial load
window.addEventListener("load", function() {
  window.history.pushState({}, "")
})

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <App />
);

serviceWorkerRegistration.unregister();