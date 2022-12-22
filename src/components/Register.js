import { createUser } from '../lib/Auth.js';

export const Register = (onNavigate) => {
  const homeDiv = document.createElement('div');
  homeDiv.className = 'contenedor';

  const textoRegister = document.createElement('h2');
  textoRegister.textContent = 'Puedes registrarte en Semillero usando tu correo electrónico. Tu clave debe tener un mínimo de seis dígitos:';

  const registerName = document.createElement('input');
  registerName.placeholder = 'agrega tu nombre de usuario';

  const registerMail = document.createElement('input');
  registerMail.placeholder = 'ingresa tu correo';
  registerMail.type = 'email';

  const registerPass = document.createElement('input');
  registerPass.placeholder = 'crea una contraseña';
  registerPass.type = 'password';

  const errorSpace = document.createElement('p');
  errorSpace.id = 'errorSpace';

  const buttonSend = document.createElement('button');
  buttonSend.textContent = 'CREAR USUARIO';
  buttonSend.classList.add('register');

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'VOLVER AL INICIO';
  buttonHome.addEventListener('click', () => {
    onNavigate('/');
  });

  buttonSend.addEventListener('click', () => {
    const userMail = registerMail.value;
    const userPass = registerPass.value;
    const userName = registerName.value;
    createUser(userMail, userPass, userName)
      .then(() => {
        // Signed in
        onNavigate('/wall');
        // ..
      })
      // sería ideal pasar éste .catch para el otro lado? revisar denuevo test-camp 22-12
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          document.getElementById('errorSpace').innerHTML = 'Éste correo ya está registrado';
        } else if (error.code === 'auth/invalid-email') {
          document.getElementById('errorSpace').innerHTML = 'El correo que ingresaste es inválido';
        } else if (error.code === 'auth/weak-password') {
          document.getElementById('errorSpace').innerHTML = 'Tu clave tiene que tener un mínimo de seis dígitos';
        } else if (error.code) {
          document.getElementById('errorSpace').innerHTML = 'Revisa los datos ingresados, algo no está bien';
        }
      });
  });

  homeDiv.append(
    textoRegister,
    registerName,
    registerMail,
    registerPass,
    errorSpace,
    buttonSend,
    buttonHome,
  );
  return homeDiv;
};
