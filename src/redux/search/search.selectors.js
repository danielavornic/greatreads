import { createSelector } from 'reselect';

const selectSearch = state => state.search;

export const selectSearchQuery = createSelector(
  [selectSearch],
  search => search.searchQuery
);

export const selectSearchResults = createSelector(
  [selectSearch],
  search => search.searchResults
);

export const selectAreSearchResultsFetching = createSelector(
  [selectSearch],
  search => search.areSearchResultsFetching
);