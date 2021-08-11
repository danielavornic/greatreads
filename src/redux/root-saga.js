import { all, call } from 'redux-saga/effects';

import { librarySagas } from './library/library.sagas';

export default function* rootSaga() {
  yield all([call(librarySagas)]);
}