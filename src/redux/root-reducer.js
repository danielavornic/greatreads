import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import booksReducer from './books/books.reducer';
import genresReducer from './genres/genres.reducer';
import searchReducer from './search/search.reducer';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  search: searchReducer,
  books: booksReducer,
  genres: genresReducer
});

export default persistReducer(persistConfig, rootReducer);
