import axios from "axios";

const getLikes = async (name, likeUrl) => {
  let res = await axios.get(likeUrl);
  res = res.data.filter((data) => data.item_id === name);
  const result = res.length > 0 ? `${res[0].likes} Like(s)` : 0;
  return result;
};
export default getLikes;
