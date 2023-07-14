import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Header from './components/Header';
import Movie from './pages/Movie';
import Page404 from './pages/Page404';

function App() {
  return (
    <div className='app-layout'>
      <Header />
      <main>
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<Movie />} path='/movie/:movieId' />
          <Route element={<Page404 />} path='/*' />
        </Routes>
      </main>
      <footer>cofferights ©️ Dan Katorza & cyFlix 2023</footer>
    </div>
  );
}

export default App;
