const likePoke = async (name) => {
 await axios.post(likeUrl, { item_id: name }).then((res) => console.log(res));
 document.getElementById(name).textContent = await getLikes(name);
};getPoke();