// Funciones para la interacción con el DOM del login y la vista(create element o template string)

export const Login = (onNavigate) => {
  /*const logindiv = document.createElement("div");
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
  logindiv.appendChild(buttonLogin);*/

  //Template Strings
  const loginLogo = `<div class="login">
                        <img class="loginLogo__img" src="./assets/images/catsSociety--logo.png" alt="logo CatsSociety" />
                        <h2 class="loginLogo__title">CatsSociety</h2>
                      </div>`;

  const loginForm = `<form class="loginForm" id="loginForm">
                        <label class="loginForm__label" for="userEmail">Email:</label>
                        <input class="loginForm__input" type="email" id="userEmail" name="userEmail" placeholder="John@email.com">
                        <label class="loginForm__label" for="userPassword">Contraseña:</label>
                        <input class="loginForm__input" type="password" id="userPassword" name="userPassword" placeholder="Contraseña">
                        <a class="loginForm__link loginForm__link--black">¿Olvidaste la contreseña?</a>  
                        <input id="btnLogin" class="btn btn--primary" type="submit" value="Iniciar Sesión">
                      </form>`;

  const loginButtons = `<div class="loginButtons">
                          <h4 class="loginButtons__o">o</h4>
                          <button class="btn btn--google">Continua con Google</button>
                          <p>¿No tienes una cuenta? <a class="loginForm__link loginForm__link--blue" id="linkRegister">Regístrate</a></p>
                        </div>`;

  const login = `<section class=”sectionLeft”>
                  </section>
                  <section class=”sectionRight>
                    ${loginLogo}
                    ${loginForm}
                    ${loginButtons}
                  </section>`;

  const loginDiv = document.createElement("div");
  loginDiv.innerHTML = login;
  loginDiv.classList.add("container");

  const linkRegister = loginDiv.querySelector("#linkRegister");
  const buttonLogin = loginDiv.querySelector("#btnLogin");

  linkRegister.addEventListener("click", () => onNavigate("/register"));
  buttonLogin.addEventListener("click", () => {
    onNavigate("/");
    console.log("Bienvenidos, se inicio sesion");
  });

  return loginDiv;
};
