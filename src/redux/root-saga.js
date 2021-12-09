import { all, call } from 'redux-saga/effects';

import { searchSagas } from './search/search.sagas';
import { booksSagas } from './books/books.sagas';
import { authorsSagas } from './authors/authors.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
  yield all([
    call(searchSagas), 
    call(booksSagas),
    call(authorsSagas),
    call(userSagas)
  ]);
}