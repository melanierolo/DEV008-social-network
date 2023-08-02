/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
import { registerWithGoogle, createUser } from '../lib/firebase.js';

// Validation functions

function showError(divInput, divError, errorMessage) {
  divInput.style.border = '1px solid red';
  divError.innerHTML = `<img class="icon-error" src="./assets/icons/icon-error.svg"><p class="error">${errorMessage}</p>`;
}
function hideError(divInput, divError) {
  divInput.style.border = '1px solid hs1(246, 25% 77%)';
  divError.innerHTML = '';
  divInput.style.border = '1px solid #00b4b8';
}
function validateEmpty(valueInput, divInput, divError, errorMessage) {
  let result;
  if (valueInput.length === 0) {
    showError(divInput, divError, errorMessage);
    result = true;
  } else {
    hideError(divInput, divError);
    result = false;
  }
  return result;
}
function validateEmail(valueInput, divInput, divError, errorMessage) {
  let result;
  const regExp =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  const isEmailValid = regExp.test(valueInput);

  if (isEmailValid) {
    hideError(divInput, divError);
    result = true;
  } else {
    showError(divInput, divError, errorMessage);
    result = false;
  }
  return result;
}

function validatePassword(valueInput, divInput, divError, errorMessage) {
  let result;
  const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  const isPasswordValid = regExp.test(valueInput);

  if (isPasswordValid) {
    hideError(divInput, divError);
    result = true;
  } else {
    showError(divInput, divError, errorMessage);
    result = false;
  }
  return result;
}

function matchPasswordFields(
  valueInputOne,
  valueInputTwo,
  divInput,
  divError,
  errorMessage
) {
  let result;
  const arePasswordsEqual = valueInputOne === valueInputTwo;

  if (arePasswordsEqual) {
    hideError(divInput, divError);
    result = true;
  } else {
    showError(divInput, divError, errorMessage);
    result = false;
  }
  return result;
}

// Interacción con el DOM de registro

export const Register = (onNavigate) => {
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
                        <div id="nameError" class="error-container"></div>

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
                        <div id="emailError" class="error-container"></div>

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
                        <div id="passwordError" class="error-container"></div>

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
                        <div id="confirmPasswordError" class="error-container"></div>

                        <input type="submit" value="Registrarse" id="btnRegister" class="btn btn--primary" />
                      </form>`;

  const registerButtons = `<div>
                            <p class="registerButtons__o marginBottom_8">o</p>
                            <button id="loginGoogle" class="btn btn--google marginBottom_16">
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

  const registerDiv = document.createElement('div');
  registerDiv.innerHTML = register;
  registerDiv.classList.add('container__r');

  const linkLogin = registerDiv.querySelector('#linkLogin');
  linkLogin.addEventListener('click', () => onNavigate('/'));

  // user inputs for data entry fields
  const inputName = registerDiv.querySelector('#userName');
  const inputEmail = registerDiv.querySelector('#userEmail');
  const inputPassword = registerDiv.querySelector('#userPassword');
  const inputConfirmPassword = registerDiv.querySelector('#confirmPassword');
  const inputNameError = registerDiv.querySelector('#nameError');
  const inputEmailError = registerDiv.querySelector('#emailError');
  const inputPasswordError = registerDiv.querySelector('#passwordError');
  const inputConfirmPasswordError = registerDiv.querySelector(
    '#confirmPasswordError'
  );

  // Form Register
  const registerFormId = registerDiv.querySelector('#registerFormId');

  registerFormId.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = inputName.value;
    const userEmail = inputEmail.value;
    const userPassword = inputPassword.value;
    const userConfirmPassword = inputConfirmPassword.value;

    // Validate user inputs for data entry fields
    const isNameEmpty = validateEmpty(
      userName,
      inputName,
      inputNameError,
      'El nombre está vacío.'
    );

    const isEmailValidate = validateEmail(
      userEmail,
      inputEmail,
      inputEmailError,
      'El email no es válido.'
    );

    const isPassValidate = validatePassword(
      userPassword,
      inputPassword,
      inputPasswordError,
      'La contraseña debe tener al menos 8 caracteres e incluir al menos 1 mayúscula, 1 minúscula, 1 número y se permiten caracteres especiales.'
    );

    const arePassIdentical = matchPasswordFields(
      userPassword,
      userConfirmPassword,
      inputConfirmPassword,
      inputConfirmPasswordError,
      'Las contraseñas deben ser iguales.'
    );

    if (!isNameEmpty && isEmailValidate && isPassValidate && arePassIdentical) {
      createUser(userEmail, userPassword)
        .then((response) => {
          const userCredentials = response;
          if (userCredentials.operationType === 'signIn') {
            onNavigate('/');
          }
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            showError(inputEmail, inputEmailError, 'El correo está en uso');
          } else if (error.code === 'auth/invalid-email') {
            showError(inputEmail, inputEmailError, 'Correo inválido.');
          } else if (error.code === 'auth/weak-password') {
            showError(
              inputPassword,
              inputPasswordError,
              'La contraseña es débil.'
            );
          } else if (error.code) {
            throw new Error('error', error.message, error.code);
          }
        });
    }
  });

  // -------Register Google-------
  const googleButton = registerDiv.querySelector('#loginGoogle');
  googleButton.addEventListener('click', () => {
    const userRegister = {};
    localStorage.removeItem('userRegister');
    registerWithGoogle()
      .then((resolve) => {
        const googleCredentials = resolve;
        if (googleCredentials.operationType === 'signIn') {
          userRegister.email = googleCredentials.user.email;
          userRegister.id = googleCredentials.user.uid;
          userRegister.photoUrl = googleCredentials.user.photoURL;
          userRegister.name = googleCredentials.user.displayName;
          localStorage.setItem('userRegister', JSON.stringify(userRegister));
          onNavigate('/feed');
        }
      })
      .catch((error) => {
        throw new Error(error.message, error.code);
      });
  });

  return registerDiv;
};
