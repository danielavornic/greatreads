import BooksActionTypes from './books.types';

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
