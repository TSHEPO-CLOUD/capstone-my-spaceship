import axios from 'axios';

const likeUrl = 'FPwS7kLi1stB3QIQqLTK';
const getLikes = async (name) => {
  let res = await axios.get(likeUrl);
  res = res.data.filter((data) => data.item_id === name);
  const result = res.length > 0 ? res[0].likes : 0;
  return result;
};

getLikes();
