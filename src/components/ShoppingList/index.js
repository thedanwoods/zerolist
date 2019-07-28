import React, { useState, useEffect } from 'react';

import ClickableList from '../ClickableList';
import InputItem from '../InputItem';
import YourItems from '../YourItems';
import Results from '../Results';
import Header from '../Header';

import './shoppingList.css';

const url = 'https://us-central1-zerolist.cloudfunctions.net/shopping';

const ShoppingList = () => {
  const [data, setData] = useState();
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setData(json);
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

  const addItem = item => setList([...list.filter(i => i !== item), item]);
  const removeItem = item => setList(list.filter(i => i !== item));
  const toggleItem = item => {
    setList([
      ...list.filter(i => i !== item),
      ...(list.filter(i => i === item).length ? [] : [item]),
    ]);
  };
  if (!data) return <p>Loading...</p>;
  const items = data ? data.sources.map(source => source.name) : [];
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <main className="shopping-list">
          <InputItem choices={items} addItem={addItem} />
          <YourItems list={list} removeItem={removeItem} />
          <ClickableList
            items={items}
            currentList={list}
            toggleItem={toggleItem}
          />
          <Results list={list} data={data} />
        </main>
      </div>
    </div>
  );
};
export default ShoppingList;
