import * as types from "./mediatype.types";

// Get all mediatypes
export const startFetchingMediaTypes = () => ({
  type: types.MEDIATYPES_FETCH_STARTED,
});

export const completeFetchingMediaTypes = (entities, order) => ({
  type: types.MEDIATYPES_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingMediaTypes = (error) => ({
  type: types.MEDIATYPES_FETCH_FAILED,
  payload: {
    error,
  },
});

