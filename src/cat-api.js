import axios from 'axios';

const API_KEY =
  'live_4Tn9geSwD6nYnjlHS5lSpHs1EfvddAhOvLTsr3QhUqbTm79Q07AiBwjtDRRcIikD';

axios.defaults.headers.common['x-api-key'] = API_KEY;

const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const SEARCH_BREED = 'https://api.thecatapi.com/v1/images/search?breed_ids=';

export function fetchBreeds() {
  return axios.get(BREEDS_URL).then(({ data }) => {
    if (!data.length) {
      throw new Error('No data available');
    }
    return data;
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${SEARCH_BREED}${breedId}&api_key=${API_KEY}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
