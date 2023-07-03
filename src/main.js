// Este es el punto de entrada de tu aplicacion

import { Login } from "./components/login.js";
import { Register } from "./components/register.js";
import { Feed } from "./components/feed.js";

const rootDiv = document.getElementById("root");

const routes = {
  "/": Login,
  "/register": Register,
  "/feed": Feed,
};

export const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);

  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[pathname]());
};

const component = routes[window.location.pathname];
window.onpopstate = () => {
  rootDiv.appendChild(component());
};

rootDiv.appendChild(component());
