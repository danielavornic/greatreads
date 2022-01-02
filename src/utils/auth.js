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
