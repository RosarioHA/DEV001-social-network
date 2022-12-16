/**
 * @jest-environment jsdom
 */
import { signUp, signInGoogle, logOut } from '../src/lib/Auth.js';

jest.mock('firebase/auth');

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

// éste es el unico que corre bien
describe('signInGoogle()', () => {
  it('debe ejecutar el método signInWithPopup', async () => {
    const callback = jest.fn();
    await signInGoogle(callback);
    expect(callback).toHaveBeenCalled();
  });
});

describe('logOut()', () => {
  it('debe ejecutar el método signOut', async () => {
    const callback = jest.fn();
    await logOut(callback);
    expect(callback).toHaveBeenCalled();
  });
});
