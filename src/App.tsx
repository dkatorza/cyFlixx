import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Header from './components/Header';
import Movie from './pages/Movie';

function App() {
  return (
    <div className='app-layout'>
      <Header />
      <main>
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<Home />} path='/home' />
          <Route element={<Movie />} path='/movie/:movieId' />
        </Routes>
      </main>
    </div>
  );
}

export default App;
