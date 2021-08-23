import LibraryActionTypes from './library.types';

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

const libraryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LibraryActionTypes.SEARCH_START:
      return {
        ...state,
        searchQuery: action.payload,
        searchResults: null,
        areSearchResultsFetching: true
      };
    case LibraryActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        areSearchResultsFetching: false,
        searchResults: action.payload
      };
    case LibraryActionTypes.SEARCH_FAILURE:
      return {
        ...state,
        areSearchResultsFetching: false,
        searchError: action.payload
      };
    case LibraryActionTypes.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        areSearchResultsFetching: false,
        searchResults: null
      };
    case LibraryActionTypes.CLEAR_SEARCH_QUERY:
      return {
        ...state,
        areSearchResultsFetching: false,
        searchQuery: null
      };
    case LibraryActionTypes.FETCH_BOOK_START:
      return {
        ...state, 
        bookKey: action.payload,
        book: undefined,
        isBookFetching: true,
        bookError: undefined
      };
    case LibraryActionTypes.FETCH_BOOK_SUCCESS:
      return {
        ...state, 
        book: action.payload,
        isBookFetching: false,
        bookError: undefined
      };
    case LibraryActionTypes.FETCH_BOOK_FAILURE:
      return {
        ...state, 
        book: undefined,
        isBookFetching: false,
        bookError: action.payload
      };
    case LibraryActionTypes.CLEAR_BOOK:
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

export default libraryReducer;
