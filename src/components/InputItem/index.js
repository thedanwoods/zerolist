import React, { useEffect, useState, useRef } from 'react';

import './input-item.css';

const Item = ({ title, selected, typing, onFocus, onClick }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (selected && !typing) {
      ref.current.focus();
    }
  }, [selected, typing]);
  return (
    <button
      ref={ref}
      onFocus={onFocus}
      onClick={onClick}
      className={`input-item__choice ${
        selected ? 'input-item__choice--selected' : ''
      }`}
    >
      {title}
    </button>
  );
};

// If we press enter and there is only one suggestion, add it
// If we press down, highlight items AND change input to it
const InputItem = ({ choices, addItem }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const [userSelection, setUserSelection] = useState();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const matchingChoices = choices.filter(choice =>
    choice.toLowerCase().includes(value.toLowerCase()),
  );

  const filteredChoices = [
    ...matchingChoices.filter(choice =>
      choice.toLowerCase().startsWith(value.toLowerCase()),
    ),
    ...matchingChoices.filter(choice =>
      !choice.toLowerCase().startsWith(value.toLowerCase()),
    ),
  ];

  if (userSelection && !filteredChoices.includes(userSelection)) {
    setUserSelection(undefined);
  }
  const currentSelection = userSelection || filteredChoices[0];

  const handleKeyDown = e => {
    let newPos;
    if (e.keyCode === 38) {
      e.preventDefault();
      const pos = filteredChoices.findIndex(el => el === userSelection);
      if (pos === -1) {
        newPos = filteredChoices[filteredChoices.length - 1];
      } else {
        newPos =
          filteredChoices[pos - 1] ||
          filteredChoices[filteredChoices.length - 1];
      }
      setUserSelection(newPos);
    } else if (e.keyCode === 40) {
      e.preventDefault();
      const pos = filteredChoices.findIndex(el => el === userSelection);
      if (pos === -1) {
        newPos = filteredChoices[1];
      } else {
        newPos = filteredChoices[pos + 1] || filteredChoices[0];
      }
      setUserSelection(newPos);
    }
    // TODO escape key should go back to input or clear input
  };

  const handleAdd = e => {
    e.preventDefault();
    if (currentSelection && value && filteredChoices.length) {
      addItem(currentSelection);
      setValue('');
    }
  };

  const handleClick = item => {
    addItem(item);
    setValue('');
    setUserSelection(undefined);
    inputRef.current.focus();
  };

  const handleFocus = choice => {
    if (choice !== currentSelection) {
      setUserSelection(choice);
    }
  };

  return (
    <div className="input-item" onKeyDown={handleKeyDown}>
      <form onSubmit={handleAdd}>
        <label className="input-item__label" htmlFor="add-item">
          Add an item
        </label>
        <input
          className="input-item__input"
          id="add-item"
          value={value}
          onChange={e => setValue(e.target.value)}
          ref={inputRef}
          placeholder="e.g. Pasta"
          autoComplete="off"
        />
      </form>
      {value.length > 0 && filteredChoices.length > 0 && (
        <div className="input-item__choices">
          {filteredChoices.map(choice => (
            <Item
              onFocus={() => handleFocus(choice)}
              onClick={() => handleClick(choice)}
              key={choice}
              title={choice}
              selected={choice === currentSelection}
              typing={!userSelection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InputItem;
