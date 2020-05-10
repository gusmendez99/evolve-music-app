
import union from 'lodash/union';
import { combineReducers } from "redux";

import * as types from "./artist.types";

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.ARTISTS_FETCH_COMPLETED: {
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
    case types.ARTISTS_FETCH_COMPLETED: {
      return union(...state, action.payload.order)
      //return [...state, ...action.payload.order];
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.ARTISTS_FETCH_STARTED: {
      return true;
    }
    case types.ARTISTS_FETCH_COMPLETED: {
      return false;
    }
    case types.ARTISTS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.ARTISTS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.ARTISTS_FETCH_STARTED: {
      return null;
    }
    case types.ARTISTS_FETCH_COMPLETED: {
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

export const getArtist = (state, id) => state.byId[id];
export const getArtists = (state) =>  state.order.map((id) => getArtist(state, id));
export const isFetchingArtists = (state) => state.isFetching;
export const getFetchingArtistsError = (state) => state.error;
