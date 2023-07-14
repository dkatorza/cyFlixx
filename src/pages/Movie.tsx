import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ResultsEntity } from '../types/general';
import { useEffect, useState } from 'react';

interface MovieProps {
  movie: ResultsEntity;
}

const Movie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState<ResultsEntity | null>(null);

  useEffect(() => {
    const { movie }: MovieProps = location.state || getMovieData();
    movie ? setMovieData(movie) : navigate('/*');
  }, []);

  const getMovieData = () => {
    const moviesData = window.localStorage.getItem('cyMovies');

    if (moviesData !== null) {
      let movie = JSON.parse(moviesData).results.filter(
        (res: ResultsEntity) => res.id === movieId
      )[0];

      return {
        movie: movie,
      };
    } else {
      navigate('/*');
    }
  };

  return (
    <div className='movie-wrapper'>
      <h1> {movieData?.title} </h1>
      <span>{movieData?.description} </span>
      <div className='movie-image-main'>
        <img src={movieData?.image} alt={movieData?.image} />
      </div>

      <section className='movie-details-wrapper'>
        <p>
          {movieData?.genreList &&
            movieData?.genreList.map((genre, idx) => {
              return <span key={idx}>{genre.value} </span>;
            })}
        </p>
        <p>{movieData?.plot}</p>
        <p>
          <strong>Duration:</strong> {movieData?.runtimeStr}
        </p>
        <p>
          <span>
            <strong>Stars: </strong>
          </span>
          {movieData?.stars}
        </p>
        <p>
          <span>
            <strong>IMDb RATING:</strong> ⭐{movieData?.imDbRating}/10
          </span>
          <span>
            <strong>RATED:</strong> {movieData?.contentRating}
          </span>
          <span>
            <strong>IMDb VOTES:</strong>
            {Number(movieData?.imDbRatingVotes).toLocaleString()}
          </span>
        </p>
      </section>
    </div>
  );
};

export default Movie;
