import { all, call, takeEvery, put, select } from "redux-saga/effects";

import axios from "axios";

import * as selectors from "../root-reducer";
import * as actions from "./user.actions";
import * as types from "./user.types";
import { v4 as uuid } from "uuid";

const USER_API_ROUTE = "http://localhost:3000/users";

export function fetchUsersFromApi() {
  return axios.get(USER_API_ROUTE);
}

export function addUserFromApi(user) {
  return axios.post(USER_API_ROUTE, user);
}

export function removeUserFromApi(userId) {
  return axios.delete(`${USER_API_ROUTE}/${userId}`);
}

export function updateUserFromApi(userId, user) {
  return axios.put(`${USER_API_ROUTE}/${userId}`, user);
}

function* fetchUsers(action) {
  try {
    const isAuthenticated = yield select(selectors.isAuthenticated);
    if (isAuthenticated) {
      const response = yield fetchUsersFromApi();

      if (response.status === 200) {
        console.log("Response was>", response.data);

        let entities = {};
        let order = [];

        const data = response.data;

        yield data.forEach((user) => {
          const id = uuid()
          entities = { ...entities, [id]: user };
          order = [...order, id];
        });

        yield put(actions.completeFetchingUsers(entities, order));
      } else {
        throw "Bad request from server...";
      }
    } else {
      throw "You are not authenticated...";
    }
  } catch (error) {
    console.log(error);
    yield put(
      actions.failFetchingUsers(error ? error : "Something went wrong...")
    );
  }
}

export function* watchFetchOwners() {
  yield takeEvery(types.USERS_FETCH_STARTED, fetchUsers);
}

export function* userSagas() {
  yield all([call(watchFetchOwners)]);
}
