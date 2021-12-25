import UserActionTypes from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	isUserLogging: false,
	error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.EMAIL_SIGN_IN_START:
		case UserActionTypes.SIGN_UP_START:
			return {
				...state,
				isUserLogging: true,
			};
		case UserActionTypes.SIGN_IN_SUCCESS:
		case UserActionTypes.SIGN_UP_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
				isUserLogging: false,
				error: null,
			};
		case UserActionTypes.SIGN_IN_FAILURE:
		case UserActionTypes.SIGN_UP_FAILURE:
		case UserActionTypes.SIGN_OUT_FAILURE:
			return {
				...state,
				isUserLogging: false,
				error: action.payload,
			};
		case UserActionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				isUserLogging: false,
				error: null,
			};
		default:
			return state;
	}
};

export default userReducer;
