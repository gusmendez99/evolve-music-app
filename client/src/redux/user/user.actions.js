import * as types from "./user.types";

// Get all users
export const startFetchingUsers = () => ({
  type: types.USERS_FETCH_STARTED,
});

export const completeFetchingUsers = (entities, order) => ({
  type: types.USERS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingUsers = (error) => ({
  type: types.USERS_FETCH_FAILED,
  payload: {
    error,
  },
});

