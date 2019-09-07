// Determine ALL the best places to buy things, based on the lowest impact packaging

const packagingHierarchy = [
  'returnable',
  'unpackaged',
  'reusable',
  'paper',
  'card',
  'glass',
  'metal',
  'wax',
  'other',
  'plastic',
];

const sortByEco = (a, b) =>
  packagingHierarchy.indexOf(a.type) - packagingHierarchy.indexOf(b.type);

const pickBestSources = (list, data, shopsHierarchy) =>
  list.map(item => {
    const sortByShop = (a, b) =>
      shopsHierarchy.indexOf(a.shop) - shopsHierarchy.indexOf(b.shop);

    const itemData = data.sources.filter(s => s.name === item)[0];
    const itemSource = itemData ? itemData.sources.sort(sortByEco) : [];
    const best = itemSource
      .filter((el, index) => {
        if (index === 0) return true;
        return el.type === itemSource[0].type;
      })
      .sort(sortByShop);

    return { name: item, sources: best };
  });

export default pickBestSources;
