import omit from "lodash/omit";
import { combineReducers } from "redux";

import * as types from "./user.types";

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.USERS_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = { ...state };
      order.forEach((id) => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });

      return newState;
    }
    case types.USER_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.USER_ADD_COMPLETED: {
      const { oldId, user } = action.payload;
      const newState = omit(state, oldId);
      newState[user.id] = {
        ...user,
        isConfirmed: true,
      };
      return newState;
    }
    case types.USER_REMOVE_STARTED: {
      return omit(state, action.payload.id);
    }

    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch (action.type) {
    case types.USERS_FETCH_COMPLETED: {
      return [...state, ...action.payload.order];
    }
    case types.USER_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.USER_ADD_COMPLETED: {
      const { oldId, user } = action.payload;
      return state.map((id) => (id === oldId ? user.id : id));
    }
    case types.USER_REMOVE_STARTED: {
      return state.filter((id) => id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.USERS_FETCH_STARTED: {
      return true;
    }
    case types.USERS_FETCH_COMPLETED: {
      return false;
    }
    case types.USERS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.USERS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.USERS_FETCH_STARTED: {
      return null;
    }
    case types.USERS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  byId,
  order,
  isFetching,
  error,
});

export const getUser = (state, id) => state.byId[id];
export const getUsers = (state) =>  state.order.map((id) => getUser(state, id));
export const isFetchingUsers = (state) => state.isFetching;
export const getFetchingUsersError = (state) => state.error;
