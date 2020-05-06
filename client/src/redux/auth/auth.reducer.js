import {
  SIGNIN_USER_STARTED,
  SIGNIN_USER_FAILED,
  SIGNIN_USER_COMPLETED,
  SIGNUP_USER_STARTED,
  SIGNUP_USER_FAILED,
  SIGNUP_USER_COMPLETED,
  SIGNOUT_USER_COMPLETED,
} from './auth.types';
import { combineReducers } from 'redux';
import store from 'store';

//Util
import * as permissionUtils from '../../utils/permission.utils'

const INIT_STATE = {
  user: store.get('account_user'),
  permissions: store.get('permissions')
};

const account = (state = INIT_STATE, action) => {

  switch (action.type) {

      case SIGNUP_USER_COMPLETED: {
          const permissionsByRole = permissionUtils.getPermissionsByRole(
            action.payload.permissions, action.payload.user.rolename) 

          store.set('account_user', action.payload.user);
          store.set('permissions', permissionsByRole);
          return {
              ...state,
              user: action.payload.user,
              permissions: permissionsByRole
          }
      }

      case SIGNIN_USER_COMPLETED: {
        const permissionsByRole = permissionUtils.getPermissionsByRole(
          action.payload.permissions, action.payload.user.rolename) 

        store.set('account_user', action.payload.user);
        store.set('permissions', permissionsByRole);
        return {
            ...state,
            user: action.payload.user,
            permissions: permissionsByRole
        }
      }
      
      case SIGNOUT_USER_COMPLETED: {
          store.remove('account_user');
          store.remove('permissions');
          return {
              ...state,
              user: null,
              permissions: null
          }
      }

      default:
          return state;
  }
}


const isAuthenticating = (state = false, action) => {
  switch(action.type) {
    case SIGNIN_USER_STARTED: 
    case SIGNUP_USER_STARTED: {
      return true;
    }
    case SIGNIN_USER_COMPLETED:
    case SIGNUP_USER_COMPLETED:
    case SIGNOUT_USER_COMPLETED: {
      return false;
    }
    case SIGNUP_USER_FAILED: 
    case SIGNIN_USER_FAILED: {
      return false;
    }
  }

  return state;
};

const error = (state = null, action) => {
  switch(action.type) {
    case SIGNIN_USER_STARTED:
    case SIGNUP_USER_STARTED: {
      return null;
    }
    case SIGNIN_USER_COMPLETED: 
    case SIGNUP_USER_COMPLETED:
    case SIGNOUT_USER_COMPLETED: {
      return null;
    }
    case SIGNIN_USER_FAILED:
    case SIGNUP_USER_FAILED: {
      return action.payload.error;
    }
  }

  return state;
};

const auth = combineReducers({
  account,
  isAuthenticating,
  error,
});


export default auth;

export const getIsAuthenticating = state => state.isAuthenticating;
export const getAuthenticatingError = state => state.error;
export const getAuthUser = state => state.account ? state.account.user : null;
export const getAuthUserPermissions = state => state.account ? state.account.permissions : null;
export const getAuthUsername = state => state.account ? state.account.user.username : null;
