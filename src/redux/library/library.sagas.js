import { takeLatest, put, all, call } from 'redux-saga/effects';

import LibraryActionTypes from './library.types';

import { searchSuccess, searchFailure, clearSearchResults } from './library.actions';

export function* searchAsync({ payload: { category, query } }) {
  try {
    yield put(clearSearchResults());
    const formattedQuery = yield query.replace(/ /g, '+').toLowerCase();
    const sourceParams = category === 'all'
                        ? yield `q=${formattedQuery}` 
                        : yield `${category}=${formattedQuery}`;
    const response = yield fetch(`http://openlibrary.org/search.json?${sourceParams}`);
    const json = yield response.json();
    const searchResults = yield json.docs;
    console.log(searchResults);
    yield put(searchSuccess(searchResults));
  } catch(error) {
    yield put(searchFailure(error.message))
  }
}

export function* searchStart() {
  yield takeLatest(LibraryActionTypes.SEARCH_START, searchAsync);
}

export function* librarySagas() {
  yield all([
    call(searchStart)
  ]);
}
