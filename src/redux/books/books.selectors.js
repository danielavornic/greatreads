import { createSelector } from 'reselect';

const selectBooks = state => state.books;

export const selectBook = createSelector(
  [selectBooks],
  books => books.bookData
);

export const selectIsBookFetching = createSelector(
  [selectBooks],
  books => books.isBookFetching
);

export const selectBookKey = createSelector(
  [selectBooks],
  books => books.bookKey
);

export const selectBookStatus = createSelector(
  [selectBooks],
  books => books.bookStatus
);