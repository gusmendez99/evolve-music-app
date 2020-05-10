import { all, call, takeEvery, put, select } from "redux-saga/effects";

import axios from "axios";

import * as selectors from "../root-reducer";
import * as actions from "./track.actions";
import * as types from "./track.types";

const TRACK_API_ROUTE = "http://localhost:3000/tracks";

export function fetchTracksFromApi() {
  return axios.get(TRACK_API_ROUTE);
}

function* fetchTracks(action) {
  try {
    const isAuthenticated = yield select(selectors.isAuthenticated);
    if (isAuthenticated) {
      const response = yield fetchTracksFromApi();

      if (response.status === 200) {
        console.log("Response was: ", response.data);

        let entities = {};
        let order = [];

        const data = response.data;

        yield data.forEach((track) => {
          const id = track.trackid;
          entities = { ...entities, [id]: track };
          order = [...order, id];
        });

        yield put(actions.completeFetchingTracks(entities, order));
      } else {
        actions.failFetchingTracks("Bad request from server...");
      }
    } else {
      actions.failFetchingTracks("You are not authenticated...");
    }
  } catch (error) {
    console.log(error);
    yield put(
      actions.failFetchingTracks(error ? error : "Something went wrong...")
    );
  }
}


export function* watchFetchTracks() {
  yield takeEvery(types.TRACKS_FETCH_STARTED, fetchTracks);
}

export function* trackSagas() {
  yield all([call(watchFetchTracks)]);
}
