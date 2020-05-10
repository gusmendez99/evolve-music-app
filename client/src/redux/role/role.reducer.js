import union from 'lodash/union'
import { combineReducers } from "redux";

import * as types from "./role.types";

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.ROLES_FETCH_COMPLETED: {
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

    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch (action.type) {
    case types.ROLES_FETCH_COMPLETED: {
      return union(...state, action.payload.order);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.ROLES_FETCH_STARTED: {
      return true;
    }
    case types.ROLES_FETCH_COMPLETED: {
      return false;
    }
    case types.ROLES_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.ROLES_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.ROLES_FETCH_STARTED: {
      return null;
    }
    case types.ROLES_FETCH_COMPLETED: {
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

export const getRole = (state, id) => state.byId[id];
export const getRoles = (state) =>  state.order.map((id) => getRole(state, id));
export const isFetchingRoles = (state) => state.isFetching;
export const getFetchingRolesError = (state) => state.error;