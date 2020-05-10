import { all, call, takeEvery, put, select } from "redux-saga/effects";

import axios from "axios";

import * as selectors from "../root-reducer";
import * as actions from "./artist.actions";
import * as types from "./artist.types";

const ARTIST_API_ROUTE = "http://localhost:3000/artists";

export function fetchArtistsFromApi() {
  return axios.get(ARTIST_API_ROUTE);
}

function* fetchArtists(action) {
  try {
    const isAuthenticated = yield select(selectors.isAuthenticated);
    if (isAuthenticated) {
      const response = yield fetchArtistsFromApi();

      if (response.status === 200) {
        console.log("Response was: ", response.data);

        let entities = {};
        let order = [];

        const data = response.data;

        yield data.forEach((artist) => {
          const id = artist.artistid;
          entities = { ...entities, [id]: artist };
          order = [...order, id];
        });

        yield put(actions.completeFetchingArtists(entities, order));
      } else {
        actions.failFetchingArtists("Bad request from server...");
      }
    } else {
      actions.failFetchingArtists("You are not authenticated...");
    }
  } catch (error) {
    console.log(error);
    yield put(
      actions.failFetchingArtists(error ? error : "Something went wrong...")
    );
  }
}


export function* watchFetchArtists() {
  yield takeEvery(types.ARTISTS_FETCH_STARTED, fetchArtists);
}

export function* artistSagas() {
  yield all([call(watchFetchArtists)]);
}
