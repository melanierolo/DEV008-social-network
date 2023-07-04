// Funciones para la interacción con el DOM del login y la vista(create element o template string)

export const Login = (onNavigate) => {
  const logindiv = document.createElement("div");
  const buttonRegister = document.createElement("button");
  const buttonLogin = document.createElement("button");

  buttonRegister.textContent = "Registrate";
  buttonLogin.textContent = "Iniciar Sesión";

  buttonRegister.addEventListener("click", () => onNavigate("/register"));
  buttonLogin.addEventListener("click", () => {
    onNavigate("/");
    console.log("Bienvenidos, se inicio sesion");
  });

  logindiv.appendChild(buttonRegister);
  logindiv.appendChild(buttonLogin);

  return logindiv;
};
