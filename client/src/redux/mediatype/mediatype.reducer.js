import union from 'lodash/union';
import { combineReducers } from "redux";

import * as types from "./mediatype.types";

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.MEDIATYPES_FETCH_COMPLETED: {
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
    case types.MEDIATYPES_FETCH_COMPLETED: {
      return union(...state, action.payload.order);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.MEDIATYPES_FETCH_STARTED: {
      return true;
    }
    case types.MEDIATYPES_FETCH_COMPLETED: {
      return false;
    }
    case types.MEDIATYPES_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.MEDIATYPES_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.MEDIATYPES_FETCH_STARTED: {
      return null;
    }
    case types.MEDIATYPES_FETCH_COMPLETED: {
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

export const getMediaType = (state, id) => state.byId[id];
export const getMediaTypes = (state) =>  state.order.map((id) => getMediaType(state, id));
export const isFetchingMediaTypes = (state) => state.isFetching;
export const getFetchingMediaTypesError = (state) => state.error;
