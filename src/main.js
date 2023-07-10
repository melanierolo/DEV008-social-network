// Este es el punto de entrada de tu aplicacion

import { Login } from "./components/login.js";
import { Register } from "./components/register.js";
import { Feed } from "./components/feed.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase.js";
import "./lib/firebase.js";
import { MyPosts } from "./components/myPosts.js";

const rootDiv = document.getElementById("root");

const routes = {
  "/": Login,
  "/register": Register,
  "/feed": Feed,
  "/myPosts": MyPosts,
};

//Navegando por las rutas
export const onNavigate = (pathname) => {
  console.log("-----------NAVIGATE----------------");
  window.history.pushState({}, pathname, window.location.origin + pathname);
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[pathname](onNavigate));
};

//Obteniendo el usuario con sesión activa
onAuthStateChanged(auth, async (user) => {
  console.log("verificando usuario ", user);
});

const component = routes[window.location.pathname];
// history
window.onpopstate = () => {
  console.log("clicked-onpopstate");
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
    console.log("while-onpop");
  }
  rootDiv.appendChild(component(onNavigate));
};

rootDiv.appendChild(component(onNavigate));
