import { fetchBreeds } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchCatByBreed } from './cat-api.js';

const selectBreed = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

// loader.textContent = '';
loader.classList.add('loading');
selectBreed.classList.add('hidden');
catInfoContainer.classList.add('hidden');
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
    loader.classList.remove('loading');
    selectBreed.classList.remove('hidden');
  })
  .catch(error => {
    console.error(error);
  });

function onSelect(e) {
  const breedId = e.target.value;
  console.log(breedId);
  fetchCatByBreed(breedId).then(resp => {
    console.log(resp);
    const markup = resp
      .map(breeds => {
        const breed = breeds.breeds[0];
        return `<div class="cat-image">
    <img src="${breeds.url}" alt="${breedId}" id="cat-image" width=360 style="margin-top:20px"/>
  </div>
  <div class="cat-details">
    <h2 id="breed-name">${breed.name}</h2>
    <p id="breed-description">${breed.description}</p>
    <p id="breed-temperament">${breed.temperament}</p>
  </div>`;
      })
      .join('');
    catInfoContainer.classList.remove('hidden');
    addMarkup(markup, catInfoContainer);
  });
}

function addMarkup(markup, el) {
  el.innerHTML = markup;
}
