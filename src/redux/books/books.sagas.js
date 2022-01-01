import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import BooksActionTypes from './books.types';
import { selectBookKey } from '../books/books.selectors';
import { selectCurrentUser } from '../user/user.selectors';
import {
  fetchBookSuccess,
  fetchBookFailure,
  fetchBookStatusSuccess,
  fetchBookStatusFailure,
  updateBookStatusSuccess,
  updateBookStatusFailure,
} from './books.actions';
import { db } from '../../utils/firebase';

const statuses = ['wantToRead', 'read', 'currentlyReading'];
const statusesAndAll = ['wantToRead', 'read', 'currentlyReading', 'all'];

function* getBookAuthors(book) {
  if (book.authors) return book.authors;

  const works = yield getBookWorks(book);
  if (!book.by_statement && works.authors) {
    const authorResponse = yield fetch(
      `https://openlibrary.org${works.authors[0].author.key}.json`
    );
    const author = yield authorResponse.json();
    return [{ name: author.name }];
  }
}

function* getBookWorks(book) {
  if (book.works) {
    const worksResponse = yield fetch(
      `https://openlibrary.org${book.works[0].key}.json`
    );
    const works = yield worksResponse.json();
    return works;
  }
  return [];
}

function* getBookDescription(book) {
  const works = yield getBookWorks(book);
  if (works) {
    const description = works.description
      ? works.description.value
        ? works.description.value
        : works.description
      : '';
    return description;
  }
  return '';
}

function* getUserRef() {
  const user = yield select(selectCurrentUser);
  return doc(db, 'users', user.uid);
}

function* getUserBooks() {
  const userRef = yield getUserRef();
  const userSnap = yield getDoc(userRef);
  const userData = userSnap.data();
  return userData.books;
}

function* fetchBookAsync({ payload }) {
  try {
    const response = yield fetch(
      `https://openlibrary.org/api/books?bibkeys=OLID:${payload}&jscmd=details&format=json`
    );
    const json = yield response.json();
    const book = yield json[Object.keys(json)[0]].details;
    book.authors = yield getBookAuthors(book);
    book.description = yield getBookDescription(book);
    yield put(fetchBookSuccess(book));
  } catch (error) {
    yield put(fetchBookFailure(error.message));
  }
}

function* fetchBookStatus({ payload: bookKey }) {
  try {
    const userBooks = yield getUserBooks();
    if (userBooks.all.includes(bookKey)) {
      for (const status of statuses)
        if (userBooks[status].includes(bookKey))
          yield put(fetchBookStatusSuccess(status));
    } else yield put(fetchBookStatusSuccess(null));
  } catch (error) {
    yield put(fetchBookStatusFailure(error));
  }
}

function* updateBookStatus({ payload: status }) {
  try {
    const userRef = yield getUserRef();
    const userBooks = yield getUserBooks();
    const bookKey = yield select(selectBookKey);
    if (status) {
      for (const s of statuses)
        if (s !== status && userBooks[s].includes(bookKey))
          yield updateDoc(userRef, {
            [`books.${s}`]: arrayRemove(bookKey),
          });
      yield updateDoc(userRef, {
        'books.all': arrayUnion(bookKey),
        [`books.${status}`]: arrayUnion(bookKey),
      });
    } else {
      for (const s of statusesAndAll) {
        if (userBooks[s].includes(bookKey))
          yield updateDoc(userRef, {
            [`books.${s}`]: arrayRemove(bookKey),
          });
      }
    }
    yield put(updateBookStatusSuccess(status));
  } catch (error) {
    yield put(updateBookStatusFailure(error));
  }
}

function* onFetchBookStart() {
  yield takeLatest(BooksActionTypes.FETCH_BOOK_START, fetchBookAsync);
}

function* onFetchBookStatusStart() {
  yield takeLatest(BooksActionTypes.FETCH_BOOK_STATUS_START, fetchBookStatus);
}

function* onUpdateBookStatusStart() {
  yield takeLatest(BooksActionTypes.UPDATE_BOOK_STATUS_START, updateBookStatus);
}

export function* booksSagas() {
  yield all([
    call(onFetchBookStart),
    call(onUpdateBookStatusStart),
    call(onFetchBookStatusStart),
  ]);
}
