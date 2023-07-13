import { Link } from 'react-router-dom';
import { ResultsEntity } from '../types/general';

interface MovieCardProps {
  movie: ResultsEntity;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.id}`} state={{ movie }}>
      <div className='card-wrapper'>
        <section className='movie-image-wrapper'>
          <img src={movie.image} alt='' />
        </section>
        <section className='movie-short-details-wrapper'>
          <p>{movie.title}</p>
          <p>{movie.description}</p>

          <div role='button' className='btn'>
            More details
          </div>
        </section>
      </div>
    </Link>
  );
};

export default MovieCard;
