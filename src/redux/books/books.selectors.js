import { createSelector } from 'reselect';

const selectBooks = (state) => state.books;

export const selectBook = createSelector(
  [selectBooks],
  (books) => books.bookData
);

export const selectBookKey = createSelector(
  [selectBooks],
  (books) => books.bookKey
);

export const selectIsBookFetching = createSelector(
  [selectBooks],
  (books) => books.isBookFetching
);

export const selectBookStatus = createSelector(
  [selectBooks],
  (books) => books.bookStatus
);

export const selectBookStatusError = createSelector(
  [selectBooks],
  (books) => books.bookStatusError
);

export const selectIsBookStatusLoading = createSelector(
  [selectBooks],
  (books) => books.isBookStatusLoading
);

export const selectBookRating = createSelector(
  [selectBooks],
  (books) => books.bookRating
);

export const selectBookRatingError = createSelector(
  [selectBooks],
  (books) => books.bookRatingError
);

export const selectIsBookLiked = createSelector(
  [selectBooks],
  (books) => books.isBookLiked
);

export const selectBookLikeError = createSelector(
  [selectBooks],
  (books) => books.bookLikeError
);

export const selectUserBooks = createSelector(
  [selectBooks],
  (books) => books.userBooks
);

export const selectAreUserBooksFetching = createSelector(
  [selectBooks],
  (books) => books.areUserBooksFetching
);
