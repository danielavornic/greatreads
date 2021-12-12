import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

import { auth, provider } from '../../firebase/firebase.utils';
import UserActionTypes from './user.types';
import {
	signInSuccess,
	signInFailure,
	signUpSuccess,
	signUpFailure,
	signOutSuccess,
	signOutFailure,
} from './user.actions';

export function* signInWithGoogle() {
	try {
		const { user } = yield signInWithPopup(auth, provider);
		yield put(signInSuccess(user));
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield signInWithEmailAndPassword(auth, email, password);
		yield put(signInSuccess(user));
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signUp({ payload: { name, email, password } }) {
	try {
		const { user } = yield createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		user.displayName = yield name;
		yield put(signUpSuccess(user));
	} catch (error) {
		yield put(signUpFailure(error));
	}
}

export function* signOutUser() {
	try {
		yield signOut(auth);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailure());
	}
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
	yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutUser);
}

export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignOutStart),
	]);
}
