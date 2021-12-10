import { takeLatest, put, all, call } from 'redux-saga/effects';
import { signInWithRedirect } from "firebase/auth";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

import { FirebaseApp, auth, provider } from '../../firebase/firebase.utils';

import UserActionTypes from './user.types';
import {
  signInSuccess,
  signInFailure
} from './user.actions';

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithRedirect(auth, provider);
    const { user } = yield signInWithPopup(auth, provider);
    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart)
  ]);
}
