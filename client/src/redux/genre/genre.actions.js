import * as types from "./genre.types";

// Get all genres
export const startFetchingGenres = () => ({
  type: types.GENRES_FETCH_STARTED,
});

export const completeFetchingGenres = (entities, order) => ({
  type: types.GENRES_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingGenres = (error) => ({
  type: types.GENRES_FETCH_FAILED,
  payload: {
    error,
  },
});

