import BooksActionTypes from './books.types';

const INITIAL_STATE = {
  bookKey: undefined,
  bookData: undefined,
  bookStatus: null,
  bookStatusError: undefined,
  isBookFetching: false,
  bookError: undefined
};

const booksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BooksActionTypes.FETCH_BOOK_START:
      return {
        ...state, 
        bookKey: action.payload,
        bookData: undefined,
        isBookFetching: true,
        bookError: undefined,
      };
    case BooksActionTypes.FETCH_BOOK_SUCCESS:
      return {
        ...state, 
        bookData: action.payload,
        isBookFetching: false,
        bookError: undefined,
      };
    case BooksActionTypes.FETCH_BOOK_FAILURE:
      return {
        ...state, 
        bookData: undefined,
        isBookFetching: false,
        bookError: action.payload
      };
      case BooksActionTypes.FETCH_BOOK_STATUS_START:
      case BooksActionTypes.FETCH_BOOK_STATUS_SUCCESS:
        return {
          ...state, 
          status: action.payload,
        };
      case BooksActionTypes.FETCH_BOOK_STATUS_FAILURE:
        return {
          ...state, 
          bookStatus: null,
          bookStatusError: action.payload
        };
    case BooksActionTypes.UPDATE_BOOK_STATUS_START:
      return {
        ...state,
        bookStatus: action.payload
      }
    case BooksActionTypes.UPDATE_BOOK_STATUS_FAILURE:
      return {
        ...state,
        bookError: action.payload
      }
    default:
      return state;
  }
};

export default booksReducer;
