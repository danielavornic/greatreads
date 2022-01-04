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
import { auth, provider, db } from '../../utils/firebase';
import { isUsernameValid } from '../../utils/auth';

function* addUserToFirestore(user) {
  try {
    yield setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: user.displayName,
      username: user.username,
      photoURL: user.photoURL,
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

function* getUserSnap(user) {
  const userRef = yield doc(db, 'users', user.uid);
  const userSnap = yield getDoc(userRef);
  return userSnap;
}

function* checkIfUsernameExists(username) {
  const usersRef = collection(db, 'users');
  const existingUsernames = query(usersRef, where('username', '==', username));
  const existingUsernamesSnap = yield getDocs(existingUsernames);
  let i = 0;
  existingUsernamesSnap.forEach(() => i++);
  return i > 0;
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

function* isUserAuthenticated() {
  try {
    let user = yield auth.currentUser;
    if (!user) {
      user = yield select(selectCurrentUser);
      if (user) {
        const userSnap = yield getUserSnap(user);
        user.username = userSnap.data().username;
        yield put(signInSuccess(user));
      }
    }
  } catch (error) {
    yield put(signInFailure(error));
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

function* onCheckUserSession() {
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
