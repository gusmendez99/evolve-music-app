import * as types from "./cart.types";

export const addTrackToCart = (track) => ({
    type: types.TRACK_ADDED_TO_CART,
    payload: track
  });

export const removeTrackFromCart = (trackid) => ({
    type: types.TRACK_REMOVED_FROM_CART,
    payload: {
      trackid
    }
  });
export const modifyQuantity = (trackid, quantity) => ({
  type: types.TRACK_QUANTITY_MODIFIED,
  payload: {
    trackid,
    quantity
  }
});
export const startCheckout = () => ({
  type: types.CHECKOUT_STARTED,
});

export const completeCheckout = () => ({
    type: types.CHECKOUT_COMPLETED,
});

export const failCheckout = (error) => ({
    type: types.CHECKOUT_FAILED,
    payload: {
      error,
    },
});


