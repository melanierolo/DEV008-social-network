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

  const registerForm = `<form class="registerForm">
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

                          <input type="submit" value="Registrarse" class="btn btn--primary" />
                        </form>`;
  const registerButtons = `<div>
                            <p class="register__o marginBottom_8">o</p>
                            <button class="btn btn--google marginBottom_16">
                                Continua con Google
                            </button>
                            <p class="register__register">
                                ¿Tienes cuenta?
                                <a href="" class="registerForm_link--blue">Ingresa</a>
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

  return registerDiv;
};
