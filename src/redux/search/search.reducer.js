import SearchActionTypes from './search.types';

const INITIAL_STATE = {
  searchQuery: undefined,
  searchResults: null,
  areSearchResultsFetching: false,
  searchError: null
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchActionTypes.SEARCH_START:
      return {
        ...state,
        searchQuery: action.payload,
        searchResults: null,
        areSearchResultsFetching: true
      };
    case SearchActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        searchQuery: undefined,
        areSearchResultsFetching: false,
        searchResults: action.payload
      };
    case SearchActionTypes.SEARCH_FAILURE:
      return {
        ...state,
        searchResults: null,
        areSearchResultsFetching: false,
        searchError: action.payload
      };
    default:
      return state;
  }
};

export default searchReducer;
