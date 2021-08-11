import { createSelector } from 'reselect';

const selectLibrary = state => state.library;

export const selectSearchQuery = createSelector(
  [selectLibrary],
  library => library.searchQuery
);

export const selectSearchResults = createSelector(
  [selectLibrary],
  library => library.searchResults
);