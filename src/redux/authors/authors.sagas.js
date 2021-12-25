import { takeLatest, put, all, call } from 'redux-saga/effects';

import AuthorsActionTypes from './authors.types';
import { fetchAuthorSuccess, fetchAuthorFailure } from './authors.actions';

export function* fetchAuthorAsync({ payload }) {
	try {
		const authorResponse = yield fetch(
			`https://openlibrary.org/authors/${payload}.json`
		);
		const author = yield authorResponse.json();
		const authorName = author.name.toLowerCase().replace(/-_ /g, '+');
		const worksResponse = yield fetch(
			`https://openlibrary.org/search.json?author=${authorName}`
		);
		const works = yield worksResponse.json();
		author.works = works;
		yield put(fetchAuthorSuccess(author));
	} catch (error) {
		yield put(fetchAuthorFailure(error.message));
	}
}

export function* fetchAuthorStart() {
	yield takeLatest(AuthorsActionTypes.FETCH_AUTHOR_START, fetchAuthorAsync);
}

export function* authorsSagas() {
	yield all([call(fetchAuthorStart)]);
}
