import { takeLatest, put, all, call } from 'redux-saga/effects';

import BooksActionTypes from './books.types';

import { 
  searchSuccess, 
  searchFailure, 
  fetchBookSuccess, 
  fetchBookFailure
} from './books.actions';

export function* searchAsync({ payload: { category, term, facet } }) {
  try {
    const formattedTerm = yield term.replace(/ /g, '+').toLowerCase();
    const urlFacet = (facet === 'all') ? 'q' : facet;
    if (category === 'genres') category = 'subjects';
    const fetchUrl = (category === 'books') ? `https://openlibrary.org/search.json?${urlFacet}=${formattedTerm}`
                                            : `https://openlibrary.org/search/${category}.json?q=${formattedTerm}`;
    const response = yield fetch(fetchUrl);
    const searchResults = yield response.json();
    yield put(searchSuccess(searchResults));
  } catch(error) {
    yield put(searchFailure(error.message));
  }
}

export function* searchStart() {
  yield takeLatest(BooksActionTypes.SEARCH_START, searchAsync);
}

export function* fetchBookAsync({ payload }) {
  try {
    const response = yield fetch(`https://openlibrary.org/api/books?bibkeys=OLID:${payload}&jscmd=details&format=json`);
    const json = yield response.json();
    const book = yield json[Object.keys(json)[0]].details;

    if (book.works) {
      const worksResponse = yield fetch(`https://openlibrary.org${book.works[0].key}.json`);
      const works = yield worksResponse.json();
      const description = yield works.description 
                              ? works.description.value 
                                ? works.description.value 
                                : works.description
                              : '';
      book.description = description;
      
      if (!book.authors && !book.by_statement && works.authors) {
        const authorResponse = yield fetch(`https://openlibrary.org${works.authors[0].author.key}.json`);
        const author = yield authorResponse.json();
        book.authors = [{name: author.name}];
      }
    } else {
      book.description = '';
    }
    
    yield put(fetchBookSuccess(book));
  } catch(error) {
    yield put(fetchBookFailure(error.message));
  }
}

export function* fetchBookStart() {
  yield takeLatest(BooksActionTypes.FETCH_BOOK_START, fetchBookAsync);
}

export function* booksSagas() {
  yield all([
    call(searchStart),
    call(fetchBookStart)
  ]);
}
