import { all, call, takeEvery, put, select } from "redux-saga/effects";

import axios from "axios";

import * as selectors from "../root-reducer";
import * as actions from "./user.actions";
import * as types from "./user.types";

const USER_API_ROUTE = "http://localhost:3000/users";

export function fetchUsersFromApi() {
  return axios.get(USER_API_ROUTE);
}

function* fetchUsers(action) {
  try {
    const isAuthenticated = yield select(selectors.isAuthenticated);
    if (isAuthenticated) {
      const response = yield fetchUsersFromApi();

      if (response.status === 200) {
        console.log("Response was: ", response.data);

        let entities = {};
        let order = [];

        const data = response.data;

        yield data.forEach((user) => {
          const id = user.userid;
          entities = { ...entities, [id]: user };
          order = [...order, id];
        });

        yield put(actions.completeFetchingUsers(entities, order));
      } else {
        actions.failFetchingUsers("Bad request from server...");
      }
    } else {
      actions.failFetchingUsers("You are not authenticated...");
    }
  } catch (error) {
    console.log(error);
    yield put(
      actions.failFetchingUsers(error ? error : "Something went wrong...")
    );
  }
}


export function* watchFetchUsers() {
  yield takeEvery(types.USERS_FETCH_STARTED, fetchUsers);
}

export function* userSagas() {
  yield all([call(watchFetchUsers)]);
}
