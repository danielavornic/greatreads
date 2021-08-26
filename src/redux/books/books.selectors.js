import { createSelector } from 'reselect';

const selectBooks = state => state.books;

export const selectSearchQuery = createSelector(
  [selectBooks],
  books => books.searchQuery
);

export const selectSearchResults = createSelector(
  [selectBooks],
  books => books.searchResults
);

export const selectAreSearchResultsFetching = createSelector(
  [selectBooks],
  books => books.areSearchResultsFetching
);

export const selectBook = createSelector(
  [selectBooks],
  books => books.book
);

export const selectIsBookFetching = createSelector(
  [selectBooks],
  books => books.isBookFetching
)