import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectUsername = createSelector(
  [selectUser],
  (user) => user.username
);

export const selectIsUserLogging = createSelector(
  [selectUser],
  (user) => user.isUserLogging
);

export const selectUserError = createSelector(
  [selectUser],
  (user) => user.userError
);
