import * as types from "./role.types";

// Get all users
export const startFetchingRoles = () => ({
  type: types.ROLES_FETCH_STARTED,
});

export const completeFetchingRoles = (entities, order) => ({
  type: types.ROLES_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});

export const failFetchingRoles = (error) => ({
  type: types.ROLES_FETCH_FAILED,
  payload: {
    error,
  },
});