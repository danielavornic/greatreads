import BooksActionTypes from './books.types';

const INITIAL_STATE = {
  bookKey: undefined,
  book: undefined,
  isBookFetching: false,
  bookError: undefined
};

const booksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BooksActionTypes.FETCH_BOOK_START:
      return {
        ...state, 
        bookKey: action.payload,
        book: undefined,
        isBookFetching: true,
        bookError: undefined
      };
    case BooksActionTypes.FETCH_BOOK_SUCCESS:
      return {
        ...state, 
        book: action.payload,
        isBookFetching: false,
        bookError: undefined
      };
    case BooksActionTypes.FETCH_BOOK_FAILURE:
      return {
        ...state, 
        book: undefined,
        isBookFetching: false,
        bookError: action.payload
      };
    case BooksActionTypes.CLEAR_BOOK:
      return {
        ...state,
        book: undefined,
        isBookFetching: false,
        bookError: false
      }
    default:
      return state;
  }
};

export default booksReducer;
