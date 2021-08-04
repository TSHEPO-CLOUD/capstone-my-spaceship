import axios from 'axios';

function getLikes(name) {
  return name;
}

const likePoke = async (name) => {
  await axios.post(name, { item_id: name }).then((res) => console.log(res));
  document.getElementById(name).textContent = await getLikes(name);
};

likePoke();
