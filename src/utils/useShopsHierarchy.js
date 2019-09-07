import { useState } from 'react';

const useShopsHierarchy = initialHierarchy => {
  const [shopsHierarchy, setShopsHierarchy] = useState(initialHierarchy);
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

  const resetShops = () => setShopsHierarchy(initialHierarchy);

  return {
    shopsHierarchy,
    setShopsHierarchy,
    sendUp,
    sendDown,
    sendToTop,
    sendToBottom,
    resetShops,
  };
};

export default useShopsHierarchy;
