import BooksActionTypes from './books.types';

const INITIAL_STATE = {
  bookKey: undefined,
  bookData: undefined,
  isBookFetching: false,
  bookError: null,
  bookStatus: null,
  isBookStatusLoading: false,
  bookStatusError: null,
};

const booksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BooksActionTypes.FETCH_BOOK_START:
      return {
        ...state,
        bookKey: action.payload,
        bookData: undefined,
        isBookFetching: true,
        bookError: null,
      };
    case BooksActionTypes.FETCH_BOOK_SUCCESS:
      return {
        ...state,
        bookData: action.payload,
        isBookFetching: false,
        bookError: null,
      };
    case BooksActionTypes.FETCH_BOOK_FAILURE:
      return {
        ...state,
        bookError: action.payload,
        bookData: undefined,
        isBookFetching: false,
      };
    case BooksActionTypes.FETCH_BOOK_STATUS_START:
    case BooksActionTypes.UPDATE_BOOK_STATUS_START:
      return {
        ...state,
        isBookStatusLoading: true,
        bookError: null,
      };
    case BooksActionTypes.FETCH_BOOK_STATUS_SUCCESS:
    case BooksActionTypes.UPDATE_BOOK_STATUS_SUCCESS:
      return {
        ...state,
        bookStatus: action.payload,
        isBookStatusLoading: false,
        bookError: null,
      };
    case BooksActionTypes.FETCH_BOOK_STATUS_FAILURE:
    case BooksActionTypes.UPDATE_BOOK_STATUS_FAILURE:
      return {
        ...state,
        bookStatusError: action.payload,
        bookStatus: null,
        isBookStatusLoading: false,
      };
    default:
      return state;
  }
};

export default booksReducer;
