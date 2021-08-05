import axios from 'axios';
import commentLoader from './commentLoader.js';

const commentSection = async (name, commentUrl) => {
  const container = document.createElement('div');
  container.id = `con-${name}`;
  const header = document.createElement('h4');
  const res = await axios.get(`${commentUrl}?item_id=${name}`);
  const count = res.data ? res.data.length : 0;
  header.innerHTML = `Comments (${count})`;
  container.appendChild(header);
  res.data.forEach((data) => {
    container.appendChild(commentLoader(data));
  });
  return container;
};

export default commentSection;
