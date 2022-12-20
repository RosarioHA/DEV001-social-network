import { saveComent, getComent } from './Firebase.js';

const comentArea = document.getElementById('comentArea');
const comentSpace = document.getElementById('comentSpace');

window.addEventListener('DOMContentLoaded', async () => {
  const querySnapshot = await getComent();

  let html = '';

  querySnapshot.forEach((doc) => {
    const coment = doc.data();
    html += `
        <div>
         <p>${coment.coment}
        </div>
    `;
  });
  comentSpace.innerHTML = html;
});

comentArea.addEventListener('submit', (event) => {
  event.preventDefault();

  const coment = comentArea.comentImput;

  saveComent(coment.value);
  comentArea.reset();
});
