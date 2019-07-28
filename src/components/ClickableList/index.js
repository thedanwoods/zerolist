import React from 'react';

import './clickable-list.css';

const ClickableItem = ({ title, listed, toggleItem }) => (
  <li className="clickable-item">
    <div className="clickable-item__name">{title}</div>
    <button className="clickable-item__button" type="button" onClick={toggleItem}>
      {listed ? 'Remove' : 'Add'}
    </button>
  </li>
);

const ClickableList = ({ items, currentList, toggleItem }) => (
  <div className="clickable-list">
    <h2 className="clickable-list__header">Checklist</h2>
    <ul className="clickable-list__list">
      {items.map(item => (
        <ClickableItem
          key={item}
          title={item}
          listed={currentList.includes(item)}
          toggleItem={() => toggleItem(item)}
        />
      ))}
    </ul>
  </div>
);

export default ClickableList;
