import SearchActionTypes from './search.types';

export const searchStart = searchQuery => ({
  type: SearchActionTypes.SEARCH_START,
  payload: searchQuery
});

export const searchSuccess = searchResults => ({
  type: SearchActionTypes.SEARCH_SUCCESS,
  payload: searchResults
});

export const searchFailure = error => ({
  type: SearchActionTypes.SEARCH_FAILURE,
  payload: error
});

export const clearSearchResults = () => ({
  type: SearchActionTypes.CLEAR_SEARCH_RESULTS
});

export const clearSearchQuery = () => ({
  type: SearchActionTypes.CLEAR_SEARCH_QUERY
});