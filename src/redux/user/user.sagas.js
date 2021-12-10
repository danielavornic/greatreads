import { takeLatest, put, all, call } from 'redux-saga/effects';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseApp, auth, provider } from '../../firebase/firebase.utils';

import UserActionTypes from './user.types';
import { signInSuccess, signInFailure } from './user.actions';

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

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart)
  ]);
}
