function commentSection(data = true) {
  const res = ['I like it', 'Love it', 'My favourite'];

  const count = data ? res.length : 0;

  return count;
}
module.exports = commentSection;
