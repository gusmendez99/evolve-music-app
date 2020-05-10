import union from 'lodash/union';
import { combineReducers } from "redux";

import * as types from "./album.types";

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.ALBUMS_FETCH_COMPLETED: {
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
    case types.ALBUMS_FETCH_COMPLETED: {
      return union(...state, action.payload.order);
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.ALBUMS_FETCH_STARTED: {
      return true;
    }
    case types.ALBUMS_FETCH_COMPLETED: {
      return false;
    }
    case types.ALBUMS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.ALBUMS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.ALBUMS_FETCH_STARTED: {
      return null;
    }
    case types.ALBUMS_FETCH_COMPLETED: {
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

export const getAlbum = (state, id) => state.byId[id];
export const getAlbums = (state) =>  state.order.map((id) => getAlbum(state, id));
export const isFetchingAlbums = (state) => state.isFetching;
export const getFetchingAlbumsError = (state) => state.error;
