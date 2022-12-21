import {
  saveComent, getComent, onGetComents, deleteComent,
} from './Firebase.js';

const comentArea = document.getElementById('comentArea');
const comentSpace = document.getElementById('comentSpace');

window.addEventListener('DOMContentLoaded', async () => {
  onGetComents((querySnapshot) => {
    let html = '';

    querySnapshot.forEach((doc) => {
      const coment = doc.data();
      html += `
        <div>
         <p>${coment.coment}</p>
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
  });
});

comentArea.addEventListener('submit', (event) => {
  event.preventDefault();

  const coment = comentArea.comentImput;

  saveComent(coment.value);
  comentArea.reset();
});
