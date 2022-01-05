import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  getDocs,
  where,
} from 'firebase/firestore';

import BooksActionTypes from './books.types';
import { selectBookKey, selectBook } from '../books/books.selectors';
import { selectCurrentUser } from '../user/user.selectors';
import {
  fetchBookSuccess,
  fetchBookFailure,
  fetchBookStatusSuccess,
  fetchBookStatusFailure,
  updateBookStatusSuccess,
  updateBookStatusFailure,
  fetchUserBooksSuccess,
  fetchUserBooksFailure,
} from './books.actions';
import { db } from '../../utils/firebase';

const statuses = ['wantToRead', 'read', 'currentlyReading'];

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

function isBookStored(bookArr, bookKey) {
  return bookArr ? bookArr.some((book) => book.bookKey === bookKey) : false;
}

function* fetchBookStatus({ payload: bookKey }) {
  try {
    let userBooks = yield getUserBooks();
    if (isBookStored(userBooks.all, bookKey)) {
      for (const status of statuses)
        if (isBookStored(userBooks['statuses'][status], bookKey))
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
    const book = yield select(selectBook);
    const cover = book.covers ? book.covers[0] : null;
    const storedBookObj = userBooks.all.filter(
      (book) => book.bookKey === bookKey
    )[0];
    const newBookObj = {
      bookKey: bookKey,
      title: book.title,
      cover: cover,
    };
    if (status) {
      for (const s of statuses) {
        if (s !== status && isBookStored(userBooks['statuses'][s], bookKey))
          yield updateDoc(userRef, {
            [`books.statuses.${s}`]: arrayRemove(storedBookObj),
          });
      }
      yield updateDoc(userRef, {
        'books.all': arrayUnion(newBookObj),
        [`books.statuses.${status}`]: arrayUnion(newBookObj),
      });
    } else {
      yield updateDoc(userRef, {
        'books.all': arrayRemove(storedBookObj),
      });
      for (const s of statuses) {
        if (isBookStored(userBooks['statuses'][s], bookKey))
          yield updateDoc(userRef, {
            [`books.statuses.${s}`]: arrayRemove(storedBookObj),
          });
      }
    }
    yield put(updateBookStatusSuccess(status));
  } catch (error) {
    yield put(updateBookStatusFailure(error));
  }
}

function* fetchUserBooks({ payload: { username, shelf } }) {
  try {
    const usersRef = collection(db, 'users');
    const user = query(usersRef, where('username', '==', username));
    const userSnap = yield getDocs(user);
    let result = {
      books: [],
      shelf: shelf,
      displayName: '',
      username: username,
      photoURL: '',
    };
    userSnap.forEach((user) => {
      result.books = statuses.includes(shelf)
        ? user.data().books['statuses'][shelf]
        : user.data().books[shelf];
      result.displayName = user.data().displayName;
      result.photoURL = user.data().photoURL;
    });
    yield put(fetchUserBooksSuccess(result));
  } catch (error) {
    yield put(fetchUserBooksFailure(error));
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

function* onFetchUserBooksStart() {
  yield takeLatest(BooksActionTypes.FETCH_USER_BOOKS_START, fetchUserBooks);
}

export function* booksSagas() {
  yield all([
    call(onFetchBookStart),
    call(onUpdateBookStatusStart),
    call(onFetchBookStatusStart),
    call(onFetchUserBooksStart),
  ]);
}
