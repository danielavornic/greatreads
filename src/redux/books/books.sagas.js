import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import BooksActionTypes from './books.types';
import {
  fetchBookSuccess, 
  fetchBookFailure, 
  fetchBookStatusSuccess,
  fetchBookStatusFailure,
  updateBookStatusSuccess,
  updateBookStatusFailure
} from './books.actions';
import { db } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../user/user.selectors';
import { selectBookKey } from '../books/books.selectors';

const statuses = ['wantToRead', 'read', 'currentlyReading'];
const statusesAndAll = ['wantToRead', 'read', 'currentlyReading', 'all'];

export function* fetchBookAsync({ payload }) {
  try {
    const response = yield fetch(`https://openlibrary.org/api/books?bibkeys=OLID:${payload}&jscmd=details&format=json`);
    const json = yield response.json();
    const book = yield json[Object.keys(json)[0]].details;

    book.description = '';
    if (book.works) {
      const worksResponse = yield fetch(`https://openlibrary.org${book.works[0].key}.json`);
      const works = yield worksResponse.json();
      if (!book.authors && !book.by_statement && works.authors) {
        const authorResponse = yield fetch(`https://openlibrary.org${works.authors[0].author.key}.json`);
        const author = yield authorResponse.json();
        book.authors = [{ name: author.name }];
      }
      const description = works.description
        ? works.description.value
          ? works.description.value
          : works.description
        : '';
      book.description = description;
    }
    yield put(fetchBookSuccess(book));
  } catch (error) {
    yield put(fetchBookFailure(error.message));
  }
}


export function* fetchBookStatus({ payload: bookKey }) {
  try {
    const user = yield select(selectCurrentUser);
    const userRef = doc(db, 'users', user.uid);
    const userSnap = yield getDoc(userRef)
    const userData = userSnap.data();
    const userBooks = userData.books;
    if (userBooks.all.includes(bookKey)) {
      for (const status of statuses) {
        if (userBooks[status].includes(bookKey))
          yield put(fetchBookStatusSuccess(status));
      }
    } else {
      yield put(fetchBookStatusSuccess(null));
    }
  } catch(error) {
    yield put(fetchBookStatusFailure(error))
  }
}

export function* updateBookStatus({ payload: status }) {
  try {
    const user = yield select(selectCurrentUser);
    const userRef = doc(db, 'users', user.uid);
    const userSnap = yield getDoc(userRef)
    const userData = userSnap.data();
    const userBooks = userData.books;
    const bookKey = yield select(selectBookKey);

    if (status) {
      for (const s of statuses)
        if (s !== status && userBooks[s].includes(bookKey))
          yield updateDoc(userRef, {
            [`books.${s}`]: arrayRemove(bookKey)
          });
      yield updateDoc(userRef, {
        'books.all': arrayUnion(bookKey),
        [`books.${status}`]: arrayUnion(bookKey)
      });
    } else {
      for (const s of statusesAndAll) {
        if (userBooks[s].includes(bookKey))
          yield updateDoc(userRef, {
            [`books.${s}`]: arrayRemove(bookKey)
          });
      }
    }
    yield put(updateBookStatusSuccess(status));
  } catch (error) {
    yield put(updateBookStatusFailure(error));
  }
}

export function* onfetchBookStart() {
  yield takeLatest(BooksActionTypes.FETCH_BOOK_START, fetchBookAsync);
}

export function* onFetchBookStatusStart() {
  yield takeLatest(BooksActionTypes.FETCH_BOOK_STATUS_START, fetchBookStatus);
}

export function* onUpdateBookStatusStart() {
  yield takeLatest(BooksActionTypes.UPDATE_BOOK_STATUS_START, updateBookStatus);
}

export function* booksSagas() {
  yield all([
    call(onfetchBookStart),
    call(onUpdateBookStatusStart),
    call(onFetchBookStatusStart)
 ]);
}
