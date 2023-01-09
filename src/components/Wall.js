import { currentUserInfo, logOut } from '../lib/Auth';
import {
  deleteComent,
  getPost,
  onGetComents,
  saveComent,
  updatePost,
} from '../lib/Firebase';

export const Wall = (onNavigate) => {
  let editStatus = false;
  let id = '';

  const wallDiv = document.createElement('div');
  wallDiv.className = 'wall';

  const comentAreaEl = document.createElement('form');
  comentAreaEl.id = 'comentArea';

  const comentImput = document.createElement('textarea');
  comentImput.id = 'comentImput';
  comentImput.rows = '7';

  const buttonLogout = document.createElement('button');
  buttonLogout.textContent = 'cerrar sesión';
  buttonLogout.id = 'btnLogout';
  buttonLogout.addEventListener('click', () => {
    comentAreaEl.reset();
    logOut();
    onNavigate('/');
  });

  const menu = document.createElement('div');
  menu.className = 'menuWall';

  const buttonComent = document.createElement('button');
  buttonComent.className = 'buttonComent';
  buttonComent.textContent = 'PUBLICAR';

  const comentSpaceEl = document.createElement('ul');
  comentSpaceEl.id = 'comentSpace';

  wallDiv.append(menu, comentAreaEl, comentSpaceEl);
  comentAreaEl.append(comentImput, buttonComent);
  menu.append(buttonLogout);

  onGetComents((querySnapshot) => {
    let html = '';

    querySnapshot.forEach((doc) => {
      const coment = doc.data();
      const time = coment.date.seconds;
      const date = new Date(time * 1000);
      if (coment.uid === currentUserInfo().uid) {
        html += `
        <li class= 'post'>
          <div>
          <h6 class='date'> ${date}</h6>
          <h5>${coment.userName}</h5>
           <h3>${coment.coment}</h3>
           <section id='btns'>
              <button class='btnEdit' data-id="${doc.id}"> Editar </button>
              <button class='btnDelete' data-id="${doc.id}"> Eliminar </button>
            </section> 
          </div>
        </li>  
      `;
      } else {
        html += `
        <li class= 'post'>
          <div>
          <h6 class='date'> ${date}</h6>
          <h5>${coment.userName}</h5>
           <h3>${coment.coment}</h3>
          </div>
        </li>  
      `;
      }
    });
    comentSpaceEl.innerHTML = html;

    const btnsDelete = comentSpaceEl.querySelectorAll('.btnDelete');
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        deleteComent(dataset.id);
      });
    });

    const btnsEdit = comentSpaceEl.querySelectorAll('.btnEdit');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        const doc = await getPost(dataset.id);
        const post = doc.data();
        comentAreaEl.comentImput.value = post.coment;

        editStatus = true;
        id = doc.id;
      });
    });
  });

  comentAreaEl.addEventListener('submit', (event) => {
    event.preventDefault();

    const coment = comentAreaEl.comentImput;
    const date = new Date();
    const uid = currentUserInfo().uid;

    if (!editStatus) {
      saveComent(coment.value, currentUserInfo().displayName, date, uid);
    } else {
      updatePost(id, {
        coment: coment.value,
      });
      editStatus = false;
    }
    comentAreaEl.reset();
  });

  return wallDiv;
};
