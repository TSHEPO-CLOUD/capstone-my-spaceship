import axios from 'axios';
import commentLoader from './commentLoader.js';

const addComment = (pokeName, commentUrl) => {
  const container = document.createElement('div');
  const header = document.createElement('h4');
  header.innerHTML = 'Add a comment';
  container.appendChild(header);
  const nameInput = document.createElement('input');
  const commentInput = document.createElement('input');
  nameInput.type = 'text';
  commentInput.type = 'text';
  nameInput.placeholder = 'Your name';
  commentInput.placeholder = 'Your comment';
  const btn = document.createElement('button');
  btn.innerHTML = 'Comment';
  btn.addEventListener('click', async () => {
    await axios
      .post(commentUrl, {
        comment: commentInput.value,
        item_id: pokeName,
        username: nameInput.value,
      })
      .then((res) => res);
    const resp = await axios.get(`${commentUrl}?item_id=${pokeName}`);

    const para = commentLoader(resp.data[resp.data.length - 1]);
    document.getElementById(`con-${pokeName}`).appendChild(para);
  });
  container.appendChild(nameInput);
  container.appendChild(commentInput);
  container.appendChild(btn);
  return container;
};

export default addComment;
