import {
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
} from './user.types';

import store from 'store';

const INIT_STATE = {
  authUser: store.get('auth_user'),
};

const user = (state = INIT_STATE, action) => {

  switch (action.type) {

      case SIGNUP_USER_SUCCESS: {
          store.set('auth_user', action.payload.authUser);
          store.set('permissions', action.payload.permissions);
          return {
              ...state,
              authUser: action.payload.authUser,
              permissions: action.payload.permissions
          }
      }

      case SIGNIN_USER_SUCCESS: {
        store.set('auth_user', action.payload.authUser);
        store.set('permissions', action.payload.permissions);
        return {
            ...state,
            authUser: action.payload.authUser,
            permissions: action.payload.permissions
        }
      }
      
      case SIGNOUT_USER_SUCCESS: {
          store.remove('auth_user');
          store.remove('permissions');
          return {
              ...state,
              authUser: null,
              permissions: null
          }
      }

      default:
          return state;
  }
}

export default user;
