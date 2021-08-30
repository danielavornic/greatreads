import BooksActionTypes from './books.types';

const INITIAL_STATE = {
  searchQuery: undefined,
  searchResults: null,
  areSearchResultsFetching: false,
  searchError: undefined,
  bookKey: undefined,
  book: undefined,
  isBookFetching: false,
  bookError: undefined
};

const booksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BooksActionTypes.SEARCH_START:
      return {
        ...state,
        searchQuery: action.payload,
        searchResults: null,
        areSearchResultsFetching: true
      };
    case BooksActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        searchQuery: undefined,
        areSearchResultsFetching: false,
        searchResults: action.payload
      };
    case BooksActionTypes.SEARCH_FAILURE:
      return {
        ...state,
        areSearchResultsFetching: false,
        searchError: action.payload
      };
    case BooksActionTypes.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        areSearchResultsFetching: false,
        searchResults: null
      };
    case BooksActionTypes.CLEAR_SEARCH_QUERY:
      return {
        ...state,
        areSearchResultsFetching: false,
        searchQuery: null
      };
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
