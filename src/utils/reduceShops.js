function sortByHierarchy(data, shopsHierarchy) {
  const sortByShop = (a, b) =>
    shopsHierarchy.indexOf(a) - shopsHierarchy.indexOf(b);
  return [...data].sort(sortByShop);
}
// Given an array of lists of shop ids,
// return them in order of preference. e.g.
// [['beetroot', 'gather', 'grocery'], ['beetroot', 'byo', 'budgens']]
// returns
// [['beetroot', 'byo', 'budgens'], ['beetroot', 'gather', 'grocery']]
function sortChoices(choices, shopsHierarchy) {
  const scoreShopList = list =>
    list
      .map(shop => shopsHierarchy.indexOf(shop))
      .reduce((acc, cur) => acc + cur, 0);
  return [...choices].sort((a, b) => scoreShopList(a) - scoreShopList(b));
}

// Sort by how local the list is.
// Prefer ones at the top of the list.
function localSort(choices, shopsHierarchy) {
  const reversedHierarchy = [...shopsHierarchy].reverse();
  const scoreShopList = list =>
    list
      .map(shop => reversedHierarchy.indexOf(shop))
      .reduce((acc, cur) => acc + cur ** 2, 0);
  return [...choices].sort((a, b) => scoreShopList(b) - scoreShopList(a));
}

function canBuyEverything(data, sources) {
  let ok = true;
  data.forEach(item => {
    let shops = item.sources.map(source => source.shop);
    // If NO items in shops are in sources, set ok to false.
    if (!shops.filter(el => sources.includes(el)).length) {
      ok = false;
    }
  });
  return ok;
}

// Find all combinations of shops
function findAllCombinations(initialData, allShops) {
  let validShopsCombinations = [];
  function tryRemoval(data, sources) {
    if (!canBuyEverything(data, sources)) return;
    validShopsCombinations.push(sources);
    // If not everything can be bought, return.
    for (let i = 0; i < sources.length; i++) {
      const removed = [...sources.slice(0, i), ...sources.slice(i + 1)];
      tryRemoval(data, removed);
    }
    return null;
  }
  tryRemoval(initialData, allShops);
  return validShopsCombinations;
}

function pickFewest(arr) {
  const fewest = arr.reduce(
    (acc, cur) => (cur.length < acc ? cur.length : acc),
    Infinity,
  );
  return arr.filter(el => el.length === fewest);
}

// Create an array of all the shop name/ids
function listAllShops(data) {
  return [
    ...new Set(
      data
        .map(item => item.sources.map(source => source.shop))
        .reduce((acc, val) => acc.concat(val), []),
    ),
  ];
}

function makeListWithShops(shops, data) {
  return data.map(item => {
    if (!shops) {
      return { ...item, source: 'elsewhere' };
    }
    // We want to get it from the *first* shop in the shops list
    let buyable;
    for (let i = 0; i < shops.length; i++) {
      buyable = item.sources.filter(source => source.shop === shops[i])[0];
      if (buyable) break;
    }
    return buyable
      ? { ...item, source: buyable }
      : { ...item, source: 'elsewhere' };
  });
}

function addUnknowns(data) {
  return data.map(item => ({
    ...item,
    sources: item.sources.length
      ? item.sources
      : [{ shop: 'elsewhere', type: 'unknown' }],
  }));
}

export default function reduceShops(
  initialData,
  shopsHierarchy,
  { preferLocal },
) {
  const dataWithUnknowns = addUnknowns(initialData);
  const allShops = listAllShops(dataWithUnknowns);
  const allCombinations = findAllCombinations(dataWithUnknowns, allShops);
  const localSorted = localSort(allCombinations, shopsHierarchy);
  const leastChoices = pickFewest(allCombinations);
  const sortedChoices = sortChoices(leastChoices, shopsHierarchy);
  const finalList = makeListWithShops(
    preferLocal
      ? sortByHierarchy(localSorted[0], shopsHierarchy)
      : sortedChoices[0],
    dataWithUnknowns,
  );

  return finalList;
}
