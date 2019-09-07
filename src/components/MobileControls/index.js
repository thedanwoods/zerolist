import React from 'react';

import './mobile-controls.css';

const MobileControls = ({ selected, setSelected }) => {
  return (
    <div className="mobile-controls">
      <div className="mobile-controls__buttons">
        <button
          type="button"
          onClick={() => {
            setSelected(0);
          }}
          className={`mobile-controls__button${
            selected === 0 ? ' mobile-controls__button--active' : ''
          }`}
        >
          List
        </button>
        <button
          type="button"
          className={`mobile-controls__button${
            selected === 1 ? ' mobile-controls__button--active' : ''
          }`}
          onClick={() => {
            setSelected(1);
          }}
        >
          Options
        </button>
        <button
          type="button"
          className={`mobile-controls__button${
            selected === 2 ? ' mobile-controls__button--active' : ''
          }`}
          onClick={() => {
            setSelected(2);
          }}
        >
          Results
        </button>
      </div>
    </div>
  );
};

export default MobileControls;
