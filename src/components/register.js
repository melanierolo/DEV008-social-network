import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase.js";

// Interacción con el DOM de registro

export const Register = (onNavigate) => {
  /*const registerdiv = document.createElement("div");
  registerdiv.textContent = "Bienvenido al registro";
  const buttonLogin = document.createElement("button");

  buttonLogin.textContent = "Regresar al Log In";
  buttonLogin.addEventListener("click", () => onNavigate("/"));

  registerdiv.appendChild(buttonLogin);*/

  const registerLogo = `<div class="registerLogo">
                          <img class="registerLogo__img" src="./assets/images/catsSociety--logo.png" alt="logo CatsSociety" />
                          <p class="registerLogo__title">CatsSociety</p>
                        </div>`;

  const registerForm = `<form id="registerFormId" class="registerForm">
                          <label for="userName" class="registerForm__label">Nombre:</label>
                          <input
                            type="Name"
                            name="userName"
                            id="userName"
                            class="registerForm__input marginBottom_4"
                            placeholder="John"
                          />

                          <label for="userEmail" class="registerForm__label"
                            >Correo electrónico</label
                          >
                          <input
                            type="email"
                            name="userEmail"
                            id="userEmail"
                            class="registerForm__input marginBottom_4"
                            placeholder="John@email.com"
                          />

                          <label for="userPassword" class="registerForm__label"
                            >Contraseña</label
                          >
                          <input
                            type="password"
                            name="userPassword"
                            id="userPassword"
                            class="registerForm__input marginBottom_4"
                            placeholder="Contraseña"
                          />

                          <label for="confirmPassword" class="registerForm__label"
                            >Confirmar contraseña</label
                          >
                          <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            class="registerForm__input marginBottom_4"
                            placeholder="Repetir contraseña"
                          />

                          <input type="submit" value="Registrarse" id="btnRegister" class="btn btn--primary" />
                        </form>`;
  const registerButtons = `<div>
                            <p class="registerButtons__o marginBottom_8">o</p>
                            <button class="btn btn--google marginBottom_16">
                                Continua con Google
                            </button>
                            <p class="register__Account">
                                ¿Tienes cuenta?
                                <a id="linkLogin" class="registerForm__link--blue">Ingresa</a>
                            </p>
                          </div>`;

  const register = `<section class="sectionLeftRegister"></section>
                    <section class="sectionRightRegister">
                      <div class="register">
                        ${registerLogo}
                        ${registerForm}
                        ${registerButtons}
                      </div>
                    </section>`;

  const registerDiv = document.createElement("div");
  registerDiv.innerHTML = register;
  registerDiv.classList.add("container__r");

  const linkLogin = registerDiv.querySelector("#linkLogin");
  /*const buttonRegister = registerDiv.querySelector("#btnRegister");

  linkLogin.addEventListener("click", () => onNavigate("/"));
  buttonRegister.addEventListener("click", () => {
    onNavigate("/register");
    console.log("Bienvenido a la sociedad de los gatos");
  });*/

  // Form Register
  const registerFormId = registerDiv.querySelector("#registerFormId");
  console.log("ver form:", registerFormId);

  registerFormId.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userEmail = registerFormId["userEmail"].value;
    const userPassword = registerFormId["userPassword"].value;

    console.log(userEmail, userPassword);

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      console.log(userCredentials);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("El correo está en uso.");
      } else if (error.code === "auth/invalid-email") {
        alert("Correo inválido.");
      } else if (error.code === "auth/weak-password") {
        alert("La contraseña es débil.");
      } else if (error.code) {
        alert("Algo ocurrio mal.");
      }
    }

    //Reset the form here
    //registerFormId.reset();
  });

  return registerDiv;
};
