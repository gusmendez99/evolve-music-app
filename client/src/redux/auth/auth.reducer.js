import * as types from './auth.types';
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

      case types.SIGNUP_USER_COMPLETED: {
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

      case types.SIGNIN_USER_COMPLETED: {
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
      
      case types.SIGNOUT_USER_COMPLETED: {
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
    case types.SIGNIN_USER_STARTED: 
    case types.SIGNUP_USER_STARTED: {
      return true;
    }
    case types.SIGNIN_USER_COMPLETED:
    case types.SIGNUP_USER_COMPLETED:
    case types.SIGNOUT_USER_COMPLETED: {
      return false;
    }
    case types.SIGNUP_USER_FAILED: 
    case types.SIGNIN_USER_FAILED: 
    default: {
      return false;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.SIGNIN_USER_STARTED:
    case types.SIGNUP_USER_STARTED: {
      return null;
    }
    case types.SIGNIN_USER_COMPLETED: 
    case types.SIGNUP_USER_COMPLETED:
    case types.SIGNOUT_USER_COMPLETED: {
      return null;
    }
    case types.SIGNIN_USER_FAILED:
    case types.SIGNUP_USER_FAILED: {
      return action.payload.error;
    }
    default:
      return state;
  }
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
