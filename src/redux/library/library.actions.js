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
  type: LibraryActionTypes.SEARCH_FAILURE,
  payload: error
});

export const clearSearchResults = () => ({
  type: LibraryActionTypes.CLEAR_SEARCH_RESULTS
});

export const clearSearchQuery = () => ({
  type: LibraryActionTypes.CLEAR_SEARCH_QUERY
});

export const fetchBookStart = bookKey => ({
  type: LibraryActionTypes.FETCH_BOOK_START,
  payload: bookKey
});

export const fetchBookSuccess = book => ({
  type: LibraryActionTypes.FETCH_BOOK_SUCCESS,
  payload: book
});

export const fetchBookFailure = error => ({
  type: LibraryActionTypes.FETCH_BOOK_FAILURE,
  payload: error
});

export const clearBook = () => ({
  type: LibraryActionTypes.CLEAR_BOOK
})
