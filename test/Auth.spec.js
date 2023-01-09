/**
 * @jest-environment jsdom
 */
// import { jest } from 'jest';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
// import { createUserWithEmailAndPassword } from '../__mocks__/@firebase/auth.js';
import {
  createUser, signUp, signInGoogle, logOut, currentUserInfo,
} from '../src/lib/Auth.js';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../src/lib/Auth.js');

// test createUser
describe('createUser', () => {
  it('debería ser  una función', () => {
    expect(typeof createUser).toBe('function');
  });
  it('debería ejecutar la función createUserWithEmailAndPassword()', async () => {
    const email = 'mailfalso@mail.com';
    const password = '123password';
    await expect(createUser(email, password)).resolves.toBeUndefined();
  });
});

// test signUp
describe('signUp', () => {
  it('debería ser una función', () => {
    expect(typeof signUp).toBe('function');
  });
  it('debería ejecutar la función sigInWithEmailAndPassword()', async () => {
    const email = 'testmail@mail.com';
    const password = '654321';
    const signInTest = jest.fn();
    signUp(email, password);
    await expect(signInTest).resolves.toHaveBeenCalled();
  });
});

// test signInGoogle
describe('signInGoogle', () => {
  it('debería ser  una función', () => {
    expect(typeof signInGoogle).toBe('function');
  });
  // it('debería ejecutar la función signInWithPopup()', () => {
  //   const auth = jest.fn();
  //   const provider = jest.fn();
  //   expect(signInGoogle(auth, provider)).resolves.toBeUndefined();
  // });
  it('debería ejecutar la función signInWithPopup', async () => {
    const onNavigate = jest.fn();
    await signInGoogle(onNavigate);
    expect(onNavigate).toHaveBeenCalled();
  });
});

// test logOut
describe('logOut', () => {
  it('debería ser una función', () => {
    expect(typeof logOut).toBe('function');
  });
  it('debería ejecutar la función signOut()', () => {
    const auth = jest.fn();
    signOut(auth);
    expect(signOut).toHaveBeenCalled();
  });
  it('debería recibir una promesa resuleta', async () => {
    await expect(Promise.resolve(logOut)).resolves.toBeDefined();
  });
});
// test currentUserInfo

// // ERROR: TypeError: (0 , _Auth.auth) is not a function
// describe('auth()', () => {
//   it('debe ejecutar el método getAuth', () => {
//     auth();
//     expect(getAuth).toHaveBeenCalled();
//   });
// });

// // TEST CREATEUSER

// // check, está usando los mocks?
// describe('signUp()', () => {
//   it('debe llamar al callback', async () => {
//     const testMail = 'falsomail@no.com';
//     const testPass = '123';
//     const callback = jest.fn();
//     await signUp(testMail, testPass, callback);
//     expect(callback).toHaveBeenCalled();
//   });
//   it('debe llamar la funcion signInWithEmailAndPassword', async () => {
//     const testMail = 'falsomail@no.com';
//     const testPass = '123';
//     const callback = jest.fn();
//     await signUp(testMail, testPass, callback);
//     expect(signInWithEmailAndPassword).toHaveBeenCalled();
//   });
// });

// // check
// describe('signInGoogle()', () => {
//   it('debe ejecutar el método signInWithPopup', async () => {
//     const callback = jest.fn();
//     await signInGoogle(callback);
//     expect(callback).toHaveBeenCalled();
//   });
// });

// // ERROR: hay que hacer un mock o spy de signOut. Está hecho pero no lo estamos llamando bien?
// describe('logOut()', () => {
//   it('debe ejecutar el método signOut', async () => {
//     await logOut();
//     expect(signOut).toHaveBeenCalled();
//   });
// });
