// Funciones para la interacción con el DOM del login y la vista(create element o template string)

import { loginWithGoogle } from '../lib/firebase';
import { loginWithEmail } from '../lib/firebase';

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

  // Validation functions

  function showError(divInput, divError, error) {
    divInput.style.border = '1px solid red';
    divError.innerHTML = `<img class="icon-error" src="./assets/icons/icon-error.svg">
    <p class="error">El campo no puede estar vacio</p>`;
  }
  function hideError(divInput, divError) {
    divInput.style.border = '1px solid hs1(246, 25% 77%)';
    divError.innerHTML = ``;
  }
  function validateEmpty(valueInput, divInput, divError, nameInput) {
    let resulte;
    if (valueInput.length === 0) {
      showError(divInput, divError, nameInput);
      resulte = true;
    } else {
      hideError(divInput, divError);
      resulte = false;
    }
    return resulte;
  }
  function validateEmail(valueInput, divInput, divError) {
    let resulte;
    const regExp =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    console.log(regExp.test(valueInput));
    if (regExp.test(valueInput) === true) {
      hideError(divInput, divError);
      resulte = true;
    } else {
      showError(divInput, divError);
      resulte = false;
    }
    return resulte;
  }

  // Validation
  const emailAddress = loginDiv.querySelector('#userEmail');
  const pass = loginDiv.querySelector('#userPassword');
  const emailAddressError = loginDiv.querySelector('#emailError');
  const passError = loginDiv.querySelector('#passError');

  const loginFormId = loginDiv.querySelector('#loginForm');

  loginFormId.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmail = loginFormId.userEmail.value;
    const password = loginFormId.userPassword.value;
    let userRegister = {};
    localStorage.removeItem('userRegister');

    // Input validation
    const isEmailEmpty = validateEmpty(
      userEmail,
      emailAddress,
      emailAddressError,
      'Email'
    );
    const isPassEmpty = validateEmpty(password, pass, passError, 'Contraseña');
    const isEmailValidate = validateEmail(
      userEmail,
      emailAddress,
      emailAddressError,
    );
console.log(("......."),isEmailEmpty, ("-------"),isEmailValidate, (".-.-."),isPassEmpty);
    if (isEmailEmpty && isPassEmpty && isEmailValidate) {
      loginWithEmail(userEmail, password)
        .then((response) => {
          const userCredentials = response;
          if (userCredentials.operationType === 'signIn') {
            userRegister.email = userCredentials.user.email;
            userRegister.id = userCredentials.user.uid;
            userRegister.photoUrl = './assets/icons/Account circle.svg';
            localStorage.setItem('userRegister', JSON.stringify(userRegister));
            onNavigate('/feed');
          }
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            alert('Contreseña incorrecta');
          } else if (error.code === 'auth/user-not-found') {
            alert('Usuario no encontrado');
          } else {
            alert(error.message, 'error');
          }
        });
    }
  });
  // -------Login Google-------
  const googleButton = loginDiv.querySelector('#loginGoogle');
  googleButton.addEventListener('click', () => {
    let userRegister = {};
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
        console.log(error);
      });
  });

  return loginDiv;
};
