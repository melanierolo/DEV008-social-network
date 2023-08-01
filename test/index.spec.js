/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
import { createUser } from '../src/lib/firebase';
import { Register } from '../src/components/register.js';

jest.mock('../src/lib/firebase');

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('first Test for Register', () => {
  let registerDiv;
  let registerFormId;

  let inputName;
  let inputNameError;
  let inputEmail;
  let inputEmailError;
  let inputPassword;
  let inputPasswordError;
  let inputConfirmPassword;
  let inputConfirmPasswordError;

  let inputForSend;

  beforeEach(() => {
    document.body.appendChild(Register());

    registerDiv = document.createElement('div');
    registerDiv = document.querySelector('.container__r');
    registerFormId = registerDiv.querySelector('#registerFormId');

    inputName = registerDiv.querySelector('#userName');
    inputNameError = registerDiv.querySelector('#nameError');
    inputEmail = registerDiv.querySelector('#userEmail');
    inputEmailError = registerDiv.querySelector('#emailError');
    inputPassword = registerDiv.querySelector('#userPassword');
    inputPasswordError = registerDiv.querySelector('#passwordError');
    inputConfirmPassword = registerDiv.querySelector('#confirmPassword');
    inputConfirmPasswordError = registerDiv.querySelector(
      '#confirmPasswordError'
    );

    inputForSend = registerDiv.querySelector('#btnRegister');
  });

  /*it('Debería mostrar un error', async () => {
    createUser.mockImplementationOnce((email, password) => {
      return Promise.reject(new Error('Firebase: Error (auth/invalid-email).'));
    });

    inputForSend.click();
    await tick();
    expect(inputEmailError.innerHTML).toBe('Correo inválido.');
  });*/

  /* it('Debería mostrar exito', async () => {
    createUser.mockImplementationOnce((email, password) => {
      return Promise.resolve({
        user: { userCredential: 12345, email: email, password: password },
      });
    });

    inputEmail.value = 'email@verify.com';
    inputPassword.value = '123456';

    inputForSend.click();
    await tick();
    expect(succcessMessage.innerHTML).toBe('');
  }); */
});
