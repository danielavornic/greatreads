import { takeLatest, put, all, call } from 'redux-saga/effects';

import SearchActionTypes from './search.types';
import { searchSuccess, searchFailure } from './search.actions';

export function* searchAsync({ payload: { category, term, facet } }) {
  try {
    const formattedTerm = term.replace(/ /g, '+').toLowerCase();
    const urlFacet = (facet === 'all') ? 'q' : facet;
    const fetchUrl = (category === 'books') ? `https://openlibrary.org/search.json?${urlFacet}=${formattedTerm}`
                                            : `https://openlibrary.org/search/${category}.json?q=${formattedTerm}`;
    const response = yield fetch(fetchUrl);
    const searchResults = yield response.json();
    yield put(searchSuccess(searchResults));
  } catch (error) {
    yield put(searchFailure(error.message));
  }
}

export function* searchStart() {
  yield takeLatest(SearchActionTypes.SEARCH_START, searchAsync);
}

export function* searchSagas() {
  yield all([
    call(searchStart)
  ]);
}
