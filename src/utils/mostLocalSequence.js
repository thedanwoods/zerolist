function* mostLocalSequence(digits) {
  if (digits < 1) return;

  for (let n = 1; n <= digits; n += 1) {
    yield Array.from(new Array(n).keys());
  }

  return;
}

module.exports = mostLocalSequence;
