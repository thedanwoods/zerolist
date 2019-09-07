import React from 'react';
import {
  FiChevronsUp,
  FiChevronsDown,
  FiChevronUp,
  FiChevronDown,
} from 'react-icons/fi';

import './shop-option.css';

const ShopOption = ({
  shopDetails,
  index,
  sendToTop,
  sendUp,
  sendDown,
  sendToBottom,
}) => (
  <li className="shop-option">
    <h2 className="shop-option__shop-name">
      <div>{`${index}. ${shopDetails.name}`}</div>{' '}
      <div className="shop-option__controls">
        <button
          onClick={() => sendToTop(shopDetails.id)}
          className="shop-option__icon-button"
        >
          <FiChevronsUp />
        </button>
        <button
          onClick={() => sendUp(shopDetails.id)}
          className="shop-option__icon-button"
        >
          <FiChevronUp />
        </button>
        <button
          onClick={() => sendDown(shopDetails.id)}
          className="shop-option__icon-button"
        >
          <FiChevronDown />
        </button>
        <button
          onClick={() => sendToBottom(shopDetails.id)}
          className="shop-option__icon-button"
        >
          <FiChevronsDown />
        </button>
      </div>
    </h2>
  </li>
);

export default ShopOption;
