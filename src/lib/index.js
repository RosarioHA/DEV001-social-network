import {
  saveComent, onGetComents, deleteComent, getPost, UpdatePost,
} from './Firebase.js';
import { currentUserInfo } from './Auth.js';

const comentArea = document.getElementById('comentArea');
const comentSpace = document.getElementById('comentSpace');
let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () => {
  onGetComents((querySnapshot) => {
    let html = '';

    querySnapshot.forEach((doc) => {
      const coment = doc.data();
      const time = coment.date.seconds;
      const objectoAccion = new Date(time * 1000);
      // if (si uid usuario = uid post) se muestra el botón  else (lo oculta)
      if (coment.uid === currentUserInfo().uid) {
        console.log('bieen');
        html += `
        <li class= 'post'>
          <div>
          <h6 class='date'> ${objectoAccion}</h6>
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
          <h6 class='date'> ${objectoAccion}</h6>
          <h5>${coment.userName}</h5>
           <h3>${coment.coment}</h3>
          </div>
        </li>  
      `;
      }
    });

    comentSpace.innerHTML = html;

    const btnsDelete = comentSpace.querySelectorAll('.btnDelete');
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        deleteComent(dataset.id);
      });
    });

    const btnsEdit = comentSpace.querySelectorAll('.btnEdit');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        const doc = await getPost(dataset.id);
        const post = doc.data();
        comentArea.comentImput.value = post.coment;

        editStatus = true;
        id = doc.id;
      });
    });
  });
});

comentArea.addEventListener('submit', (event) => {
  event.preventDefault();

  const coment = comentArea.comentImput;
  const date = new Date();
  const uid = currentUserInfo().uid;

  if (!editStatus) {
    saveComent(coment.value, currentUserInfo().displayName, date, uid);
  } else {
    UpdatePost(id, {
      coment: coment.value,
    });

    editStatus = false;
  }

  comentArea.reset();
});
