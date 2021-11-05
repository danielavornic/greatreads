const isEmpty = (arr, value) => {
  if (value === '')
    arr.push('This field is required.');

  return arr;
}

export const validateName = name => isEmpty([], name);

export const validateEmail = email => {
  let emailErrors = [];

  const emailPattern = /\S+@\S+\.\S+/;
  if (!emailPattern.test(email))
    emailErrors.push('Please enter a valid email adress.');

  emailErrors = isEmpty(emailErrors, email);

  return emailErrors;
};

export const validatePassword = password => {
  let passwordErrors = []

  const nums = /[0-9]/;
  if (!nums.test(password))
    passwordErrors.push('Your password must contain at least one number.');

  if (password.length < 6)
    passwordErrors.push('Your password must be least 6 characters long.');

  passwordErrors = isEmpty(passwordErrors, password);

  return passwordErrors;
};

export const validatePasswordConfirm = (password, passwordConfirm) => {
  let passwordConfirmErrors = [];

  if (password !== passwordConfirm)
    passwordConfirmErrors.push('Passwords do not match.');

  passwordConfirmErrors = isEmpty(passwordConfirmErrors, passwordConfirm);

  return passwordConfirmErrors;
};