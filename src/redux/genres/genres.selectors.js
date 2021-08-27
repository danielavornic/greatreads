import { createSelector } from 'reselect';

const selectGenres = state => state.genres;

export const selectGenresData = createSelector(
  [selectGenres],
  genres => genres.genresData
);