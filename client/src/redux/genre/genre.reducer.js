import union from 'lodash/union';
import { combineReducers } from "redux";

import * as types from "./genre.types";

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.GENRES_FETCH_COMPLETED: {
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
    case types.GENRES_FETCH_COMPLETED: {
      return union(...state, action.payload.order)
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.GENRES_FETCH_STARTED: {
      return true;
    }
    case types.GENRES_FETCH_COMPLETED: {
      return false;
    }
    case types.GENRES_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case types.GENRES_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.GENRES_FETCH_STARTED: {
      return null;
    }
    case types.GENRES_FETCH_COMPLETED: {
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

export const getGenre = (state, id) => state.byId[id];
export const getGenres = (state) =>  state.order.map((id) => getGenre(state, id));
export const isFetchingGenres = (state) => state.isFetching;
export const getFetchingGenresError = (state) => state.error;
