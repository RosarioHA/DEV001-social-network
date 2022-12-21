import {
  saveComent, getComent, onGetComents, deleteComent, getPost,
} from './Firebase.js';

const comentArea = document.getElementById('comentArea');
const comentSpace = document.getElementById('comentSpace');
let editStatus = false;

window.addEventListener('DOMContentLoaded', async () => {
  onGetComents((querySnapshot) => {
    let html = '';

    querySnapshot.forEach((doc) => {
      const coment = doc.data();
      html += `
        <div>
         <p>${coment.coment}</p>
         <button class='btnEdit' data-id="${doc.id}"> Editar </button>
         <button class='btnDelete' data-id="${doc.id}"> Eliminar </button>
        </div>
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
      });
    });
  });
});

comentArea.addEventListener('submit', (event) => {
  event.preventDefault();

  const coment = comentArea.comentImput;

  if (editStatus) {
    console.log('editando...');
  } else {
    saveComent(coment.value);
  }

  comentArea.reset();
});
