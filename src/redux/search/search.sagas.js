import { takeLatest, put, all, call } from 'redux-saga/effects';

import SearchActionTypes from './search.types';
import { searchSuccess, searchFailure } from './search.actions';

function* searchAsync({ payload: { category, term } }) {
  try {
    const formattedTerm = term.replace(/ /g, '+').toLowerCase();
    const fetchUrl =
      category === 'books'
        ? `https://openlibrary.org/search.json?q=${formattedTerm}`
        : `https://openlibrary.org/search/${category}.json?q=${formattedTerm}`;
    const response = yield fetch(fetchUrl);
    const searchResults = yield response.json();
    yield put(searchSuccess(searchResults));
  } catch (error) {
    yield put(searchFailure(error.message));
  }
}

function* onSearchStart() {
  yield takeLatest(SearchActionTypes.SEARCH_START, searchAsync);
}

export function* searchSagas() {
  yield all([call(onSearchStart)]);
}
