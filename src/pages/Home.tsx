import { useEffect, useState, useRef, useMemo, CSSProperties } from 'react';
import useFetch from '../hooks/useFetch';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useSnapshot } from 'valtio';
import queryState from '../stores/queryState';
import { MoviesData, ResultsEntity } from '../types/general';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';

interface CellProps extends GridChildComponentProps {
  data: {
    columnCount: number;
    filteredItems: ResultsEntity[];
  };
}

const Cell = ({ columnIndex, rowIndex, style, data }: CellProps) => {
  if (typeof style.height !== 'number' || typeof style.width !== 'number') {
    return null;
  }
  const adjustedStyle: CSSProperties = {
    ...style,
    height: style.height - 200,
    width: style.width - 10,
  };
  const index = rowIndex * data.columnCount + columnIndex;
  const item = data.filteredItems[index];

  if (!item) return null;

  return <MovieCard movie={item} style={adjustedStyle} />;
};

export const Home = () => {
  const [moviesList, setMoviesList] = useState<MoviesData | null>(null);
  const imdbKey = import.meta.env.VITE_IMDB_KEY;
  const { data, isLoading, error } = useFetch<MoviesData>(
    `https://cyan-gorgeous-cygnet.cyclic.app/api/all-movies?key=${imdbKey}&count=250`,
    'cyMovies'
  );

  const { criteria, query } = useSnapshot(queryState);

  const filteredItems = useMemo(() => {
    return moviesList?.results?.filter((movie) => {
      switch (criteria) {
        case 'title':
        case 'genres':
          return movie[criteria].toLowerCase().includes(query.toLowerCase());
        case 'year':
          return movie['description']
            .toLowerCase()
            .includes(query.toLowerCase());
        case 'length':
          return movie['runtimeStr']
            .toLowerCase()
            .includes(query.toLowerCase());
        case 'rating':
          return movie['imDbRating']
            .toLowerCase()
            .includes(query.toLowerCase());
        case 'actors':
          return movie['stars'].toLowerCase().includes(query.toLowerCase());
        default:
          return movie['title'].toLowerCase().includes(query.toLowerCase());
      }
    });

    //
  }, [moviesList, query, criteria]);

  const gridRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [columnWidth, setColumnWidth] = useState(window.innerWidth);
  const [columnCount, setColumnCount] = useState(5);
  const [gridScroll, setGridScroll] = useState(false);

  useEffect(() => {
    setMoviesList(data);
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      updateColumnSettings(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const gridElement = gridRef.current;

    if (!gridElement) return;

    const handleGridScroll = () => {
      setGridScroll(true);
    };

    gridElement.addEventListener('scroll', handleGridScroll);

    return () => {
      gridElement.removeEventListener('scroll', handleGridScroll);
    };
  }, []);

  useEffect(() => {
    updateColumnSettings(window.innerWidth);
  }, []);

  const updateColumnSettings = (windowSize: number) => {
    if (windowSize <= 576) {
      setColumnWidth(windowSize);
      setColumnCount(1);
    }

    if (windowSize > 576) {
      setColumnWidth(windowSize * 0.4);
      setColumnCount(5);
    }
    if (windowSize >= 1090) {
      setColumnWidth(windowSize * 0.23);
    }

    if (windowSize >= 1400) {
      setColumnWidth(windowSize * 0.22);
    }

    if (windowSize >= 1400) {
      setWindowWidth(1400);
    }

    if (windowSize >= 1600) {
      setColumnWidth(windowSize * 0.18);
    }
  };

  return (
    <div className='home-wrapper'>
      <h1>'What to watch'</h1>
      {isLoading && <Loader msg={'Loading...'} />}
      {error && <Loader msg={'Error...'} />}
      {!isLoading && !error && (
        <div ref={gridRef} style={{ width: '100%', height: '100vh' }}>
          {!filteredItems?.length && 'Sorry, your search is empty :('}
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                columnCount={Math.floor(windowWidth / columnWidth)}
                columnWidth={columnWidth}
                height={height}
                rowCount={Math.ceil(
                  filteredItems!! && filteredItems.length / columnCount
                )}
                rowHeight={700}
                width={windowWidth}
                overscanRowCount={4}
                itemData={{
                  filteredItems: filteredItems || [],
                  columnCount,
                }}>
                {Cell}
              </Grid>
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};
