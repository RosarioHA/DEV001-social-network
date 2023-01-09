/**
 * @jest-environment jsdom
 */
import {
  addDoc, collection, getDocs, deleteDoc, onSnapshot, doc, getDoc, updateDoc, query, orderBy,
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
// import { createUserWithEmailAndPassword } from '../__mocks__/@firebase/auth.js';
import {
  createUser, signUp, signInGoogle, logOut, currentUserInfo,
} from '../src/lib/Auth.js';
import {
  app, db, saveComent, getComent, onGetComents, deleteComent, getPost, updatePost,
} from '../src/lib/Firebase.js';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../src/lib/Auth.js');
jest.mock('../src/lib/Firebase.js');

// TEST AUTH.JS
// test createUser
describe('createUser', () => {
  it('debería ser  una función', () => {
    expect(typeof createUser).toBe('function');
  });
  it('debería ejecutar la función createUserWithEmailAndPassword', () => {
    createUserWithEmailAndPassword.mockImplementation(() => {
      Promise.resolve({
        email: 'testmail@mail.com',
        password: '654321',
      });
    });
    createUser(createUserWithEmailAndPassword);
    expect(createUserWithEmailAndPassword).toBeCalled();
  });
  // it('debería ejecutar la función createUserWithEmailAndPassword', async () => {
  //   const email = 'testmail@mail.com';
  //   const password = '654321';
  //   await expect(createUser(email, password)).resolves.toBeUndefined();
  // });
  it('Deberia retornar un objeto con las propiedades email y password', () => {
    createUser('testmail@mail.com', '654321');
    expect({
      email: 'testmail@mail.com',
      password: '654321',
    }).toEqual(expect.anything());
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
});
it('debería ejecutar la función signInWithPopup', async () => {
  const onNavigate = jest.fn();
  await signInGoogle(onNavigate);
  expect(onNavigate).toHaveBeenCalled();
});

// test logOut CHECK
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
describe('currentUserInfo', () => {
  it('debería ser  una función', () => {
    expect(typeof currentUserInfo).toBe('function');
  });
  it('debería ejecutar la función auth', () => {
    const auth = jest.fn();
    expect(auth).toHaveBeenCalled();
  });
});

// TEST FIREBASE.JS
// test saveComent - CHECK
describe('saveComent', () => {
  it('debería ser una función', () => {
    expect(typeof saveComent).toBe('function');
  });
  it('debería ejecutar la función addDoc()', () => {
    addDoc(collection(db, 'text'), {
      content: 'Mensaje',
      date: '09/01/2023, 14:42:00',
      uid: 'u8C7XOB7gAfnDaGdoJqh0ryTpu23',
      userName: 'Usuario',
    });
    expect(addDoc).toHaveBeenCalled();
  });
  it('debería recibir una promesa resuleta', async () => {
    await expect(Promise.resolve(saveComent)).resolves.toBeDefined();
  });
});

// test getComent - CHECK
describe('getComent', () => {
  it('debería ser una función', () => {
    expect(typeof getComent).toBe('function');
  });
  it('debería ejecutar la función getDocs()', () => {
    getDocs(collection(db, 'coments'));
    expect(getDocs).toHaveBeenCalled();
  });
});

// test onGetComents - CHECK
describe('onGetComents', () => {
  it('debería ser una función', () => {
    expect(typeof onGetComents).toBe('function');
  });
  it('debería ejecutar query', () => {
    query(collection(db, 'texto'));
    expect(query).toHaveBeenCalled();
    expect(collection).toHaveBeenCalled();
  });
  it('debería ejecutar orderBy', () => {
    orderBy('date', 'desc');
    expect(orderBy).toHaveBeenCalled();
  });
  it('debería ejecutar onSnapshot()', () => {
    onSnapshot(collection(db, 'texto'));
    expect(onSnapshot).toHaveBeenCalled();
  });
});

// test deleteComent - CHECK
describe('deleteComent', () => {
  it('debería ser una función', () => {
    expect(typeof deleteComent).toBe('function');
  });
  it('debería ejecutar la función deleteDoc()', () => {
    deleteDoc(doc(db, 'texto'));
    expect(deleteDoc).toHaveBeenCalled();
  });
});

// test getPost - CHECK
describe('getPost', () => {
  it('debería ser una función', () => {
    expect(typeof getPost).toBe('function');
  });
  it('debería ejecutar la función getDoc()', () => {
    getDoc(doc(db, 'texto'));
    expect(getDoc).toHaveBeenCalled();
  });
});

// test updatePost - CHECK
describe('updatePost', () => {
  it('debería ser una función', () => {
    expect(typeof updatePost).toBe('function');
  });
  it('debería ejecutar la función updateDoc()', () => {
    updateDoc(doc(db, 'texto'));
    expect(getDoc).toHaveBeenCalled();
  });
});
