import { all, call } from 'redux-saga/effects';

import { booksSagas } from './books/books.sagas';

export default function* rootSaga() {
  yield all([call(booksSagas)]);
}