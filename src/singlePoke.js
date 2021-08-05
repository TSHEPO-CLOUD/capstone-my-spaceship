import axios from 'axios';
import createElements from './createElements.js';

const singlePoke = async (pokeurl) => {
  const res = await axios.get(pokeurl);

  const { name } = res.data;
  const image = res.data.sprites.front_default;
  createElements(name, image, pokeurl);
};

export default singlePoke;
