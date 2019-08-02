import React from 'react';
import {
  FiChevronsUp,
  FiChevronsDown,
  FiChevronUp,
  FiChevronDown,
} from 'react-icons/fi';

import './shop-card.css';

const ShopCard = ({
  shopDetails,
  items,
  sendToTop,
  sendUp,
  sendDown,
  sendToBottom,
}) => (
  <div className="shop-card">
    <h2 className="shop-card__shop-name">
      <div>{shopDetails.name}</div>{' '}
      <div>
        <button
          onClick={() => sendToTop(shopDetails.id)}
          className="shop-card__icon-button"
        >
          <FiChevronsUp />
        </button>
        <button
          onClick={() => sendUp(shopDetails.id)}
          className="shop-card__icon-button"
        >
          <FiChevronUp />
        </button>
        <button
          onClick={() => sendDown(shopDetails.id)}
          className="shop-card__icon-button"
        >
          <FiChevronDown />
        </button>
        <button
          onClick={() => sendToBottom(shopDetails.id)}
          className="shop-card__icon-button"
        >
          <FiChevronsDown />
        </button>
      </div>
    </h2>
    <p className="shop-card__info">{shopDetails.openingHours}</p>
    <p className="shop-card__info">
      <a
        href={`https://www.openstreetmap.org/search?query=${
          shopDetails.location
        }`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {shopDetails.location}
      </a>
    </p>

    <ul className="shop-card__list">
      {items.map(item => (
        <li className="shop-card__item" key={item.name}>
          {item.name}{' '}
          <span className="shop-card__packaging">{item.source.type}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ShopCard;
