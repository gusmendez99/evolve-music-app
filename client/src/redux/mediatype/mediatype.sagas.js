import { all, call, takeEvery, put, select } from "redux-saga/effects";

import axios from "axios";

import * as selectors from "../root-reducer";
import * as actions from "./mediatype.actions";
import * as types from "./mediatype.types";

const MEDIATYPE_API_ROUTE = "http://localhost:3000/mediatypes";

export function fetchMediaTypesFromApi() {
  return axios.get(MEDIATYPE_API_ROUTE);
}

function* fetchMediaTypes(action) {
  try {
    const isAuthenticated = yield select(selectors.isAuthenticated);
    if (isAuthenticated) {
      const response = yield fetchMediaTypesFromApi();

      if (response.status === 200) {
        console.log("Response was: ", response.data);

        let entities = {};
        let order = [];

        const data = response.data;

        yield data.forEach((mediatype) => {
          const id = mediatype.mediatypeid;
          entities = { ...entities, [id]: mediatype };
          order = [...order, id];
        });

        yield put(actions.completeFetchingMediaTypes(entities, order));
      } else {
        actions.failFetchingMediaTypes("Bad request from server...");
      }
    } else {
      actions.failFetchingMediaTypes("You are not authenticated...");
    }
  } catch (error) {
    console.log(error);
    yield put(
      actions.failFetchingMediaTypes(error ? error : "Something went wrong...")
    );
  }
}


export function* watchFetchMediaTypes() {
  yield takeEvery(types.MEDIATYPES_FETCH_STARTED, fetchMediaTypes);
}

export function* mediaTypesSagas() {
  yield all([call(watchFetchMediaTypes)]);
}
