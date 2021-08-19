import LibraryActionTypes from './library.types';

const INITIAL_STATE = {
  searchQuery: undefined,
  searchResults: null,
  areSearchResultsFetching: false,
  error: undefined
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
        error: action.payload
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
    default:
      return state;
  }
};

export default libraryReducer;
