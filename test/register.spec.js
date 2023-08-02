/* eslint-disable object-shorthand */
/* eslint-disable operator-linebreak */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable arrow-body-style */
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

  it('Should render the Register button', () => {
    const buttonRegister = document.querySelector('#btnRegister');
    expect(buttonRegister).toBeTruthy();
  });

  it('Should display an error message for invalid email', async () => {
    inputName.value = 'test';
    inputEmail.value = 'test@gmail.com';
    inputPassword.value = 'password123C#';
    inputConfirmPassword.value = 'password123C#';

    createUser.mockImplementationOnce((email, password) => {
      return Promise.reject({ code: 'auth/invalid-email' });
    });

    inputForSend.click();
    await tick();

    // Split the innerHTML content into twp parts: image tag and paragraph tag
    const imageTag =
      '<img class="icon-error" src="./assets/icons/icon-error.svg">';
    const errorMessage = '<p class="error">Correo inválido.</p>';

    const expectedMessage = `${imageTag}${errorMessage}`;
    expect(inputEmailError.innerHTML).toContain(expectedMessage);
  });

  it('should pass test', async () => {
    inputName.value = 'test2';
    inputEmail.value = 'test2@gmail.com';
    inputPassword.value = 'password123D#';
    inputConfirmPassword.value = 'password123D#';

    createUser.mockImplementationOnce((email, password) => {
      return Promise.resolve({
        user: { userCredential: 12345, email: email, password: password },
      });
    });

    inputForSend.click();
    await tick();
    expect(inputNameError.innerHTML).toBe('');
    expect(inputEmailError.innerHTML).toBe('');
    expect(inputPasswordError.innerHTML).toBe('');
    expect(inputConfirmPasswordError.innerHTML).toBe('');
  });
});
