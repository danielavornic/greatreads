import { all, call } from 'redux-saga/effects';

import { booksSagas } from './books/books.sagas';
import { genresSagas } from './genres/genres.sagas';
import { searchSagas } from './search/search.sagas';

export default function* rootSaga() {
  yield all([call(searchSagas), call(booksSagas), call(genresSagas)]);
}