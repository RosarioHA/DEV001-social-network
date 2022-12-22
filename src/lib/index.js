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
      html += `
      <li class= 'prueba'>
        <div>
        <p>${coment.userName}</p>
         <h3>${coment.coment}</h3>
         <button class='btnEdit' data-id="${doc.id}"> Editar </button>
         <button class='btnDelete' data-id="${doc.id}"> Eliminar </button>
        </div>
      </li>  
    `;
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

  if (!editStatus) {
    saveComent(coment.value, currentUserInfo().displayName);
  } else {
    UpdatePost(id, {
      coment: coment.value,
    });

    editStatus = false;
  }

  comentArea.reset();
});
