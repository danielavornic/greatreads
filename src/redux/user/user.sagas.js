import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import {
  doc,
  collection,
  query,
  where,
  setDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore';

import UserActionTypes from './user.types';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signOutFailure,
} from './user.actions';
import { auth, provider, db } from '../../firebase/firebase.utils';

function* addUserToFirestore(user) {
  try {
    yield setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: user.displayName,
      username: user.username,
      books: {
        all: [],
        read: [],
        wantToRead: [],
        currentlyReading: [],
      },
    });
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* checkIfUsernameExists(username) {
  const usersRef = collection(db, 'users');
  const existingUsernames = query(usersRef, where('username', '==', username));
  const existingUsernamesSnap = yield getDocs(existingUsernames);
  let i = 0;
  existingUsernamesSnap.forEach(() => i++);
  return i > 0;
}

function isUsernameValid(username) {
  const usernameRegex =
    /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/;
  return usernameRegex.test(username);
}

function* createUsernameGoogle(user) {
  let username = user.email.split('@')[0];
  let usernameExists = yield checkIfUsernameExists(username);
  while (usernameExists) {
    username += username[username.length - 1];
    usernameExists = yield checkIfUsernameExists(username);
  }
  return username;
}

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, provider);
    const userRef = yield doc(db, 'users', user.uid);
    const userSnap = yield getDoc(userRef);
    if (!userSnap.exists()) {
      user.username = yield createUsernameGoogle(user);
      yield addUserToFirestore(user);
    }
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

export function* signUp({ payload: { name, username, email, password } }) {
  try {
    if (isUsernameValid(username)) {
      const usernameExists = yield checkIfUsernameExists(username);
      if (!usernameExists) {
        const { user } = yield createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        user.username = username;
        yield updateProfile(user, { displayName: name }).then();
        yield addUserToFirestore(user);
        yield put(signUpSuccess(user));
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

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
    call(onCheckUserSession),
  ]);
}
