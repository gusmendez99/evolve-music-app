import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import * as actions from "./auth.actions";
import * as types from "./auth.types";

const LOGIN_API_ROUTE = "http://localhost:3000/login";

export function signInFromApi(credentials) {
  return axios.post(LOGIN_API_ROUTE, credentials);
}

export function fetchUserPermissionsFromApi(roleId) {
  return axios.get(`http://localhost:3000/roles/${roleId}/permissions`);
}

export function* signIn(action) {
  try {
    const userResponse = yield call(signInFromApi, action.payload);
    if (userResponse.status == 200) {
      if (userResponse.data[0]) {
        const userAuth = userResponse.data[0];
        const permissionsResponse = yield call(
          fetchUserPermissionsFromApi,
          userAuth.roleid
        );
        if (permissionsResponse.status == 200) {
          yield put(actions.completeSignIn(userAuth, permissionsResponse.data));
        } else {
          actions.failSignIn("Permissions were not fetched successfully");
        }
      } else {
        actions.failSignIn("User doesnt exist on database...");
      }
    } else {
      actions.failSignIn("You are not authenticated...");
    }
  } catch (error) {
    console.log(error);
    yield put(actions.failSignIn(error));
  }
}

export function* watchSignIn() {
  yield takeLatest(types.SIGNIN_USER_STARTED, signIn);
}

export function* authSagas() {
  yield all([call(watchSignIn)]);
}
