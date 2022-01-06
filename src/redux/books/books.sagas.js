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
import { selectBook } from '../books/books.selectors';
import { selectCurrentUser } from '../user/user.selectors';
import {
  fetchBookSuccess,
  fetchBookFailure,
  fetchBookStatusSuccess,
  fetchBookStatusFailure,
  updateBookStatusSuccess,
  updateBookStatusFailure,
  fetchBookRatingSuccess,
  fetchBookRatingFailure,
  fetchUserBooksSuccess,
  fetchUserBooksFailure,
  updateBookRatingFailure,
  updateBookRatingSuccess,
  fetchIsBookLikedFailure,
  fetchIsBookLikedSuccess,
  updateIsBookLikedFailure,
  updateIsBookLikedSuccess,
} from './books.actions';
import { db } from '../../utils/firebase';
import {
  isBookStored,
  getStoredBookObj,
  createNewBookObj,
  statuses,
} from '../../utils/books';

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

function* updateBookStatus({ payload: { bookKey, status } }) {
  try {
    const userRef = yield getUserRef();
    const userBooks = yield getUserBooks();
    const book = yield select(selectBook);
    const storedBookObj = getStoredBookObj(userBooks, bookKey);
    const newBookObj = createNewBookObj(book, bookKey);
    if (status) {
      for (const s of statuses)
        if (s !== status && isBookStored(userBooks['statuses'][s], bookKey))
          yield updateDoc(userRef, {
            [`books.statuses.${s}`]: arrayRemove(storedBookObj),
          });
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

function* fetchBookRating({ payload: bookKey }) {
  try {
    let userBooks = yield getUserBooks();
    let b = false;
    if (isBookStored(userBooks.all, bookKey)) {
      for (let rating = 1; rating <= 10; rating++)
        if (isBookStored(userBooks['ratings'][rating], bookKey)) {
          yield put(fetchBookRatingSuccess(rating));
          b = !b;
        }
    }
    if (b === false) yield put(fetchBookRatingSuccess(0));
  } catch (error) {
    yield put(fetchBookRatingFailure(error));
  }
}

function* updateBookRating({ payload: { bookKey, rating } }) {
  try {
    const userRef = yield getUserRef();
    const userBooks = yield getUserBooks();
    const book = yield select(selectBook);
    const storedBookObj = getStoredBookObj(userBooks, bookKey);
    const newBookObj = createNewBookObj(book, bookKey);
    if (rating > 0) {
      for (let r = 1; r <= 10; r++)
        if (r !== rating && isBookStored(userBooks['ratings'][r], bookKey))
          yield updateDoc(userRef, {
            [`books.ratings.${r}`]: arrayRemove(storedBookObj),
          });
      yield updateDoc(userRef, {
        [`books.ratings.${rating.toString()}`]: arrayUnion(newBookObj),
      });
    } else {
      for (let r = 1; r <= 10; r++)
        if (isBookStored(userBooks['ratings'][r], bookKey))
          yield updateDoc(userRef, {
            [`books.ratings.${r}`]: arrayRemove(storedBookObj),
          });
    }
    yield put(updateBookRatingSuccess(rating));
  } catch (error) {
    yield put(updateBookRatingFailure(error));
  }
}

function* fetchIsBookLiked({ payload: bookKey }) {
  try {
    const userBooks = yield getUserBooks();
    const isLiked = userBooks.liked.some((book) => book.bookKey === bookKey);
    yield put(fetchIsBookLikedSuccess(isLiked));
  } catch (error) {
    yield put(fetchIsBookLikedFailure(error));
  }
}

function* updateIsBookLiked({ payload: { bookKey, isLiked } }) {
  try {
    const userRef = yield getUserRef();
    const userBooks = yield getUserBooks();
    const storedBookObj = yield getStoredBookObj(userBooks, bookKey);
    const book = yield select(selectBook);
    const newBookObj = createNewBookObj(book, bookKey);
    if (isLiked)
      yield updateDoc(userRef, {
        'books.liked': arrayRemove(storedBookObj),
      });
    else
      yield updateDoc(userRef, {
        'books.liked': arrayUnion(newBookObj),
      });
    yield put(updateIsBookLikedSuccess(!isLiked));
  } catch (error) {
    yield put(updateIsBookLikedFailure(error));
  }
}

function* fetchUserBooks({ payload: { username, shelf, rating } }) {
  try {
    const usersRef = collection(db, 'users');
    const user = query(usersRef, where('username', '==', username));
    const userSnap = yield getDocs(user);
    let result = {
      books: [],
      shelf: shelf,
      rating: rating,
      username: username,
      displayName: '',
      photoURL: '',
    };
    userSnap.forEach((user) => {
      const books = user.data().books;
      result.books = rating
        ? books['ratings'][rating]
        : statuses.includes(shelf)
        ? books['statuses'][shelf]
        : books[shelf];
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

function* onFetchBookRatingStart() {
  yield takeLatest(BooksActionTypes.FETCH_BOOK_RATING_START, fetchBookRating);
}

function* onUpdateBookRatingStart() {
  yield takeLatest(BooksActionTypes.UPDATE_BOOK_RATING_START, updateBookRating);
}

function* onFetchIsBookLikedStart() {
  yield takeLatest(BooksActionTypes.FETCH_BOOK_LIKE_START, fetchIsBookLiked);
}

function* onUpdateIsBookLikedStart() {
  yield takeLatest(BooksActionTypes.UPDATE_BOOK_LIKE_START, updateIsBookLiked);
}

function* onFetchUserBooksStart() {
  yield takeLatest(BooksActionTypes.FETCH_USER_BOOKS_START, fetchUserBooks);
}

export function* booksSagas() {
  yield all([
    call(onFetchBookStart),
    call(onUpdateBookStatusStart),
    call(onFetchBookStatusStart),
    call(onFetchBookRatingStart),
    call(onUpdateBookRatingStart),
    call(onFetchUserBooksStart),
    call(onFetchIsBookLikedStart),
    call(onUpdateIsBookLikedStart),
  ]);
}
