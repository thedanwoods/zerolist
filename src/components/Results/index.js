import React, { useState, useEffect } from 'react';

import SubtleButton from '../SubtleButton';

import chooseShops from '../../utils/chooseShops.js';

import ShopCard from '../ShopCard';

import './results.css';

// For each item, determine the best place or places to get it.
// An item can be bought in several places.
// There is a hierarchy of plastic, unpackaged, paper etc. Sort by it.
// Pick the first of the array and any which are the same as it.

const Results = ({
  list,
  data,
  onOptionsClick,
  shopsHierarchy,
  sendUp,
  sendDown,
  sendToTop,
  sendToBottom,
  showControls,
}) => {
  const [fewerTrips, setFewerTrips] = useState(true);
  const [chosenSources, setChosenSources] = useState([]);

  useEffect(() => {
    const hierarchy = [...shopsHierarchy, 'elsewhere'];

    async function updateShops() {
      const sources = await chooseShops({ list, data, hierarchy, fewerTrips });
      setChosenSources(sources);
    }

    updateShops();
  }, [list, data, shopsHierarchy, fewerTrips]);

  // Collate a list, by shop
  const shoppingListByShop = chosenSources.reduce((acc, cur) => {
    if (cur.source) {
      return {
        ...acc,
        [cur.source.shop]: acc[cur.source.shop]
          ? [...acc[cur.source.shop], cur]
          : [cur],
      };
    }
    return acc;
  }, {});

  return (
    <div className="results">
      <div className="results__title">
        <h2 className="results__header">Where to buy</h2>
        {showControls && <SubtleButton onClick={onOptionsClick}>Options</SubtleButton>}
      </div>
      <div className="results__options">
        <input
          type="checkbox"
          id="results-option"
          name="results-option"
          checked={fewerTrips}
          onChange={e => setFewerTrips(e.target.checked)}
        />
        <label htmlFor="results-option" className="results__option-label">
          Prefer fewer trips
        </label>
      </div>
      {!list.length && (
        <p className="results__empty-info">
          Add some items to your shopping list and find out where to buy them
        </p>
      )}
      {Object.keys(shoppingListByShop)
        // .sort(sortByShopName)
        .map(shop => {
          const shopDetails = data.shop.filter(s => s.id === shop)[0] || {
            name: 'No sources found',
          };
          return (
            <ShopCard
              key={shopDetails.name}
              shopDetails={shopDetails}
              items={shoppingListByShop[shop]}
              sendToTop={sendToTop}
              sendUp={sendUp}
              sendDown={sendDown}
              sendToBottom={sendToBottom}
            />
          );
        })}
    </div>
  );
};

export default Results;
