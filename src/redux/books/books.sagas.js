import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import BooksActionTypes from './books.types';
import {
  fetchBookSuccess, 
  fetchBookFailure, 
  updateBookStatusSuccess,
  updateBookStatusFailure
} from './books.actions';
import { db, auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../user/user.selectors';
import { selectBook } from '../books/books.selectors';

const statuses = ['wantToRead', 'read', 'currentlyReading'];

export function* fetchBookAsync({ payload }) {
  try {
    const response = yield fetch(`https://openlibrary.org/api/books?bibkeys=OLID:${payload}&jscmd=details&format=json`);
    const json = yield response.json();
    const book = yield json[Object.keys(json)[0]].details;
    const bookKey = book.key.split('/')[2];

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

    book.status = '';
    const user = yield select(selectCurrentUser);
    const userRef = doc(db, 'users', user.uid);
    const userSnap = yield getDoc(userRef)
    const userData = userSnap.data();
    const userBooks = userData.books;
    if (userBooks.all.includes(bookKey)) {
      for (const status of statuses)
        if (userBooks[status].includes(bookKey))
          book.status = status;
    }
    yield put(fetchBookSuccess(book));
  } catch (error) {
    yield put(fetchBookFailure(error.message));
  }
}

export function* updateBookStatus({ payload: status }) {
  try {
    const user = yield select(selectCurrentUser);
    const userRef = doc(db, 'users', user.uid);
    const userSnap = yield getDoc(userRef)
    const userData = userSnap.data();
    const userBooks = userData.books;
    const book = yield select(selectBook);
    const bookKey = book.key.split('/')[2];

    if (status === '') {
      statuses.push('all');
      for (const s of statuses)
        if (userBooks[s].includes(bookKey))
          yield updateDoc(userRef, {
            [`books.${s}`]: arrayRemove(bookKey)
          });
    } else {
      for (const s of statuses)
        if (s !== status && userBooks[s].includes(bookKey))
          yield updateDoc(userRef, {
            [`books.${s}`]: arrayRemove(bookKey)
          });
      yield updateDoc(userRef, {
        'books.all': arrayUnion(bookKey),
        [`books.${status}`]: arrayUnion(bookKey)
      });
    }
    yield put(updateBookStatusSuccess());
  } catch (error) {
    yield put(updateBookStatusFailure(error));
  }
}

export function* fetchBookStart() {
  yield takeLatest(BooksActionTypes.FETCH_BOOK_START, fetchBookAsync);
}

export function* onUpdateBookStatusStart() {
  yield takeLatest(BooksActionTypes.UPDATE_BOOK_STATUS_START, updateBookStatus);
}

export function* booksSagas() {
  yield all([
    call(fetchBookStart),
    call(onUpdateBookStatusStart)
 ]);
}
