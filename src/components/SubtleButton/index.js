import React from 'react';

import './subtle-button.css';

const SubtleButton = ({ onClick, children }) => (
  <button className="subtle-button" onClick={onClick}>
    {children}
  </button>
);

export default SubtleButton;
