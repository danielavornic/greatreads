import { createSelector } from 'reselect';

const selectGenres = state => state.genres;

export const selectGenresData = createSelector(
  [selectGenres],
  genres => genres.genresData
);

export const selectGenre = createSelector(
  [selectGenres],
  genres => genres.genreData
);

export const selectIsGenreFetching = createSelector(
  [selectGenres],
  genres => genres.isGenreFetching
)