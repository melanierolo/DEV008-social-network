// Funciones para la interacción con el DOM del login y la vista(create element o template string)

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { async } from 'regenerator-runtime';

export const Login = (onNavigate) => {
  //Template Strings
  const loginLogo = `<div class="loginLogo">
                        <img class="loginLogo__img" src="./assets/images/catsSociety--logo.png" alt="logo CatsSociety" />
                        <h2 class="loginLogo__title">CatsSociety</h2>
                      </div>`;

  const loginForm = `<form class="loginForm" id="loginForm">
                        <label class="loginForm__label marginBottom_4" for="userEmail">Email:</label>
                        <input class="loginForm__input marginBottom_4" type="email" id="userEmail" name="userEmail" placeholder="John@email.com">
                        <label class="loginForm__label marginBottom_4" for="userPassword">Contraseña:</label>
                        <input class="loginForm__input marginBottom_4" type="password" id="userPassword" name="userPassword" placeholder="Contraseña">
                        <a class="loginForm__link loginForm__link--black marginBottom_16">¿Olvidaste la contraseña?</a>  
                        <input id="btnLogin" class="btn btn--primary marginBottom_8" type="submit" value="Iniciar Sesión">
                      </form>`;

  const loginButtons = `<div class="loginButtons">
                          <h4 class="loginButtons__o marginBottom_8">o</h4>
                          <button id="loginGoogle" class="btn btn--google marginBottom_16">Continua con Google</button>
                          <p>¿No tienes una cuenta? <a class="loginForm__link loginForm__link--blue" id="linkRegister">Regístrate</a></p>
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

  const loginFormId = loginDiv.querySelector('#loginForm');
  console.log(loginFormId);
  loginFormId.addEventListener('submit', async (e) => {
    console.log('miau');
    e.preventDefault();
    const userEmail = loginFormId['userEmail'].value;
    const password = loginFormId['userPassword'].value;
    console.log(userEmail, password);
    let userRegister = {};
    localStorage.removeItem('userRegister');
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      if (userCredentials.operationType === 'signIn') {
        console.log('user-data', userCredentials);
        userRegister['email'] = userCredentials.user.email;
        userRegister['id'] = userCredentials.user.uid;
        userRegister['photoUrl'] = './assets/icons/Account circle.svg';
        localStorage.setItem('userRegister', JSON.stringify(userRegister));
        console.log(userRegister);
        onNavigate('/feed');
      }
      console.log(userCredentials);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        alert('Contreseña incorrecta');
      } else if (error.code === 'auth/user-not-found') {
        alert('Usuario no encontrado');
      } else {
        alert(error.message, 'error');
      }
    }
  });
  // -------Login Google-------
  const googleButton = loginDiv.querySelector('#loginGoogle');
  googleButton.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    let userRegister = {};
    localStorage.removeItem('userRegister');
    try {
      const googleCredentials = await signInWithPopup(auth, provider);
      console.log(googleCredentials);

      if (googleCredentials.operationType === 'signIn') {
        console.log('user-data', googleCredentials);
        userRegister['email'] = googleCredentials.user.email;
        userRegister['id'] = googleCredentials.user.uid;
        userRegister['photoUrl'] = googleCredentials.user.photoURL;
        userRegister['name'] = googleCredentials.user.displayName;
        localStorage.setItem('userRegister', JSON.stringify(userRegister));
        console.log(userRegister);
        onNavigate('/feed');
      }
    } catch (error) {
      console.log(error);
    }
  });

  return loginDiv;
};
