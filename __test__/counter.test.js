// jest.mock("../counter");
const commentSection = require('../__mocks__/counter.js');

describe('Counter', () => {
  test('count the number of pokemons', () => {
    expect(commentSection()).toBe(3);
  });
});
