import {
  SIGNIN_USER_STARTED,
  SIGNIN_USER_FAILED,
  SIGNIN_USER_COMPLETED,
  SIGNUP_USER_STARTED,
  SIGNUP_USER_FAILED,
  SIGNUP_USER_COMPLETED,
  SIGNOUT_USER_COMPLETED,
} from './auth.types';

export const startSignIn = (email, password) => ({
  type: SIGNIN_USER_STARTED,
  payload: { email, password },
});

export const completeSignIn = (user, permissions) => ({
  type: SIGNIN_USER_COMPLETED,
  payload: { user, permissions }
});

export const failSignIn = error => ({
  type: SIGNIN_USER_FAILED,
  payload: { error },
});



export const startSignUp = (email, password) => ({
  type: SIGNUP_USER_STARTED,
  payload: { email, password },
});

export const completeSignUp = (authUser, permissions) => ({
  type: SIGNUP_USER_COMPLETED,
  payload: { authUser, permissions }
});

export const failSignUp = error => ({
  type: SIGNUP_USER_FAILED,
  payload: { error },
});


export const completeSignOut = () => ({
  type: SIGNOUT_USER_COMPLETED,
});
