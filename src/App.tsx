import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <header>This is Header</header>
      <main>
        <Routes>
          <Route element={<Home />} path='/home' />
        </Routes>
      </main>
      <footer>This is footer</footer>
    </div>
  );
}

export default App;
