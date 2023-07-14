import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResultsEntity } from '../types/general';

interface MovieCardProps {
  movie: ResultsEntity;
  gridScroll?: boolean;
  style?: {};
}

const MovieCard = ({ movie, style, gridScroll }: MovieCardProps) => {
  // console.log('momomom', movie);

  const [cardWidth, setCardWidth] = useState('400px');

  useEffect(() => {
    if (!movie) return;
  }, []);

  useEffect(() => {
    if (window) {
      updateCardSize(window.innerWidth);
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      updateCardSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    updateCardSize(window.innerWidth);
  }, [gridScroll]);

  const updateCardSize = (windowSize: number) => {
    if (windowSize <= 576) {
      setCardWidth(`95%`);
    }

    if (windowSize > 475) {
      setCardWidth(`70%`);
    }

    if (windowSize > 576) {
      setCardWidth(`40%`);
    }

    if (windowSize > 680) {
      setCardWidth(`33%`);
    }

    if (windowSize > 830) {
      setCardWidth(`20%`);
    }

    if (windowSize > 1600) {
      setCardWidth(`18%`);
    }
  };

  return (
    <Link to={`/movie/${movie?.id}`} state={{ movie }}>
      <div
        className='card-wrapper'
        style={{
          ...style,
          width: cardWidth,
          height: 'fit-content',
        }}>
        <section className='movie-image-wrapper'>
          <img src={movie?.image} alt='' />
        </section>
        <section className='movie-short-details-wrapper'>
          <p>{movie?.title}</p>
          <p>{movie?.description}</p>

          <div role='button' className='btn'>
            More details
          </div>
        </section>
      </div>
    </Link>
  );
};

export default MovieCard;
