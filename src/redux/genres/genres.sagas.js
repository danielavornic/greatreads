import { takeLatest, put, all, call } from 'redux-saga/effects';

import GenresActionTypes from './genres.types';

import { 
  fetchGenreSuccess,
  fetchGenreFailure
} from './genres.actions';

export function* fetchGenreAsync({ payload }) {
  try {
    const genreResponse = yield fetch(`https://openlibrary.org/search.json?subject=${payload}&details=true`);
    const genre = yield genreResponse.json();
    const relGenresResponse = yield fetch(`https://openlibrary.org/search/subjects.json?q=${payload}`);
    const relGenres = yield relGenresResponse.json();
    const authorsResponse = yield fetch(`https://openlibrary.org/subjects/${payload}.json?details=true`);
    const authors = yield authorsResponse.json();
    genre.relatedGenres = relGenres;
    genre.authors = authors.authors;
    yield put(fetchGenreSuccess(genre));
  } catch(error) {
    yield put(fetchGenreFailure(error.message));
  }
}

export function* fetchGenreStart() {
  yield takeLatest(GenresActionTypes.FETCH_GENRE_START, fetchGenreAsync);
}

export function* genresSagas() {
  yield all([
    call(fetchGenreStart)
  ]);
}