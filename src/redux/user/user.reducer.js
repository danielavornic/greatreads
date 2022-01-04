import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  username: null,
  isUserLogging: false,
  userError: null,
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
        currentUser: action.payload.currentUser,
        username: action.payload.username,
        isUserLogging: false,
        userError: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        userError: action.payload,
        isUserLogging: false,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        username: null,
        isUserLogging: false,
        userError: null,
      };
    default:
      return state;
  }
};

export default userReducer;
