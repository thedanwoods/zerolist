import React from 'react';

import './your-items.css';

const SingleItem = ({ item, remove }) => (
  <li className="single-item">
    <p>{item}</p>
    <div className="single-item__button-container">
      <button className="single-item__button" type="button" onClick={remove}>
        <div className="single-item__cross">&times;</div> 
      </button>
    </div>
  </li>
);

const YourItems = ({ list, removeItem }) =>
  list.length > 0 && (
    <div className="your-items">
      <h2 className="your-items__header">Your list</h2>
      <ul className="your-items__list">
        {list.map(item => (
          <SingleItem key={item} item={item} remove={() => removeItem(item)} />
        ))}
      </ul>
    </div>
  );

export default YourItems;
