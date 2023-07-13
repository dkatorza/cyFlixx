export interface MoviesData {
  results?: ResultsEntity[] | null;
}
export interface ResultsEntity {
  id: string;
  image: string;
  title: string;
  description: string;
  runtimeStr: string;
  genres: string;
  genreList?: GenreListEntity[] | null;
  contentRating: string;
  imDbRating: string;
  imDbRatingVotes: string;
  metacriticRating?: string | null;
  plot: string;
  stars: string;
  starList?: StarListEntity[] | null;
}
export interface GenreListEntity {
  key: string;
  value: string;
}
export interface StarListEntity {
  id: string;
  name: string;
}
