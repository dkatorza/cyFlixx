import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { MoviesData } from '../types/general';

const Home = () => {
  const [moviesList, setMoviesList] = useState<MoviesData | null>(null);
  const { data, isLoading, error } = useFetch<MoviesData>(
    'https://cyan-gorgeous-cygnet.cyclic.app/api/all-movies?key=jedimindtrick&count=250'
  );

  useEffect(() => {
    setMoviesList(data);
  }, [data]);

  return (
    <div className='home-wrapper'>
      {!isLoading && !error && <div>{JSON.stringify(moviesList)}</div>}
    </div>
  );
};

export default Home;
