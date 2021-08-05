import displayPopup, { apiKey } from './displayPopup.js';
import getLikes from './getLikes.js';
import likePoke from './likePoke.js';

const likeUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKey}/likes`;

const createElements = async (name, image, pokeurl) => {
  const ul = document.getElementById('cards');
  const li = document.createElement('li');
  const like = document.createElement('i');
  const likeCounter = document.createElement('p');
  const commentBtn = document.createElement('button');
  commentBtn.addEventListener('click', () => {
    displayPopup(pokeurl);
  });
  commentBtn.textContent = 'Comments';
  likeCounter.textContent = await getLikes(name, likeUrl);
  likeCounter.id = name;

  like.classList.add('far', 'fa-heart');

  like.addEventListener('click', () => {
    likePoke(name, likeUrl);
  });
  li.classList.add('list');
  const pokeName = document.createElement('p');
  pokeName.textContent = name;
  const pokeImg = document.createElement('img');
  pokeImg.classList.add('image');
  pokeImg.src = image;
  li.appendChild(pokeImg);
  li.appendChild(pokeName);
  li.appendChild(like);
  li.appendChild(likeCounter);
  li.appendChild(commentBtn);
  ul.appendChild(li);
};

export default createElements;
