import React from 'react';

import ShoppingList from './components/ShoppingList';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <div className="App">
      <main>
        <ShoppingList />
      </main>
      <CookieBanner />
    </div>
  );
}

export default App;
