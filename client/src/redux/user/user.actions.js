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

// Create one user
export const startAddingUser = (id, user) => ({
  type: types.USER_ADD_STARTED,
  payload: {
    id,
    user,
  },
});

export const completeAddingUser = (oldId, user) => ({
  type: types.USER_ADD_COMPLETED,
  payload: {
    oldId,
    user,
  },
});

export const failAddingUser = (oldId, error) => ({
  type: types.USER_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

//Update one user
export const startUpdatingUser = (id, user) => ({
    type: types.USER_UPDATE_STARTED,
    payload: {
      id,
      user
    },
  });
  
  export const completeUpdatingUser = (oldId, user) => ({
    type: types.USER_UPDATE_COMPLETED,
    payload: {
        oldId,
        user,
      },
  });
  
  export const failUpdatingUser = (oldId, error) => ({
    type: types.USER_UPDATE_FAILED,
    payload: {
      oldId,
      error,
    },
  });

//Remove one user
export const startRemovingUser = (id) => ({
  type: types.USER_REMOVE_STARTED,
  payload: {
    id,
  },
});

export const completeRemovingUser = () => ({
  type: types.USER_REMOVE_COMPLETED,
});

export const failRemovingUser = (id, error) => ({
  type: types.USER_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});
