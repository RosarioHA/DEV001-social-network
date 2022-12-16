/**
 * @jest-environment jsdom
 */
import { signOut } from 'firebase/auth';
import { signUp, signInGoogle, logOut } from '../src/lib/Auth.js';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

// TEST PROVIDER Y AUTH ?
// TEST CREATEUSER

// TEST SIGNUP
describe('signUp()', () => {
  it('debe ejecutar el método signInWithEmailAndPassword', async () => {
    const testMail = ('falsomail@no.com');
    const testPass = ('123');
    const callback = jest.fn();
    await signUp(testMail, testPass, callback);
    expect(testMail).toBe('falsomail@no.com');
    expect(testPass).toBe('123');
    expect(callback).toHaveBeenCalled();
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
// check
describe('logOut()', () => {
  it('debe ejecutar el método signOut', async () => {
    await logOut();
    expect(signOut).toHaveBeenCalled();
  });
});
