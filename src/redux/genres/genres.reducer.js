import GENRES_DATA from './genres.data'

const INITIAL_STATE = {
  genresData: GENRES_DATA
}

const genresReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default genresReducer;