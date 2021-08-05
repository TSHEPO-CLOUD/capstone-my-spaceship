// import _ from "lodash";
import "./style.css";
import axios from "axios";

const url = "https://pokeapi.co/api/v2/pokemon/?limit=6";
const apiKey = "FPwS7kLi1stB3QIQqLTK";
const likeUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKey}/likes`;
// data needed >>>  { item_id: ? }
// example { item_id: "ivysaur" }
const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKey}/comments`;
// data needed >>> { item_id: ?, username: ?, comment: ? }
// example { item_id: "ivysaur", username: "Polina", comment: "I love pokemons" }
// Example for getting comments
// let name = "ivysaur";
const likePoke = async (name) => {
  await axios.post(likeUrl, { item_id: name }).then((res) => res);
  document.getElementById(name).textContent = await getLikes(name);
};

const displayPopup = async (pokeurl) => {
  const res = await axios.get(pokeurl);
  const image = res.data.sprites.front_default;
  const { name } = res.data;
  const { weight } = res.data;
  const { height } = res.data;
  const type = res.data.types[0].type.name;

  const body = document.getElementById("body");
  const popupDiv = document.createElement("div");

  const div = document.createElement("div");
  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fas", "fa-times");
  const pokeImg = document.createElement("img");
  pokeImg.classList.add("image");
  pokeImg.src = image;
  closeIcon.addEventListener("click", () => {
    body.removeChild(popupDiv);
  });

  const pokeName = document.createElement("p");
  pokeName.textContent = name;
  const measureH = document.createElement("p");
  const measureW = document.createElement("p");
  const pokeType = document.createElement("p");
  measureH.innerHTML = `Height: ${height}`;
  measureW.innerHTML = `Weight: ${weight}`;
  pokeType.innerHTML = `Type: ${type}`;
  div.appendChild(pokeImg);
  div.appendChild(closeIcon);
  popupDiv.appendChild(div);
  popupDiv.appendChild(pokeName);
  popupDiv.appendChild(measureH);
  popupDiv.appendChild(measureW);
  popupDiv.appendChild(pokeType);
  popupDiv.appendChild(await commentSection(name));
  popupDiv.appendChild(await addComment(name));
  body.appendChild(popupDiv);
};
const createElements = async (name, image, pokeurl) => {
  const ul = document.getElementById("cards");
  const li = document.createElement("li");
  const like = document.createElement("i");
  const likeCounter = document.createElement("p");
  const commentBtn = document.createElement("button");
  commentBtn.addEventListener("click", () => {
    displayPopup(pokeurl);
  });
  commentBtn.textContent = "Comments";
  likeCounter.textContent = await getLikes(name);
  likeCounter.id = name;

  like.classList.add("far", "fa-heart");

  like.addEventListener("click", () => {
    likePoke(name);
  });
  li.classList.add("list");
  const pokeName = document.createElement("p");
  pokeName.textContent = name;
  const pokeImg = document.createElement("img");
  pokeImg.classList.add("image");
  pokeImg.src = image;
  li.appendChild(pokeImg);
  li.appendChild(pokeName);
  li.appendChild(like);
  li.appendChild(likeCounter);
  li.appendChild(commentBtn);
  ul.appendChild(li);
};
// >>>>>>>>>  Get data prom API
const singlePoke = async (pokeurl) => {
  const res = await axios.get(pokeurl);
  const { name } = res.data;
  const image = res.data.sprites.front_default;
  createElements(name, image, pokeurl);
};

const loadPokemons = (pokes) => {
  pokes.forEach((poke) => {
    singlePoke(poke.url);
  });
};

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

const getLikes = async (name) => {
  let res = await axios.get(likeUrl);
  res = res.data.filter((data) => data.item_id === name); // returns an array with one element
  const result = res.length > 0 ? res[0].likes : 0; // ternary operator
  return result;
};

getPoke();

const commentSection = async (name) => {
  const container = document.createElement("div");
  container.id = `con-${name}`;
  const header = document.createElement("h4");
  const res = await axios.get(`${commentUrl}?item_id=${name}`);
  const count = res.data ? res.data.length : 0;
  header.innerHTML = `Comments (${count})`;
  container.appendChild(header);
  res.data.forEach((data) => {
    container.appendChild(commentLoader(data));
  });
  return container;
};

const commentLoader = (data) => {
  const para = document.createElement("p");
  para.innerHTML = `${data.creation_date} ${data.username}: ${data.comment}`;
  return para;
};

const addComment = (pokeName) => {
  const container = document.createElement("div");
  const header = document.createElement("h4");
  header.innerHTML = "Add a comment";
  container.appendChild(header);
  const nameInput = document.createElement("input");
  const commentInput = document.createElement("input");
  nameInput.type = "text";
  commentInput.type = "text";
  nameInput.placeholder = "Your name";
  commentInput.placeholder = "Your comment";
  const btn = document.createElement("button");
  btn.innerHTML = "Comment";
  btn.addEventListener("click", async () => {
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
