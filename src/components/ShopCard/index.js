import React from 'react';

import './shop-card.css';

const ShopCard = ({ shopDetails, items }) => (
  <div className="shop-card">
    <h2 className="shop-card__shop-name">{shopDetails.name}</h2>
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
          {item.name} <span className="shop-card__packaging">{item.source.type}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ShopCard;
