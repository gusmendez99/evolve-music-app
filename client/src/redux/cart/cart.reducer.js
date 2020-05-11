import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from './cart.types';


const byId = (state = {}, action) => {
    switch(action.type) {
      case types.TRACK_ADDED_TO_CART: {
        return {...state, [action.payload.trackid]: {...action.payload}};
      }
      case types.TRACK_REMOVED_FROM_CART: {
        return omit(state, action.payload.trackid);
      }
      case types.TRACK_QUANTITY_MODIFIED: {
				return {
					...state, [action.payload.trackid]: {...state[action.payload.trackid], ['quantity']: action.payload.quantity}
				};
      }
      case types.CHECKOUT_COMPLETED: {
				return {};
      }
      default: {
        return state;
      }
    }
};

const isExecuting = (state = false, action) => {
    switch(action.type) {
      case types.CHECKOUT_STARTED: {
        return true;
      }
      case types.CHECKOUT_FAILED: {
        return false;
      }
      case types.CHECKOUT_FAILED: {
        return false;
      }
      default: {
        return state;
      }
    }
};
const error = (state = null, action) => {
    switch(action.type) {
      case types.CHECKOUT_FAILED: {
        return action.payload.error;
      }
      case types.CHECKOUT_STARTED: {
        return null;
      }
      case types.CHECKOUT_COMPLETED: {
        return null;
      }
      default: {
        return state;
      }
    }
};

export default combineReducers({
  byId,
  isExecuting,
  error
})

export const getCartTrack = (state, id) => state.byId[id];
export const getCartTracks = (state) =>  Object.values((state.byId));
export const isExecutingCheckout = (state) => state.isExecuting;
export const getCheckoutError = (state) => state.error;
