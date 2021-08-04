/* eslint-disable max-classes-per-file, consistent-return */
import axios from 'axios';

const createElements = async (name, image) => {
  const ul = document.getElementById('cards');
  const li = document.createElement('li');
  const div = document.createElement('div');
  const likeIcon = document.createElement('i');
  likeIcon.classList.add('far', 'fa-heart');
  li.classList.add('list');
  const pokeName = document.createElement('p');
  pokeName.textContent = name;
  const pokeImg = document.createElement('img');
  pokeImg.classList.add('image');
  pokeImg.src = image;
  const commentBtn = document.createElement('button');
  commentBtn.textContent = 'Comments';

  li.appendChild(pokeImg);
  div.appendChild(pokeName);
  div.appendChild(likeIcon);
  li.appendChild(div);
  li.appendChild(commentBtn);
  ul.appendChild(li);
};

const singlePoke = async (pokeurl) => {
  const res = await axios.get(pokeurl);
  console.log(res);
  const { name } = res.data;
  const image = res.data.sprites.front_default;
  createElements(name, image);
};

const loadPokemons = (pokes) => {
  pokes.forEach((poke) => {
    singlePoke(poke.url);
    console.log(poke.url);
  });
};

const url = 'https://pokeapi.co/api/v2/pokemon/?limit=6&offset=6';
const getPoke = async () => {
  try {
    const response = await axios.get(url);
    console.log(response.data.results);
    loadPokemons(response.data.results);
  } catch (error) {
    return error;
  }
};

getPoke();
