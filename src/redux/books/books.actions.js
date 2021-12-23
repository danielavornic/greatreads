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

export const updateBookStatusStart = status => ({
  type: BooksActionTypes.UPDATE_BOOK_STATUS_START,
  payload: status
});

export const updateBookStatusSuccess = () => ({
  type: BooksActionTypes.UPDATE_BOOK_STATUS_SUCCESS
});

export const updateBookStatusFailure = error => ({
  type: BooksActionTypes.UPDATE_BOOK_STATUS_FAILURE,
  payload: error
});
