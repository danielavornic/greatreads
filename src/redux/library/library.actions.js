import LibraryActionTypes from './library.types';

export const searchStart = searchQuery => ({
  type: LibraryActionTypes.SEARCH_START,
  payload: searchQuery
});

export const searchSuccess = searchResults => ({
  type: LibraryActionTypes.SEARCH_SUCCESS,
  payload: searchResults
});

export const searchFailure = error => ({
  type: LibraryActionTypes.SEARCH_SUCCESS,
  payload: error
});

export const clearSearchResults = () => ({
  type: LibraryActionTypes.CLEAR_SEARCH_RESULTS
});

export const clearSearchQuery = () => ({
  type: LibraryActionTypes.CLEAR_SEARCH_QUERY
});