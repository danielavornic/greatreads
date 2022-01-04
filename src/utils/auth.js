import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';

import { db } from './firebase';

export const handleSignUpErrors = (code) => {
  const error = {};
  switch (code) {
    case 'auth/invalid-email':
      error.message = 'Please use a valid email adress.';
      error.type = 'email';
      break;
    case 'auth/email-already-in-use':
      error.message = 'This email is already connected to an account.';
      error.type = 'email';
      break;
    case 'auth/weak-password':
      error.message = 'Password should be at least 6 characters.';
      error.type = 'password';
      break;
    case 'auth/username-already-in-use':
      error.message = 'This username is already connected to an account.';
      error.type = 'username';
      break;
    case 'auth/invalid-username':
      error.message = 'Please use a valid username.';
      error.type = 'username';
      break;
    default:
      error.message = 'An internal error has occured.';
      error.type = '';
  }
  return error;
};

export const isUsernameValid = (username) => {
  const usernameRegex =
    /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/;
  return usernameRegex.test(username);
};

export async function checkIfUsernameExists(username) {
  const usersRef = collection(db, 'users');
  const existingUsernames = query(usersRef, where('username', '==', username));
  const existingUsernamesSnap = await getDocs(existingUsernames);
  let i = 0;
  existingUsernamesSnap.forEach(() => i++);
  return i > 0;
}

export async function createUsernameGoogle(user) {
  let username = user.email.split('@')[0];
  let usernameExists = await checkIfUsernameExists(username);
  while (usernameExists) {
    username += username[username.length - 1];
    usernameExists = await checkIfUsernameExists(username);
  }
  return username;
}

export async function getUserSnap(user) {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  return userSnap;
}
