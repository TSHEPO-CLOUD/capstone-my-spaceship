import axios from 'axios';
import loadPokemons from './loadPokemons.js';

const url = 'https://pokeapi.co/api/v2/pokemon/?limit=6';

const getPoke = async () => {
  try {
    const response = await axios.get(url);
    loadPokemons(response.data.results);
  } catch (error) {
    return error;
  }
  const response = 5;
  return response;
};

export default getPoke;
