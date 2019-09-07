import React from 'react';

import SubtleButton from '../SubtleButton';
import ShopOption from '../ShopOption';

import './results-options.css';

const ResultsOptions = ({
  onClose,
  shopsHierarchy,
  sendToTop,
  sendToBottom,
  sendUp,
  sendDown,
  resetShops,
  data,
  showControls,
}) => (
  <div className="results-options">
    <div className="results-options__title">
      <h2 className="results-options__header">Shopping preferences</h2>
      {showControls && <SubtleButton onClick={onClose}>X</SubtleButton>}
    </div>
    <ol>
      {shopsHierarchy.map((shop, index) => {
        const shopDetails = data.shop.filter(s => s.id === shop)[0];
        return (
          <ShopOption
            index={index + 1}
            key={shopDetails.name}
            shopDetails={shopDetails}
            sendToTop={sendToTop}
            sendUp={sendUp}
            sendDown={sendDown}
            sendToBottom={sendToBottom}
          />
        );
      })}
    </ol>
    <SubtleButton onClick={resetShops}>Reset to defaults</SubtleButton>
  </div>
);

export default ResultsOptions;
