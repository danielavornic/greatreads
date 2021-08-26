import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import booksReducer from './books/books.reducer';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  books: booksReducer
});

export default persistReducer(persistConfig, rootReducer);
