import { fetchBreeds } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchCatByBreed } from './cat-api.js';

const selectBreed = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');

selectBreed.addEventListener('change', onSelect);

fetchBreeds()
  .then(breeds => {
    const options = breeds.map(breed => {
      return { value: breed.id, text: breed.name };
    });

    new SlimSelect({
      select: selectBreed,
      data: options,
    });
  })
  .catch(error => {
    console.error(error);
  });

function onSelect(e) {
  const breedId = e.target.value;
  console.log(breedId);
  fetchCatByBreed(breedId).then(resp => {
    const markup = `<div class="cat-image">
    <img src="${resp.url}" alt="${breedId}" id="cat-image" />
  </div>
  <div class="cat-details">
    <h2 id="breed-name">${resp.name}</h2>
    <p id="breed-description">${resp.description.value}</p>
    <p id="breed-temperament">${resp.temperament}</p>
  </div>`;

    addMarkup(markup, catInfoContainer);
  });
}

function addMarkup(markup, el) {
  el.innerHTML = markup;
}

function fetchCatByBreed(breedId) {
  return fetch(`${SEARCH_BREED}${breedId}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      console.log(res.json());
      return res.json();
    })
    .catch(err => {
      Notiflix.Notify.failure(err.message);
    });
}

// {
//   description, name, image;
// }
