// Este es el punto de entrada de tu aplicacion

import { Login } from "./components/login.js";
import { Register } from "./components/register.js";
import { Feed } from "./components/feed.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase.js";
import "./lib/firebase.js";

const rootDiv = document.getElementById("root");
const mainPage = document.getElementById("main-page");
const secondElementRoot = document.getElementById("main-page");
console.log(secondElementRoot);
console.log(mainPage.firstChild);

const routes = {
  "/": Login,
  "/register": Register,
  "/feed": Feed,
};

//Navegando por las rutas
export const onNavigate = (pathname) => {
  console.log("-----------NAVIGATE----------------");
  window.history.pushState({}, pathname, window.location.origin + pathname);
  console.log("mainpage first child", mainPage.firstChild);
  while (mainPage.firstChild) {
    console.log(secondElementRoot);
    console.log("secondo elemento- primer hijo", secondElementRoot.firstChild);
    mainPage.removeChild(mainPage.firstChild);
  }
  mainPage.appendChild(routes[pathname](onNavigate));
};

//Obteniendo el usuario con sesión activa
/*onAuthStateChanged(auth, async (user) => {
  console.log("verificando usuario ", user);
});*/

const component = routes[window.location.pathname];
// history
window.onpopstate = () => {
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(component(onNavigate));
};

mainPage.appendChild(component(onNavigate));
