import { all, call } from 'redux-saga/effects';

import { booksSagas } from './books/books.sagas';
import { genresSagas } from './genres/genres.sagas';

export default function* rootSaga() {
  yield all([call(booksSagas), call(genresSagas)]);
}