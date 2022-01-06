import BooksActionTypes from './books.types';

export const fetchBookStart = (bookKey) => ({
  type: BooksActionTypes.FETCH_BOOK_START,
  payload: bookKey,
});

export const fetchBookSuccess = (book) => ({
  type: BooksActionTypes.FETCH_BOOK_SUCCESS,
  payload: book,
});

export const fetchBookFailure = (error) => ({
  type: BooksActionTypes.FETCH_BOOK_FAILURE,
  payload: error,
});

export const fetchBookStatusStart = (bookKey) => ({
  type: BooksActionTypes.FETCH_BOOK_STATUS_START,
  payload: bookKey,
});

export const fetchBookStatusSuccess = (status) => ({
  type: BooksActionTypes.FETCH_BOOK_STATUS_SUCCESS,
  payload: status,
});

export const fetchBookStatusFailure = (error) => ({
  type: BooksActionTypes.FETCH_BOOK_STATUS_FAILURE,
  payload: error,
});

export const updateBookStatusStart = (status) => ({
  type: BooksActionTypes.UPDATE_BOOK_STATUS_START,
  payload: status,
});

export const updateBookStatusSuccess = (status) => ({
  type: BooksActionTypes.UPDATE_BOOK_STATUS_SUCCESS,
  payload: status,
});

export const updateBookStatusFailure = (error) => ({
  type: BooksActionTypes.UPDATE_BOOK_STATUS_FAILURE,
  payload: error,
});

export const fetchBookRatingStart = (bookKey) => ({
  type: BooksActionTypes.FETCH_BOOK_RATING_START,
  payload: bookKey,
});

export const fetchBookRatingSuccess = (rating) => ({
  type: BooksActionTypes.FETCH_BOOK_RATING_SUCCESS,
  payload: rating,
});

export const fetchBookRatingFailure = (error) => ({
  type: BooksActionTypes.FETCH_BOOK_RATING_FAILURE,
  payload: error,
});

export const updateBookRatingStart = (rating) => ({
  type: BooksActionTypes.UPDATE_BOOK_RATING_START,
  payload: rating,
});

export const updateBookRatingSuccess = (rating) => ({
  type: BooksActionTypes.UPDATE_BOOK_RATING_SUCCESS,
  payload: rating,
});

export const updateBookRatingFailure = (error) => ({
  type: BooksActionTypes.UPDATE_BOOK_RATING_FAILURE,
  payload: error,
});

export const fetchIsBookLikedStart = (bookKey) => ({
  type: BooksActionTypes.FETCH_BOOK_LIKE_START,
  payload: bookKey,
});

export const fetchIsBookLikedSuccess = (isLiked) => ({
  type: BooksActionTypes.FETCH_BOOK_LIKE_SUCCESS,
  payload: isLiked,
});

export const fetchIsBookLikedFailure = (error) => ({
  type: BooksActionTypes.FETCH_BOOK_LIKE_FAILURE,
  payload: error,
});

export const updateIsBookLikedStart = (isLiked) => ({
  type: BooksActionTypes.UPDATE_BOOK_LIKE_START,
  payload: isLiked,
});

export const updateIsBookLikedSuccess = (isLiked) => ({
  type: BooksActionTypes.UPDATE_BOOK_LIKE_SUCCESS,
  payload: isLiked,
});

export const updateIsBookLikedFailure = (error) => ({
  type: BooksActionTypes.UPDATE_BOOK_LIKE_FAILURE,
  payload: error,
});

export const fetchUserBooksStart = (usernameAndShelf) => ({
  type: BooksActionTypes.FETCH_USER_BOOKS_START,
  payload: usernameAndShelf,
});

export const fetchUserBooksSuccess = (userBooks) => ({
  type: BooksActionTypes.FETCH_USER_BOOKS_SUCCESS,
  payload: userBooks,
});

export const fetchUserBooksFailure = (error) => ({
  type: BooksActionTypes.FETCH_USER_BOOKS_FAILURE,
  payload: error,
});
