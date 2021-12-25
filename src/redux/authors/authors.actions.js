import AuthorsActionTypes from './authors.types';

export const fetchAuthorStart = (authorKey) => ({
	type: AuthorsActionTypes.FETCH_AUTHOR_START,
	payload: authorKey,
});

export const fetchAuthorSuccess = (author) => ({
	type: AuthorsActionTypes.FETCH_AUTHOR_SUCCESS,
	payload: author,
});

export const fetchAuthorFailure = (error) => ({
	type: AuthorsActionTypes.FETCH_AUTHOR_FAILURE,
	payload: error,
});
