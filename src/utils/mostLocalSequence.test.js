import mostLocalSequence from './mostLocalSequence.js';

const makeSequence = digits => {
  let result = [];
  const seq = mostLocalSequence(digits);
  for (let o of seq) {
    result.push(o);
  }
  return result;
};

describe('mostLocalSequence', () => {
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

  it('emits ordered sequence for 2', () => {
    const digits = 2;
    const result = makeSequence(digits);
    const expected = [[0], [0, 1]];

    expect(result).toEqual(expected);
  });

  it('emits ordered sequence for 3', () => {
    const digits = 3;
    const result = makeSequence(digits);
    const expected = [[0], [0, 1], [0, 1, 2]];

    expect(result).toEqual(expected);
  });

  it('emits ordered sequence for 4', () => {
    const digits = 4;
    const result = makeSequence(digits);
    const expected = [
      [0],
      [0, 1],
      [0, 1, 2],
      [0, 1, 2, 3],
    ];

    expect(result).toEqual(expected);
  });

  it('emits ordered sequence for 5', () => {
    const digits = 5;
    const result = makeSequence(digits);
    const expected = [
      [0],
      [0, 1],
      [0, 1, 2],
      [0, 1, 2, 3],
      [0, 1, 2, 3, 4],
    ];

    expect(result).toEqual(expected);
  });

  it('emits ordered sequence for 6', () => {
    const digits = 6;
    const result = makeSequence(digits);
    const expected = [
      [0],
      [0, 1],
      [0, 1, 2],
      [0, 1, 2, 3],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4, 5],
    ];

    expect(result).toEqual(expected);
  });
});

module.exports = makeSequence;
