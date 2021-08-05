import axios from "axios";
import commentLoader from "./commentLoader.js";

const addComment = (pokeName, commentUrl) => {
  const container = document.createElement("div");
  container.classList.add("popup-container");
  const header = document.createElement("h4");
  header.innerHTML = "Add a comment";
  container.appendChild(header);
  const popupComment = document.createElement("div");
  popupComment.classList.add("popup-comment");
  const nameInput = document.createElement("input");
  nameInput.classList.add("name-input");
  const commentInput = document.createElement("input");
  commentInput.classList.add("comment-input");
  nameInput.type = "text";
  commentInput.type = "text";
  nameInput.placeholder = "Your name";
  commentInput.placeholder = "Your comment";
  const btn = document.createElement("button");
  btn.innerHTML = "Comment";
  btn.classList.add("popup-cemment-btn");
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
  popupComment.appendChild(nameInput);
  popupComment.appendChild(commentInput);
  popupComment.appendChild(btn);
  container.appendChild(popupComment);
  return container;
};

export default addComment;
