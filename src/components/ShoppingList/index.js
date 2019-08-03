import React, { useState, useEffect } from 'react';

import ClickableList from '../ClickableList';
import InputItem from '../InputItem';
import YourItems from '../YourItems';
import Results from '../Results';
import Header from '../Header';
import ResultsOptions from '../ResultsOptions';

import './shoppingList.css';

const url = 'https://us-central1-zerolist.cloudfunctions.net/shopping';
const initialShopsHierarchy = [
  'milkandmore',
  'beetroot',
  'proudsow',
  'byo',
  'budgens',
  'brockleymarket',
  'sainsburys',
  'gather',
  'villagegrocer',
  'jones',
  'planet',
  'asnature',
  'grocery',
  'swop',
];

const ShoppingList = () => {
  const [data, setData] = useState();
  const [list, setList] = useState([]);
  const [errors, setErrors] = useState([]);
  const [shopsHierarchy, setShopsHierarchy] = useState(initialShopsHierarchy);

  const [optionsOpen, setOptionsOpen] = useState(false);
  useEffect(() => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setData(json);
      })
      .catch(e => {
        setErrors(prevState => [
          ...prevState,
          'Sorry, there was an error connecting to the server. Please check your connection and try again.',
        ]);
      });
    // TODO handle error
  }, []);

  useEffect(() => {
    try {
      const listFromStorage = localStorage.getItem('list');
      if (listFromStorage && listFromStorage !== 'null') {
        setList(JSON.parse(listFromStorage));
      }
    } catch (e) {
      // ignore if localStorage fails
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('list', JSON.stringify(list));
    } catch (e) {
      // ignore if localStorage fails
    }
  }, [list]);

  useEffect(function getHierarchyFromStorage() {
    try {
      const hierarchyFromStorage = localStorage.getItem('shopsHierarchy');
      if (hierarchyFromStorage) {
        setShopsHierarchy(JSON.parse(hierarchyFromStorage));
      }
    } catch (e) {
      // ignore if localStorage fails
    }
  }, []);

  useEffect(
    function updateStorageWithHierarchy() {
      try {
        localStorage.setItem('shopsHierarchy', JSON.stringify(shopsHierarchy));
      } catch (e) {
        // ignore if localStorage fails
      }
    },
    [shopsHierarchy],
  );

  const resetShops = () => setShopsHierarchy(initialShopsHierarchy);

  const sendToTop = id =>
    setShopsHierarchy([id, ...shopsHierarchy.filter(shopId => shopId !== id)]);

  const sendUp = id => {
    const idIndex = shopsHierarchy.indexOf(id);
    if (idIndex < 1) {
      return;
    }
    if (shopsHierarchy.length === idIndex + 1) {
      setShopsHierarchy([
        ...shopsHierarchy.slice(0, idIndex - 1),
        id,
        shopsHierarchy[idIndex - 1],
      ]);
    } else {
      setShopsHierarchy([
        ...shopsHierarchy.slice(0, idIndex - 1),
        id,
        shopsHierarchy[idIndex - 1],
        ...shopsHierarchy.slice(idIndex + 1),
      ]);
    }
  };
  const sendDown = id => {
    const idIndex = shopsHierarchy.indexOf(id);
    if (idIndex + 1 === shopsHierarchy.length) {
      return;
    }
    if (idIndex === 0) {
      setShopsHierarchy([
        shopsHierarchy[idIndex + 1],
        id,
        ...shopsHierarchy.slice(idIndex + 2),
      ]);
    } else {
      setShopsHierarchy([
        ...shopsHierarchy.slice(0, idIndex),
        shopsHierarchy[idIndex + 1],
        id,
        ...shopsHierarchy.slice(idIndex + 2),
      ]);
    }
  };

  const sendToBottom = id =>
    setShopsHierarchy([...shopsHierarchy.filter(shopId => shopId !== id), id]);

  const addItem = item => setList([...list.filter(i => i !== item), item]);
  const removeItem = item => setList(list.filter(i => i !== item));
  const clearList = () => setList([]);
  const toggleItem = item => {
    setList([
      ...list.filter(i => i !== item),
      ...(list.filter(i => i === item).length ? [] : [item]),
    ]);
  };
  if (errors.length)
    return (
      <ul>
        {errors.map(error => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    );
  if (!data && !errors.length) return <p>Loading...</p>;
  const items = data ? data.sources.map(source => source.name) : [];
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <main className="shopping-list">
          <InputItem choices={items} addItem={addItem} />
          <YourItems
            list={list}
            removeItem={removeItem}
            clearList={clearList}
          />
          <ClickableList
            items={items}
            currentList={list}
            toggleItem={toggleItem}
          />
          {optionsOpen ? (
            <ResultsOptions
              shopsHierarchy={shopsHierarchy}
              onClose={() => setOptionsOpen(false)}
              sendUp={sendUp}
              sendDown={sendDown}
              sendToTop={sendToTop}
              sendToBottom={sendToBottom}
              resetShops={resetShops}
              data={data}
            />
          ) : (
            <Results
              list={list}
              data={data}
              shopsHierarchy={shopsHierarchy}
              onOptionsClick={() => setOptionsOpen(true)}
              sendUp={sendUp}
              sendDown={sendDown}
              sendToTop={sendToTop}
              sendToBottom={sendToBottom}
            />
          )}
        </main>
      </div>
    </div>
  );
};
export default ShoppingList;
