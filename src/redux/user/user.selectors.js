import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
	[selectUser],
	(user) => user.currentUser
);

export const selectIsUserLogging = createSelector(
	[selectUser],
	(user) => user.isUserLogging
);

export const selectUserError = createSelector(
	[selectUser],
	(user) => user.error
);
