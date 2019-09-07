import leastShopsSequence from './leastShopsSequence';
import mostLocalSequence from './mostLocalSequence';

function sortByHierarchy(data, shopsHierarchy) {
  const sortByShop = (a, b) =>
    shopsHierarchy.indexOf(a) - shopsHierarchy.indexOf(b);
  return [...data].sort(sortByShop);
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

function addUnknowns(data) {
  return data.map(item => ({
    ...item,
    sources: item.sources.length
      ? item.sources
      : [{ shop: 'elsewhere', type: 'unknown' }],
  }));
}

// Visit each shop in the trip, and add the items it sells to a list
function goShopping(trip, withShopsList) {
  let data = [...withShopsList];
  let list = [];
  trip.forEach(shop => {
    const canGetHere = data.filter(item => item.shops.includes(shop));
    const cannotGetHere = data.filter(item => !item.shops.includes(shop));
    list = [
      ...list,
      ...canGetHere.map(item => ({
        name: item.name,
        source: item.sources.filter(source => source.shop === shop)[0],
      })),
    ];
    data = cannotGetHere;
  });
  return list;
}

function pickTrip(shops, indices) {
  let result = [];
  indices.forEach(i => result.push(shops[i]));
  return result;
}

// Test a trip to see if you can get everything on the list
function canGetEverything(trip, data) {
  const notBuyable = data.filter(
    item => !item.shops.filter(shop => trip.includes(shop)).length,
  );
  return !notBuyable.length;
}

function reduceShops(initialData, shopsHierarchy, { preferLocal }) {
  if (!initialData.length) return [];
  const dataWithUnknowns = addUnknowns(initialData);
  const allShops = sortByHierarchy(
    listAllShops(dataWithUnknowns),
    shopsHierarchy,
  ); // All shops where we MIGHT want to go

  // If we don't prefer local, use the default optimised generator

  const withShopsList = dataWithUnknowns.map(item => ({
    ...item,
    shops: item.sources.map(source => source.shop),
  }));

  let idealTrip;
  let sequence = preferLocal
    ? mostLocalSequence(allShops.length)
    : leastShopsSequence(allShops.length);
  for (let indices of sequence) {
    const trip = pickTrip(allShops, indices);
    if (canGetEverything(trip, withShopsList)) {
      idealTrip = [...trip];
      break;
    }
  }

  const newList = goShopping(idealTrip, withShopsList);
  return newList;
}

export default reduceShops;
