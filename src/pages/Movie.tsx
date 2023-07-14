import { useLocation } from 'react-router-dom';
import { ResultsEntity } from '../types/general';

interface MovieProps {
  movie: ResultsEntity;
}

const Movie = () => {
  const location = useLocation();
  const { movie }: MovieProps = location.state;
  return (
    <div className='movie-wrapper'>
      <h1> {movie.title} </h1>
      <span>{movie.description} </span>
      <div className='movie-image-main'>
        <img src={movie.image} alt={movie.image} />{' '}
      </div>

      <section className='movie-details-wrapper'>
        <p>
          {movie.genreList &&
            movie.genreList.map((genre, idx) => {
              return <span key={idx}>{genre.value} </span>;
            })}
        </p>
        <p>{movie.plot}</p>
        <p>
          <strong>Duration:</strong> {movie.runtimeStr}{' '}
        </p>
        <p>
          <span>
            <strong>Stars: </strong>
          </span>
          {movie.stars}
        </p>
        <p>
          <span>
            <strong>IMDb RATING:</strong> ⭐{movie.imDbRating}/10{' '}
          </span>
          <span>
            <strong>RATED:</strong> {movie.contentRating}{' '}
          </span>
          <span>
            <strong>IMDb VOTES:</strong>{' '}
            {Number(movie.imDbRatingVotes).toLocaleString()}{' '}
          </span>
        </p>
      </section>
    </div>
  );
};

export default Movie;
