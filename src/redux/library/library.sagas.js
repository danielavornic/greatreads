import { takeLatest, put, all, call } from 'redux-saga/effects';

import LibraryActionTypes from './library.types';

import { searchSuccess, searchFailure } from './library.actions';

export function* searchAsync({ payload: { category, query } }) {
  try {
    const formattedQuery = yield query.replace(/ /g, '+').toLowerCase();
    const urlCategory = (category === 'all') ? 'q' : category;
    const response = yield fetch(`https://openlibrary.org/search.json?${urlCategory}=${formattedQuery}`);
    const searchResults = yield response.json();
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
