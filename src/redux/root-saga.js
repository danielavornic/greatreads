import { all, call } from 'redux-saga/effects';

import { searchSagas } from './search/search.sagas';
import { booksSagas } from './books/books.sagas';
import { genresSagas } from './genres/genres.sagas';
import { authorsSagas } from './authors/authors.sagas';

export default function* rootSaga() {
  yield all([
    call(searchSagas), 
    call(booksSagas), 
    call(genresSagas),
    call(authorsSagas)
  ]);
}