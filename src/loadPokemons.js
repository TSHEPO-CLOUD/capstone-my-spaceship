import singlePoke from './singlePoke.js';

const loadPokemons = (pokes) => {
  pokes.forEach((poke) => {
    singlePoke(poke.url);
  });
};
export default loadPokemons;
