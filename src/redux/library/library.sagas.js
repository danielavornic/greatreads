import { takeLatest, put, all, call } from 'redux-saga/effects';

import LibraryActionTypes from './library.types';

import { 
  searchSuccess, 
  searchFailure, 
  fetchBookSuccess, 
  fetchBookFailure
} from './library.actions';

export function* searchAsync({ payload: { category, query } }) {
  try {
    const formattedQuery = yield query.replace(/ /g, '+').toLowerCase();
    const urlCategory = (category === 'all') ? 'q' : category;
    const response = yield fetch(`https://openlibrary.org/search.json?${urlCategory}=${formattedQuery}`);
    const searchResults = yield response.json();
    yield put(searchSuccess(searchResults));
  } catch(error) {
    yield put(searchFailure(error.message));
  }
}

export function* searchStart() {
  yield takeLatest(LibraryActionTypes.SEARCH_START, searchAsync);
}

export function* fetchBookAsync({ payload }) {
  try {
    const response = yield fetch(`https://openlibrary.org/api/books?bibkeys=OLID:${payload}&jscmd=details&format=json`);
    const json = yield response.json();
    const book = yield json[Object.keys(json)[0]].details;

    const worksResponse = yield fetch(`https://openlibrary.org${book.works[0].key}.json`);
    const works = yield worksResponse.json();
    const description = yield works.description 
                            ? works.description.value 
                              ? works.description.value 
                              : works.description
                            : '';
    book.description = description;
    yield put(fetchBookSuccess(book));
  } catch(error) {
    yield put(fetchBookFailure(error.message));
  }
}

export function* fetchBookStart() {
  yield takeLatest(LibraryActionTypes.FETCH_BOOK_START, fetchBookAsync);
}

export function* librarySagas() {
  yield all([
    call(searchStart),
    call(fetchBookStart)
  ]);
}
