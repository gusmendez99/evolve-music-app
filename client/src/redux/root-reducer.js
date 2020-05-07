import { combineReducers } from 'redux';

import auth, * as authSelectors from './auth/auth.reducer';
import user, * as userSelectors from './user/user.reducer';

const reducer = combineReducers({
    auth,
    user
})

export default reducer;

export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const getAuthUser = state => authSelectors.getAuthUser(state.auth);
export const getAuthUserPermissions = state => authSelectors.getAuthUserPermissions(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const isAuthenticated = state => getAuthUser(state) != null;

export const getUser = (state, id) => userSelectors.getUser(state.user, id);
export const getUsers = state => userSelectors.getUsers(state.user);
export const isFetchingUsers = state => userSelectors.isFetchingUsers(state.user);
export const getFetchingUsersError = state => userSelectors.getFetchingUsersError(state.user);