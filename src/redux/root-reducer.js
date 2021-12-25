import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import searchReducer from './search/search.reducer';
import booksReducer from './books/books.reducer';
import authorsReducer from './authors/authors.reducer';
import userReducer from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  search: searchReducer,
  books: booksReducer,
  authors: authorsReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
