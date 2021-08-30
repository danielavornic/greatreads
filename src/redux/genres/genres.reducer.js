import GenresActionTypes from './genres.types';
import GENRES_DATA from './genres.data';

const INITIAL_STATE = {
  genresData: GENRES_DATA,
  genreName: undefined,
  genreData: undefined,
  isGenreFetching: undefined,
  genreError: undefined
}

const genresReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GenresActionTypes.FETCH_GENRE_START:
      return {
        ...state,
        genreName: action.payload,
        isGenreFetching: true,
        genreData: undefined,
        genreError: undefined
      };
    case GenresActionTypes.FETCH_GENRE_SUCCESS:
      return {
        ...state,
        genreName: undefined,
        isGenreFetching: false,
        genreData: action.payload,
        genreError: undefined
      };
    case GenresActionTypes.FETCH_GENRE_FAILURE:
      return {
        ...state,
        genreName: undefined,
        isGenreFetching: false,
        genreData: undefined,
        genreError: action.payload
      };
    default:
      return state;
  }
};

export default genresReducer;