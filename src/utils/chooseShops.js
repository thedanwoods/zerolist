// const worker = new Worker('chooseShopsWorker.js');
// TODO set up webpack to work with workers
import chooseShopsWorker from './chooseShopsWorker';

const chooseShops = options => {
  return new Promise(async resolve => {
    const result = await chooseShopsWorker(options);
    resolve(result);
  });
};

export default chooseShops;
