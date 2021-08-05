import axios from "axios";
import commentSection from "./commentSection.js";
import addComment from "./addComment.js";

export const apiKey = "FPwS7kLi1stB3QIQqLTK";

const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${apiKey}/comments`;

const displayPopup = async (pokeurl) => {
  const bgDiv = document.createElement("div");
  bgDiv.classList.add("bg-div");
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
    body.removeChild(bgDiv);
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
  popupDiv.appendChild(await commentSection(name, commentUrl));
  popupDiv.appendChild(await addComment(name, commentUrl));
  bgDiv.appendChild(popupDiv);
  body.appendChild(bgDiv);
};

export default displayPopup;
