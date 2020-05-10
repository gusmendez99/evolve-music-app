import * as types from "./artist.types";

// Get all artists
export const startFetchingArtists = () => ({
  type: types.ARTISTS_FETCH_STARTED,
});

export const completeFetchingArtists = (entities, order) => ({
  type: types.ARTISTS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingArtists = (error) => ({
  type: types.ARTISTS_FETCH_FAILED,
  payload: {
    error,
  },
});

