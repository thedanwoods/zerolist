import React, { useState, useEffect } from 'react';

import useShopsHierarchy from '../../utils/useShopsHierarchy';
import useWindowWidth from '../../utils/useWindowWidth';

import ClickableList from '../ClickableList';
import InputItem from '../InputItem';
import YourItems from '../YourItems';
import Results from '../Results';
import Header from '../Header';
import ResultsOptions from '../ResultsOptions';
import MobileControls from '../MobileControls';

import './shoppingList.css';

const shopsDataUrl = 'https://us-central1-zerolist.cloudfunctions.net/shopping';

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
  const [selected, setSelected] = useState(0);
  const {
    shopsHierarchy,
    setShopsHierarchy,
    sendUp,
    sendDown,
    sendToTop,
    sendToBottom,
    resetShops,
  } = useShopsHierarchy(initialShopsHierarchy);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    // Fetch (all) the data
    fetch(shopsDataUrl)
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
  }, []);

  useEffect(() => {
    // Try to get the user's previous list from localstorage
    try {
      const listFromStorage = localStorage.getItem('list');
      if (listFromStorage && listFromStorage !== 'null') {
        setList(JSON.parse(listFromStorage));
      }
    } catch (e) {
      // ignore errors
    }
  }, []);

  useEffect(() => {
    // Each time the list changes, try to put it in localStorage
    try {
      localStorage.setItem('list', JSON.stringify(list));
    } catch (e) {
      // ignore errors
    }
  }, [list]);

  useEffect(
    // Initially, get the shops hierarchy from localstorage
    function getHierarchyFromStorage() {
      try {
        const hierarchyFromStorage = localStorage.getItem('shopsHierarchy');
        if (hierarchyFromStorage) {
          setShopsHierarchy(JSON.parse(hierarchyFromStorage));
        }
      } catch (e) {
        // ignore if localStorage fails
      }
    },
    [setShopsHierarchy],
  );

  useEffect(
    // Every time shopsHierarchy changes, we want to update it in localstorage
    function updateStorageWithHierarchy() {
      try {
        localStorage.setItem('shopsHierarchy', JSON.stringify(shopsHierarchy));
      } catch (e) {
        // ignore if localStorage fails
      }
    },
    [shopsHierarchy],
  );

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

  if (windowWidth < 480) {
    // Mobile UI
    return (
      <div className="wrapper">
        <div className="content">
          <Header />
          <main className="shopping-list">
            {selected === 0 && (
              <>
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
              </>
            )}
            {selected === 1 && (
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
            )}
            {selected === 2 && (
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
          <MobileControls selected={selected} setSelected={setSelected} />
        </div>
      </div>
    );
  }

  // Desktop UI
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
          {optionsOpen && (
            <ResultsOptions
              shopsHierarchy={shopsHierarchy}
              onClose={() => setOptionsOpen(false)}
              sendUp={sendUp}
              sendDown={sendDown}
              sendToTop={sendToTop}
              sendToBottom={sendToBottom}
              resetShops={resetShops}
              data={data}
              showControls
            />
          )}
          {!optionsOpen && (
            <Results
              list={list}
              data={data}
              shopsHierarchy={shopsHierarchy}
              onOptionsClick={() => setOptionsOpen(true)}
              sendUp={sendUp}
              sendDown={sendDown}
              sendToTop={sendToTop}
              sendToBottom={sendToBottom}
              showControls
            />
          )}
        </main>
      </div>
    </div>
  );
};
export default ShoppingList;
