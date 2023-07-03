// Interacción con el DOM de registro
import { onNavigate } from "../main.js";
export const Register = () => {
  const registerdiv = document.createElement("div");
  registerdiv.textContent = "Bienvenido al registro";
  const buttonLogin = document.createElement("button");

  buttonLogin.textContent = "Regresar al Log In";
  buttonLogin.addEventListener("click", () => onNavigate("/"));

  registerdiv.appendChild(buttonLogin);

  return registerdiv;
};
