import BooksActionTypes from './books.types';

const INITIAL_STATE = {
  bookKey: undefined,
  bookData: undefined,
  isBookFetching: false,
  bookError: null,
  bookStatus: null,
  isBookStatusLoading: false,
  bookStatusError: null,
  bookRating: 0,
  bookRatingError: null,
  isBookLiked: false,
  bookLikeError: null,
  userBooks: undefined,
  areUserBooksFetching: false,
  userBooksError: null,
};

const booksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BooksActionTypes.FETCH_BOOK_START:
      return {
        ...state,
        bookKey: action.payload,
        bookData: undefined,
        isBookFetching: true,
        bookError: null,
      };
    case BooksActionTypes.FETCH_BOOK_SUCCESS:
      return {
        ...state,
        bookData: action.payload,
        isBookFetching: false,
        bookError: null,
      };
    case BooksActionTypes.FETCH_BOOK_FAILURE:
      return {
        ...state,
        bookError: action.payload,
        bookData: undefined,
        isBookFetching: false,
      };
    case BooksActionTypes.FETCH_BOOK_STATUS_START:
    case BooksActionTypes.UPDATE_BOOK_STATUS_START:
      return {
        ...state,
        isBookStatusLoading: true,
        bookStatusError: null,
      };
    case BooksActionTypes.FETCH_BOOK_STATUS_SUCCESS:
    case BooksActionTypes.UPDATE_BOOK_STATUS_SUCCESS:
      return {
        ...state,
        bookStatus: action.payload,
        isBookStatusLoading: false,
        bookStatusError: null,
      };
    case BooksActionTypes.FETCH_BOOK_STATUS_FAILURE:
    case BooksActionTypes.UPDATE_BOOK_STATUS_FAILURE:
      return {
        ...state,
        bookStatusError: action.payload,
        bookStatus: null,
        isBookStatusLoading: false,
      };
    case BooksActionTypes.FETCH_BOOK_RATING_SUCCESS:
    case BooksActionTypes.UPDATE_BOOK_RATING_SUCCESS:
      return {
        ...state,
        bookRating: action.payload,
        bookRatingError: null,
      };
    case BooksActionTypes.FETCH_BOOK_RATING_FAILURE:
    case BooksActionTypes.UPDATE_BOOK_RATING_FAILURE:
      return {
        ...state,
        bookRating: null,
        bookRatingError: action.payload,
      };
    case BooksActionTypes.FETCH_BOOK_LIKE_SUCCESS:
    case BooksActionTypes.UPDATE_BOOK_LIKE_SUCCESS:
      return {
        ...state,
        isBookLiked: action.payload,
        bookLikeError: false,
      };
    case BooksActionTypes.FETCH_BOOK_LIKE_FAILURE:
    case BooksActionTypes.UPDATE_BOOK_LIKE_FAILURE:
      return {
        ...state,
        bookLikeError: action.payload,
        isBookLiked: false,
      };
    case BooksActionTypes.FETCH_USER_BOOKS_START:
      return {
        ...state,
        userBooks: undefined,
        areUserBooksFetching: true,
        userBooksError: null,
      };
    case BooksActionTypes.FETCH_USER_BOOKS_SUCCESS:
      return {
        ...state,
        userBooks: action.payload,
        areUserBooksFetching: false,
        userBooksError: null,
      };
    case BooksActionTypes.FETCH_USER_BOOKS_FAILURE:
      return {
        ...state,
        userBooksError: action.payload,
        areUserBooksFetching: false,
        userBooks: undefined,
      };
    default:
      return state;
  }
};

export default booksReducer;
