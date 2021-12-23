import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import {
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import { auth, provider, db } from '../../firebase/firebase.utils';
import UserActionTypes from './user.types';
import {
	signInSuccess,
	signInFailure,
	signUpSuccess,
	signUpFailure,
	signOutSuccess,
	signOutFailure,
	updateBookStatusSuccess,
	updateBookStatusFailure
} from './user.actions';
import { selectBook } from '../books/books.selectors';

function* addUserToFirestore(user) {
	try {
		yield setDoc(doc(db, 'users', user.uid), {
			email: user.email,
			displayName: user.displayName,
			books: {
				'all': [],
				'read': [],
				'wantToRead': [],
				'currentlyReading': []
			}
		});
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield signInWithPopup(auth, provider);
		const userRef = yield doc(db, 'users', user.uid);
		const userSnap = yield getDoc(userRef);
		if (!userSnap.exists())
			yield addUserToFirestore(user);
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
		yield updateProfile(user, { displayName: name }).then();
		yield addUserToFirestore(user);
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

export function* isUserAuthenticated() {
	try {
		const user = yield auth.currentUser;
		if (user) yield put(signInSuccess(user));
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* updateBookStatus({ payload: shelf }) {
	try {
		const userRef = yield doc(db, 'users', auth.currentUser.uid);
		const userSnap = yield getDoc(userRef)
		const userData = yield userSnap.data();
		const userBooks = yield userData.books;

		const book = yield select(selectBook);
		const bookKey = book.key.split('/')[2];

		const mainShelves = ['wantToRead', 'read', 'currentlyReading'];
		for (const s of mainShelves)
			if (s !== shelf && userBooks[s].includes(bookKey))
				yield updateDoc(userRef, {
					[`books.${s}`]: arrayRemove(bookKey)
				});

		yield updateDoc(userRef, {
			'books.all': arrayUnion(bookKey),
			[`books.${shelf}`]: arrayUnion(bookKey)
		});
		yield put(updateBookStatusSuccess());
	} catch (error) {
		yield put(updateBookStatusFailure(error));
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

export function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onUpdateBookStatusStart() {
	yield takeLatest(UserActionTypes.UPDATE_BOOK_STATUS_START, updateBookStatus);
}


export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignOutStart),
		call(onCheckUserSession),
		call(onUpdateBookStatusStart)
	]);
}
