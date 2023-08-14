import axios from 'axios';

import Notiflix from 'notiflix';
const error = document.querySelector('.error');
error.classList.add('hidden');
const API_KEY =
  'live_4Tn9geSwD6nYnjlHS5lSpHs1EfvddAhOvLTsr3QhUqbTm79Q07AiBwjtDRRcIikD';

axios.defaults.headers.common['x-api-key'] = API_KEY;

const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const SEARCH_BREED = 'https://api.thecatapi.com/v1/images/search?breed_ids=';

export function fetchBreeds() {
  return axios
    .get(BREEDS_URL)
    .then(({ data }) => {
      //   console.log(data);
      return data;
    })
    .catch(err => console.error(err.message));
}

export function fetchCatByBreed(breedId) {
  return fetch(`${SEARCH_BREED}${breedId}&api_key=${API_KEY}`)
    .then(res => {
      if (!res.ok) {
        error.classList.remove('hidden');
        throw new Error(res.status);
      }
      return res.json();
    })
    .catch(err => {
      Notiflix.Notify.failure(err.message);
    });
}
