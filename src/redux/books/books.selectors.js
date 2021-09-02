import { createSelector } from 'reselect';

const selectBooks = state => state.books;

export const selectBook = createSelector(
  [selectBooks],
  books => books.book
);

export const selectIsBookFetching = createSelector(
  [selectBooks],
  books => books.isBookFetching
);