import * as types from "./track.types";

// Get all tracks
export const startFetchingTracks = () => ({
  type: types.TRACKS_FETCH_STARTED,
});

export const completeFetchingTracks = (entities, order) => ({
  type: types.TRACKS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingTracks = (error) => ({
  type: types.TRACKS_FETCH_FAILED,
  payload: {
    error,
  },
});

