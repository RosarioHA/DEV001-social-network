import { logOut } from '../lib/Auth';

export const Wall = (onNavigate) => {
  const wallDiv = document.createElement('div');
  wallDiv.className = 'wall';

  const comentArea = document.createElement('form');
  comentArea.id = 'comentArea';

  const comentImput = document.createElement('textarea');
  comentImput.id = 'comentImput';
  comentImput.rows = '7';

  const buttonLogout = document.createElement('button');
  buttonLogout.textContent = 'cerrar sesión';
  buttonLogout.id = 'btnLogout';
  buttonLogout.addEventListener('click', () => {
    comentArea.reset();
    logOut();
    onNavigate('/');
    window.location.reload();
  });

  const menu = document.createElement('div');
  menu.className = 'menuWall';

  const buttonComent = document.createElement('button');
  buttonComent.className = 'buttonComent';
  buttonComent.textContent = 'PUBLICAR';

  const comentSpace = document.createElement('ul');
  comentSpace.id = 'comentSpace';

  wallDiv.append(menu, comentArea, comentSpace);
  comentArea.append(comentImput, buttonComent);
  menu.append(buttonLogout);

  return wallDiv;
};
