import axios from "axios";

const getLikes = async (name, likeUrl) => {
  let res = await axios.get(likeUrl);
  res = res.data.filter((data) => data.item_id === name); // returns an array with one element
  const result = res.length > 0 ? `${res[0].likes} Like(s)` : 0; // ternary operator
  return result;
};
export default getLikes;
