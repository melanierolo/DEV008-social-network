/* eslint-disable prefer-promise-reject-errors */
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

    registerFormId = document.querySelector('#registerFormId');

    inputName = document.querySelector('#userName');
    inputNameError = document.querySelector('#nameError');
    inputEmail = document.querySelector('#userEmail');
    inputEmailError = document.querySelector('#emailError');
    inputPassword = document.querySelector('#userPassword');
    inputPasswordError = document.querySelector('#passwordError');
    inputConfirmPassword = document.querySelector('#confirmPassword');
    inputConfirmPasswordError = document.querySelector('#confirmPasswordError');

    inputForSend = document.querySelector('#btnRegister');
  });

  it('Debería mostrar un error', async () => {
    inputEmail.value = 'email@verify.com';
    inputPassword.value = '123456';

    createUser.mockImplementationOnce((email, password) => {
      return Promise.reject({ code: 'auth/invalid-email' });
    });

    inputForSend.click();
    await tick();
    expect(inputEmailError.innerHTML)
      .toBe(`<img class="icon-error" src="./assets/icons/icon-error.svg">
    <p class="error">Correo inválido.</p>`);
  });

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
