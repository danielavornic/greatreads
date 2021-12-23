import { takeLatest, put, all, call } from 'redux-saga/effects';

import BooksActionTypes from './books.types';
import { fetchBookSuccess, fetchBookFailure } from './books.actions';

export function* fetchBookAsync({ payload }) {
  try {
    const response = yield fetch(`https://openlibrary.org/api/books?bibkeys=OLID:${payload}&jscmd=details&format=json`);
    const json = yield response.json();
    const book = yield json[ Object.keys(json)[ 0 ] ].details;

    if (book.works) {
      const worksResponse = yield fetch(`https://openlibrary.org${book.works[ 0 ].key}.json`);
      const works = yield worksResponse.json();
      const description = yield works.description
        ? works.description.value
          ? works.description.value
          : works.description
        : '';
      book.description = description;

      if (!book.authors && !book.by_statement && works.authors) {
        const authorResponse = yield fetch(`https://openlibrary.org${works.authors[ 0 ].author.key}.json`);
        const author = yield authorResponse.json();
        book.authors = [ { name: author.name } ];
      }
    } else {
      book.description = '';
    }
    yield put(fetchBookSuccess(book));
  } catch (error) {
    yield put(fetchBookFailure(error.message));
  }
}

export function* fetchBookStart() {
  yield takeLatest(BooksActionTypes.FETCH_BOOK_START, fetchBookAsync);
}

export function* booksSagas() {
  yield all([
    call(fetchBookStart)
  ]);
}
