import { logOut } from '../lib/Auth';

export const Wall = (onNavigate) => {
  const wallDiv = document.createElement('div');
  wallDiv.className = 'wall';

  const buttonLogout = document.createElement('button');
  buttonLogout.textContent = 'cerrar sesión';
  buttonLogout.id = 'btnLogout';
  buttonLogout.addEventListener('click', () => {
    logOut();
    onNavigate('/');
  });

  const menu = document.createElement('div');
  menu.className = 'menuWall';

  const comentArea = document.createElement('form');
  comentArea.id = 'comentArea';

  const comentImput = document.createElement('textarea');
  comentImput.className = 'comentImput';
  comentImput.id = 'comentImput';
  comentImput.rows = '7';

  const buttonComent = document.createElement('button');
  buttonComent.className = 'buttonComent';
  buttonComent.textContent = 'PUBLICAR';

  const comentSpace = document.createElement('div');
  comentSpace.className = 'comentSpace';

  wallDiv.append(menu, comentArea, comentSpace);
  comentArea.append(comentImput, buttonComent);
  menu.append(buttonLogout);

  return wallDiv;
};
