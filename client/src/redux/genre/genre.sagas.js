import { all, call, takeEvery, put, select } from "redux-saga/effects";

import axios from "axios";

import * as selectors from "../root-reducer";
import * as actions from "./genre.actions";
import * as types from "./genre.types";

const GENRE_API_ROUTE = "http://localhost:3000/genres";

export function fetchGenresFromApi() {
  return axios.get(GENRE_API_ROUTE);
}

function* fetchGenres(action) {
  try {
    const isAuthenticated = yield select(selectors.isAuthenticated);
    if (isAuthenticated) {
      const response = yield fetchGenresFromApi();

      if (response.status === 200) {
        console.log("Response was: ", response.data);

        let entities = {};
        let order = [];

        const data = response.data;

        yield data.forEach((genre) => {
          const id = genre.genreid;
          entities = { ...entities, [id]: genre };
          order = [...order, id];
        });

        yield put(actions.completeFetchingGenres(entities, order));
      } else {
        actions.failFetchingGenres("Bad request from server...");
      }
    } else {
      actions.failFetchingGenres("You are not authenticated...");
    }
  } catch (error) {
    console.log(error);
    yield put(
      actions.failFetchingGenres(error ? error : "Something went wrong...")
    );
  }
}


export function* watchFetchGenres() {
  yield takeEvery(types.GENRES_FETCH_STARTED, fetchGenres);
}

export function* genreSagas() {
  yield all([call(watchFetchGenres)]);
}
