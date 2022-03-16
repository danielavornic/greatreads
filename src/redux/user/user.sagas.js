import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import UserActionTypes from './user.types';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signOutFailure,
} from './user.actions';
import { auth, provider, db } from '../../utils/firebase';
import {
  isUsernameValid,
  checkIfUsernameExists,
  createUsernameGoogle,
  getUserSnap,
  createFirestoreUserObj,
} from '../../utils/auth';

function* addUserToFirestore(user) {
  try {
    yield setDoc(doc(db, 'users', user.uid), createFirestoreUserObj(user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, provider);
    const userSnap = yield getUserSnap(user);
    let username;
    if (userSnap.exists()) {
      username = userSnap.data().username;
    } else {
      username = yield createUsernameGoogle(user);
      yield addUserToFirestore({ ...user, username: username });
    }
    const userObj = { currentUser: user, username: username };
    yield put(signInSuccess(userObj));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    const userSnap = yield getUserSnap(user);
    const username = userSnap.data().username;
    const userObj = { currentUser: user, username: username };
    yield put(signInSuccess(userObj));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signUp({ payload: { name, username, email, password } }) {
  try {
    if (isUsernameValid(username)) {
      const usernameExists = yield checkIfUsernameExists(username);
      if (!usernameExists) {
        const { user } = yield createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userObj = { currentUser: user, username: username };
        yield updateProfile(user, { displayName: name }).then();
        yield addUserToFirestore({ ...user, username: username });
        yield put(signUpSuccess(userObj));
      } else {
        yield put(signUpFailure({ code: 'auth/username-already-in-use' }));
      }
    } else {
      yield put(signUpFailure({ code: 'auth/invalid-username' }));
    }
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* signOutUser() {
  try {
    yield signOut(auth);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure());
  }
}

function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* onSignOutStart() {
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
