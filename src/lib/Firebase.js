// Import the functions you need from the SDKs you need
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  orderBy,
  query,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBhg4DSAWYv5vj5PvFXKIXRuZSP-O3HtNo',
  authDomain: 'sn-semillero.firebaseapp.com',
  projectId: 'sn-semillero',
  storageBucket: 'sn-semillero.appspot.com',
  messagingSenderId: '231094255194',
  appId: '1:231094255194:web:9f8e081918de3fd7436263',
  measurementId: 'G-0KGE235LCY',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const saveComent = (coment, userName, date, uid) => {
  addDoc(collection(db, 'coments'), {
    coment, userName, date, uid,
  });
};

export const getComent = () => getDocs(collection(db, 'coments'));

export const onGetComents = (querySnapshot) => {
  const queryPost = query(collection(db, 'coments'), orderBy('date', 'desc'));
  onSnapshot(queryPost, querySnapshot);
};

export const deleteComent = (id) => deleteDoc(doc(db, 'coments', id));

export const getPost = (id) => getDoc(doc(db, 'coments', id));

export const updatePost = (id, newFields) => updateDoc(doc(db, 'coments', id), newFields);
