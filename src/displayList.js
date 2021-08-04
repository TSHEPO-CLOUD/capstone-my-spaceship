let url = "https://pokeapi.co/api/v2/pokemon/?limit=6&offset=6";
let apiKey = "FPwS7kLi1stB3QIQqLTK";
const getPoke = async () => {
  try {
    let response = await axios.get(url);
    console.log(response.data.results);
    loadPokemons(response.data.results);
  } catch (error) {
    return error;
  }
};const loadPokemons = (pokes) => {
  pokes.forEach((poke) => {
    singlePoke(poke.url);
    console.log(poke.url);
  });
};const singlePoke = async (pokeurl) => {
  let res = await axios.get(pokeurl);
  console.log(res);
  let name = res.data.name;
  let image = res.data.sprites.front_default;
  createElements(name, image);
};const createElements = async (name, image) => {
  let ul = document.getElementById("cards");
  let li = document.createElement("li");
  let div = document.createElement("div");
  let likeIcon = document.createElement("i");
  likeIcon.classList.add("far", "fa-heart");
  li.classList.add("list");
  let pokeName = document.createElement("p");
  pokeName.textContent = name;
  let pokeImg = document.createElement("img");
  pokeImg.classList.add("image");
  pokeImg.src = image;
  let commentBtn = document.createElement("button");
  commentBtn.textContent = "Comments";
	
  li.appendChild(pokeImg);
  div.appendChild(pokeName);
  div.appendChild(likeIcon);
  li.appendChild(div);
  li.appendChild(commentBtn);
  ul.appendChild(li);
};