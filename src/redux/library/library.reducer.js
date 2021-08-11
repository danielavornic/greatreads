import LibraryActionTypes from './library.types';

const INITIAL_STATE = {
  searchQuery: undefined,
  searchResults: null,
  isFetching: false,
  error: undefined
};

const libraryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LibraryActionTypes.SEARCH_START:
      return {
        ...state,
        searchQuery: action.payload,
        isFetching: true
      };
    case LibraryActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        searchResults: action.payload
      };
    case LibraryActionTypes.SEARCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case LibraryActionTypes.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        isFetching: false,
        searchResults: null
      };
    case LibraryActionTypes.CLEAR_SEARCH_QUERY:
      return {
        ...state,
        isFetching: false,
        searchQuery: undefined
      };
    default:
      return state;
  }
};

export default libraryReducer;
