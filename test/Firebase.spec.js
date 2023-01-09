// import {
//   addDoc, collection, deleteDoc, onSnapshot, doc, getDoc, updateDoc, query, orderBy,
// } from 'firebase/firestore';
// import {
//   app, db, saveComent, getComent, onGetComents, deleteComent, getPost, updatePost,
// } from '../src/lib/Firebase.js';

// // test saveComent
// describe('saveComent', () => {
//   test('debería ser una función', () => {
//     expect(typeof saveComent).toBe('function');
//   });
//   test('Ejecuta addDoc()', () => {
//     addDoc(collection(db, 'text'), {
//       content: 'Hola',
//       date: '24/12/2022, 19:25:49',
//       uid: 'u8C7XOB7gAfnDaGdoJqh0ryTpu23',
//       userName: 'Mengana',
//     });
//     expect(addDoc).toHaveBeenCalled();
//   });
//   test('debería recibir una promesa resuleta', async () => {
//     await expect(Promise.resolve(saveComent)).resolves.toBeDefined();
//   });
//   test('Deberia rechazar la promesa', () => {
//     addDoc.mockRejectedValue(new Error('FirestoreErrorCode'));
//     saveComent().catch((error) => {
//       expect(error.message).toBe('FirestoreErrorCode');
//     });
//   });
// });
