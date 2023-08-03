/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
import { loginWithGoogle, loginWithEmail } from '../lib/firebase';

// Validation functions

function showError(divInput, divError, errorMessage) {
  divInput.style.border = '1px solid red';
  divError.innerHTML = `<img class="icon-error" src="./assets/icons/icon-error.svg">
  <p class="error">${errorMessage}</p>`;
}
function hideError(divInput, divError) {
  divInput.style.border = '1px solid hs1(246, 25% 77%)';
  divInput.style.border = '1px solid #00b4b8';
  divError.innerHTML = '';
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

// Funciones para la interacción con el DOM del login y la vista(create element o template string)
export const Login = (onNavigate) => {
  // Template Strings
  const loginLogo = `<div class="loginLogo">
                        <img class="loginLogo__img" src="./assets/images/catsSociety--logo.png" alt="logo CatsSociety" />
                        <h2 class="loginLogo__title">CatsSociety</h2>
                      </div>`;

  const loginForm = `<form class="loginForm" id="loginForm">
                        <label class="loginForm__label marginBottom_4" for="userEmail">Email:</label>
                        <input class="loginForm__input marginBottom_4" type="email" id="userEmail" name="userEmail" placeholder="John@email.com">
                        <div id="emailError" class="error-container">
                        </div>
            
                        <label class="loginForm__label marginBottom_4" for="userPassword">Contraseña:</label>
                        <input class="loginForm__input marginBottom_4" type="password" id="userPassword" name="userPassword" placeholder="Contraseña">
                        <div id="passError" class="error-container"></div>
                        
                        <a class="loginForm__link loginForm__link--black marginBottom_16">¿Olvidaste la contraseña?</a>  
                        <input id="btnLogin" class="btn btn--primary marginBottom_8" type="submit" value="Iniciar Sesión">
                      </form>`;

  const loginButtons = `<div class="loginButtons">
                          <h4 class="loginButtons__o marginBottom_8">o</h4>
                          <button id="loginGoogle" class="btn btn--google marginBottom_16">Continua con Google</button>
                          <p>¿No tienes una cuenta?</p>
                          <a class="loginForm__link loginForm__link--blue" id="linkRegister">Regístrate</a>
                        </div>`;

  const login = `<section class="sectionLeft">
                  </section>
                  <section class="sectionRight">
                    <div class="login">
                      ${loginLogo}
                      ${loginForm}
                      ${loginButtons}
                    </div>
                  </section>`;

  const loginDiv = document.createElement('div');
  loginDiv.classList.add('container');
  loginDiv.innerHTML = login;

  const linkRegister = loginDiv.querySelector('#linkRegister');
  linkRegister.addEventListener('click', () => onNavigate('/register'));

  // Validation
  const emailAddress = loginDiv.querySelector('#userEmail');
  const pass = loginDiv.querySelector('#userPassword');
  const emailAddressError = loginDiv.querySelector('#emailError');
  const passError = loginDiv.querySelector('#passError');

  const buttonLoginFormId = loginDiv.querySelector('#loginForm');

  buttonLoginFormId.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmail = buttonLoginFormId.userEmail.value;
    const userPassword = buttonLoginFormId.userPassword.value;
    const userRegister = {};
    localStorage.removeItem('userRegister');

    // Input validation
    const isEmailValidate = validateEmail(
      userEmail,
      emailAddress,
      emailAddressError,
      'El email no es válido.'
    );
    const isPassEmpty = validateEmpty(
      userPassword,
      pass,
      passError,
      'La contraseña está vacía.'
    );

    if (!isPassEmpty && isEmailValidate) {
      loginWithEmail(userEmail, userPassword)
        .then((response) => {
          const userCredentials = response;
          if (userCredentials.operationType === 'signIn') {
            userRegister.email = userCredentials.user.email;
            userRegister.id = userCredentials.user.uid;
            userRegister.photoUrl = './assets/icons/Account-circle.svg';
            localStorage.setItem('userRegister', JSON.stringify(userRegister));
            onNavigate('/feed');
          }
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            showError(pass, passError, 'Contraseña incorrecta');
          } else if (error.code === 'auth/user-not-found') {
            showError(emailAddress, emailAddressError, 'Usuario no encontrado');
          } else {
            throw new Error(error.message, 'error');
          }
        });
    }
  });
  // -------Login Google-------
  const googleButton = loginDiv.querySelector('#loginGoogle');
  googleButton.addEventListener('click', () => {
    const userRegister = {};
    localStorage.removeItem('userRegister');
    loginWithGoogle()
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

  return loginDiv;
};
