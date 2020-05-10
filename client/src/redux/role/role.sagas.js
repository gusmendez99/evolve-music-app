import { all, call, takeEvery, put, select } from "redux-saga/effects";

import axios from "axios";

import * as selectors from "../root-reducer";
import * as actions from "./role.actions";
import * as types from "./role.types";

const ROLE_API_ROUTE = "http://localhost:3000/roles";

export function fetchRolesFromApi() {
  return axios.get(ROLE_API_ROUTE);
}

function* fetchRoles(action) {
  try {
    const isAuthenticated = yield select(selectors.isAuthenticated);
    if (isAuthenticated) {
      const response = yield fetchRolesFromApi();

      if (response.status === 200) {
        console.log("Response was>", response.data);

        let entities = {};
        let order = [];

        const data = response.data;

        yield data.forEach((role) => {
          const id = role.roleid
          entities = { ...entities, [id]: role };
          order = [...order, id];
        });

        yield put(actions.completeFetchingRoles(entities, order));
      } else {
        actions.failFetchingRoles("Bad request from server...");
      }
    } else {
      actions.failFetchingRoles("You are not authenticated...");
    }
  } catch (error) {
    console.log(error);
    yield put(
      actions.failFetchingRoles(error ? error : "Something went wrong...")
    );
  }
}

export function* watchFetchOwners() {
  yield takeEvery(types.ROLES_FETCH_STARTED, fetchRoles);
}

export function* roleSagas() {
  yield all([call(watchFetchOwners)]);
}
