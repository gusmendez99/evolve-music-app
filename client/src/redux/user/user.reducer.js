import {
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
} from './user.types';
import store from 'store';

//Util
import * as permissionUtils from '../../utils/permission.utils'

const INIT_STATE = {
  authUser: store.get('auth_user'),
  permissions: store.get('permissions')
};

const user = (state = INIT_STATE, action) => {

  switch (action.type) {

      case SIGNUP_USER_SUCCESS: {
          const permissionsByRole = permissionUtils.getPermissionsByRole(
            action.payload.permissions, action.payload.authUser.rolename) 

          store.set('auth_user', action.payload.authUser);
          store.set('permissions', permissionsByRole);
          return {
              ...state,
              authUser: action.payload.authUser,
              permissions: permissionsByRole
          }
      }

      case SIGNIN_USER_SUCCESS: {
        const permissionsByRole = permissionUtils.getPermissionsByRole(
          action.payload.permissions, action.payload.authUser.rolename) 

        store.set('auth_user', action.payload.authUser);
        store.set('permissions', permissionsByRole);
        return {
            ...state,
            authUser: action.payload.authUser,
            permissions: permissionsByRole
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
