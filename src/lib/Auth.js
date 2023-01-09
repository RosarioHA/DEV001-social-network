import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { app } from './Firebase.js';

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Inicia el autentificador con google
export const provider = new GoogleAuthProvider();

// CREAR USUARIO CON EMAIL
// eslint-disable-next-line max-len
export const createUser = (userMail, userPass, userName) => createUserWithEmailAndPassword(auth, userMail, userPass)
  .then(() => {
    updateProfile(getAuth().currentUser, {
      displayName: userName,
    });
  });

// INGRESAR CON USUARIO EXISTENTE
export const signUp = (userMail, userPass) => signInWithEmailAndPassword(auth, userMail, userPass);

// INGRESAR CON GOOGLE
export const signInGoogle = async (onNavigate) => {
  try {
    await signInWithPopup(auth, provider);
    onNavigate('/wall');
  } catch (error) {
    console.log(error);
  }
};

// FUNCIÓN DE SIGNOUT
export const logOut = async () => {
  await signOut(auth);
};

// FUNCION DE CURRENTUSERINFO
export const currentUserInfo = () => auth.currentUser;
