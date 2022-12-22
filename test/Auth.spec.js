/**
 * @jest-environment jsdom
 */
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  signUp, signInGoogle, logOut, auth,
} from '../src/lib/Auth.js';

// TEST PROVIDER

// ERROR: TypeError: (0 , _Auth.auth) is not a function
describe('auth()', () => {
  it('debe ejecutar el método getAuth', () => {
    auth();
    expect(getAuth).toHaveBeenCalled();
  });
});
// TEST CREATEUSER

// check, está usando los mocks?
describe('signUp()', () => {
  it('debe llamar al callback', async () => {
    const testMail = 'falsomail@no.com';
    const testPass = '123';
    const callback = jest.fn();
    await signUp(testMail, testPass, callback);
    expect(callback).toHaveBeenCalled();
  });
  it ('debe llamar la funcion signInWithEmailAndPassword', () => {
    const testMail = 'falsomail@no.com';
    const testPass = '123';
    const callback = jest.fn();
    await signUp(testMail, testPass, callback);
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });
});

// check
describe('signInGoogle()', () => {
  it('debe ejecutar el método signInWithPopup', async () => {
    const callback = jest.fn();
    await signInGoogle(callback);
    expect(callback).toHaveBeenCalled();
  });
});

// ERROR: hay que hacer un mock o spy de signOut. Está hecho pero no lo estamos llamando bien?
describe('logOut()', () => {
  it('debe ejecutar el método signOut', async () => {
    await logOut();
    expect(signOut).toHaveBeenCalled();
  });
});
