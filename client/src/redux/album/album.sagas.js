import { all, call, takeEvery, put, select } from "redux-saga/effects";

import axios from "axios";

import * as selectors from "../root-reducer";
import * as actions from "./album.actions";
import * as types from "./album.types";

const ALBUM_API_ROUTE = "http://localhost:3000/albums";

export function fetchAlbumsFromApi() {
  return axios.get(ALBUM_API_ROUTE);
}

function* fetchAlbums(action) {
  try {
    const isAuthenticated = yield select(selectors.isAuthenticated);
    if (isAuthenticated) {
      const response = yield fetchAlbumsFromApi();

      if (response.status === 200) {
        console.log("Response was: ", response.data);

        let entities = {};
        let order = [];

        const data = response.data;

        yield data.forEach((album) => {
          const id = album.albumid;
          entities = { ...entities, [id]: album };
          order = [...order, id];
        });

        yield put(actions.completeFetchingAlbums(entities, order));
      } else {
        actions.failFetchingAlbums("Bad request from server...");
      }
    } else {
      actions.failFetchingAlbums("You are not authenticated...");
    }
  } catch (error) {
    console.log(error);
    yield put(
      actions.failFetchingAlbums(error ? error : "Something went wrong...")
    );
  }
}


export function* watchFetchAlbums() {
  yield takeEvery(types.ALBUMS_FETCH_STARTED, fetchAlbums);
}

export function* albumSagas() {
  yield all([call(watchFetchAlbums)]);
}
