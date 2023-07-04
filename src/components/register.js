// Interacción con el DOM de registro

export const Register = (onNavigate) => {
  const registerdiv = document.createElement("div");
  registerdiv.textContent = "Bienvenido al registro";
  const buttonLogin = document.createElement("button");

  buttonLogin.textContent = "Regresar al Log In";
  buttonLogin.addEventListener("click", () => onNavigate("/"));

  registerdiv.appendChild(buttonLogin);

  return registerdiv;
};
