import GenresActionTypes from './genres.types';

export const fetchGenreStart = genreName => ({
  type: GenresActionTypes.FETCH_GENRE_START,
  payload: genreName
});

export const fetchGenreSuccess = genre => ({
  type: GenresActionTypes.FETCH_GENRE_SUCCESS,
  payload: genre
});

export const fetchGenreFailure = error => ({
  type: GenresActionTypes.FETCH_GENRE_FAILURE,
  payload: error
});