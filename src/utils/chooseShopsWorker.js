// TODO this will be run on a web worker thread once I've set it up to work with Webpack
import reduceShops from './reduceShops.js';
import pickBestSources from './pickBestSources.js';

const chooseShopsWorker = options => {
  const { list, data, hierarchy, fewerTrips } = options;
  const bestSources = pickBestSources(list, data, hierarchy);
  const result = reduceShops(bestSources, hierarchy, {
    preferLocal: !fewerTrips,
  });
  return result;
};

export default chooseShopsWorker;

// onmessage = function(e) {
//   const { list, data, hierarchy, fewerTrips } = e.data;
//   const bestSources = pickBestSources(list, data, hierarchy);

//   // Select just one of these shops per item
//   const result = reduceShops(bestSources, hierarchy, {
//     preferLocal: !fewerTrips,
//   });

//   postMessage(result);
// };
