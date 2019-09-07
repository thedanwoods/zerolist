function nextOutOfSequence(arr) {
  let p = arr.length - 1;
  while (p > 0) {
    if (arr[p] - arr[p - 1] === 1) {
      p -= 1;
    } else {
      return p - 1;
    }
  }
  return -1;
}

function* leastShopsSequence(digits) {
  if (digits < 1) return;

  let n = 1;

  while (n <= digits) {
    const last = digits - 1;
    const end = n - 1;

    let cur = [...Array(n).keys()];
    yield [...cur];
    while (true) {
      while (cur[end] < last) {
        // Increment the last digit
        cur[end] = cur[end] + 1;

        yield [...cur];
      }

      const second = nextOutOfSequence(cur);
      if (second === -1) {
        break;
      }

      cur = [
        ...cur.slice(0, second),
        cur[second] + 1,
        /* eslint-disable-next-line no-loop-func */
        ...[...Array(end - second).keys()].map(el => el + cur[second] + 2),
      ];
      yield [...cur];
    }
    n += 1;
  }
  return;
}

module.exports = leastShopsSequence;
