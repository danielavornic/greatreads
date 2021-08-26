import BooksActionTypes from './books.types';

export const searchStart = searchQuery => ({
  type: BooksActionTypes.SEARCH_START,
  payload: searchQuery
});

export const searchSuccess = searchResults => ({
  type: BooksActionTypes.SEARCH_SUCCESS,
  payload: searchResults
});

export const searchFailure = error => ({
  type: BooksActionTypes.SEARCH_FAILURE,
  payload: error
});

export const clearSearchResults = () => ({
  type: BooksActionTypes.CLEAR_SEARCH_RESULTS
});

export const clearSearchQuery = () => ({
  type: BooksActionTypes.CLEAR_SEARCH_QUERY
});

export const fetchBookStart = bookKey => ({
  type: BooksActionTypes.FETCH_BOOK_START,
  payload: bookKey
});

export const fetchBookSuccess = book => ({
  type: BooksActionTypes.FETCH_BOOK_SUCCESS,
  payload: book
});

export const fetchBookFailure = error => ({
  type: BooksActionTypes.FETCH_BOOK_FAILURE,
  payload: error
});

export const clearBook = () => ({
  type: BooksActionTypes.CLEAR_BOOK
})
