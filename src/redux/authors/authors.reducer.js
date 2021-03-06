import AuthorsActionTypes from './authors.types';

const INITIAL_STATE = {
  authorKey: undefined,
  author: undefined,
  isAuthorFetching: false,
  authorError: null,
};

const authorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthorsActionTypes.FETCH_AUTHOR_START:
      return {
        ...state,
        authorKey: action.payload,
        author: undefined,
        isAuthorFetching: true,
        authorError: null,
      };
    case AuthorsActionTypes.FETCH_AUTHOR_SUCCESS:
      return {
        ...state,
        author: action.payload,
        isAuthorFetching: false,
        authorError: null,
      };
    case AuthorsActionTypes.FETCH_AUTHOR_FAILURE:
      return {
        ...state,
        author: undefined,
        isAuthorFetching: false,
        authorError: action.payload,
      };
    default:
      return state;
  }
};

export default authorsReducer;
