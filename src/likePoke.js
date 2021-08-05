import axios from 'axios';
import getLikes from './getLikes.js';

const likePoke = async (name, likeUrl) => {
  await axios.post(likeUrl, { item_id: name }).then((res) => res);
  document.getElementById(name).textContent = await getLikes(name, likeUrl);
};

export default likePoke;
