import * as types from "./album.types";

// Get all albums
export const startFetchingAlbums = () => ({
  type: types.ALBUMS_FETCH_STARTED,
});

export const completeFetchingAlbums = (entities, order) => ({
  type: types.ALBUMS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingAlbums = (error) => ({
  type: types.ALBUMS_FETCH_FAILED,
  payload: {
    error,
  },
});

