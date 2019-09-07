import leastShopsSequence from './leastShopsSequence.js';

const makeSequence = digits => {
  let result = [];
  const seq = leastShopsSequence(digits);
  for (let o of seq) {
    result.push(o);
  }
  return result;
};

describe('leastShopsSequence', () => {
  it('emits nothing for 0', () => {
    const digits = 0;
    const result = makeSequence(digits);
    const expected = [];

    expect(result).toEqual(expected);
  });

  it('emits a single item for 1', () => {
    const digits = 1;
    const result = makeSequence(digits);
    const expected = [[0]];

    expect(result).toEqual(expected);
  });

  it('emits the possible combinations for 2', () => {
    const digits = 2;
    const result = makeSequence(digits);
    const expected = [[0], [1], [0, 1]];

    expect(result).toEqual(expected);
  });

  it('emits the possible combinations for 3', () => {
    const digits = 3;
    const result = makeSequence(digits);
    const expected = [[0], [1], [2], [0, 1], [0, 2], [1, 2], [0, 1, 2]];

    expect(result).toEqual(expected);
  });

  it('emits the possible combinations for 4', () => {
    const digits = 4;
    const result = makeSequence(digits);
    const expected = [
      [0],
      [1],
      [2],
      [3],
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
      [2, 3],
      [0, 1, 2],
      [0, 1, 3],
      [0, 2, 3],
      [1, 2, 3],
      [0, 1, 2, 3],
    ];

    expect(result).toEqual(expected);
  });

  it('emits the possible combinations for 5', () => {
    const digits = 5;
    const result = makeSequence(digits);
    const expected = [
      [0],
      [1],
      [2],
      [3],
      [4],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4],
      [0, 1, 2],
      [0, 1, 3],
      [0, 1, 4],
      [0, 2, 3],
      [0, 2, 4],
      [0, 3, 4],
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 4],
      [2, 3, 4],
      [0, 1, 2, 3],
      [0, 1, 2, 4],
      [0, 1, 3, 4],
      [0, 2, 3, 4],
      [1, 2, 3, 4],
      [0, 1, 2, 3, 4],
    ];

    expect(result).toEqual(expected);
  });

  it('emits the possible combinations for 6', () => {
    const digits = 6;
    const result = makeSequence(digits);
    const expected = [
      [0],
      [1],
      [2],
      [3],
      [4],
      [5],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 3],
      [2, 4],
      [2, 5],
      [3, 4],
      [3, 5],
      [4, 5],
      [0, 1, 2],
      [0, 1, 3],
      [0, 1, 4],
      [0, 1, 5],
      [0, 2, 3],
      [0, 2, 4],
      [0, 2, 5],
      [0, 3, 4],
      [0, 3, 5],
      [0, 4, 5],
      [1, 2, 3],
      [1, 2, 4],
      [1, 2, 5],
      [1, 3, 4],
      [1, 3, 5],
      [1, 4, 5],
      [2, 3, 4],
      [2, 3, 5],
      [2, 4, 5],
      [3, 4, 5],
      [0, 1, 2, 3],
      [0, 1, 2, 4],
      [0, 1, 2, 5],
      [0, 1, 3, 4],
      [0, 1, 3, 5],
      [0, 1, 4, 5],
      [0, 2, 3, 4],
      [0, 2, 3, 5],
      [0, 2, 4, 5],
      [0, 3, 4, 5],
      [1, 2, 3, 4],
      [1, 2, 3, 5],
      [1, 2, 4, 5],
      [1, 3, 4, 5],
      [2, 3, 4, 5],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 5],
      [0, 1, 2, 4, 5],
      [0, 1, 3, 4, 5],
      [0, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [0, 1, 2, 3, 4, 5],
    ];

    expect(result).toEqual(expected);
  });
});

module.exports = makeSequence;
