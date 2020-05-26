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
export const startCheckout = (checkoutData) => ({
  type: types.CHECKOUT_STARTED,
  payload: { checkoutData }
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

export const startCheckoutSimulation = (checkoutData, cartTracks) => ({
  type: types.CHECKOUT_SIMULATION_STARTED,
  payload: { 
    checkoutData,
    cartTracks
   }
});

export const completeCheckoutSimulation = () => ({
  type: types.CHECKOUT_SIMULATION_COMPLETED,
});

export const failCheckoutSimulation = (error) => ({
  type: types.CHECKOUT_SIMULATION_FAILED,
  payload: {
    error,
  },
});

export const startUploadingSimulatedInvoiceLine = (tracks, invoiceid, invoicedata) => ({
  type: types.UPLOAD_SIMULATED_INVOICE_LINE_STARTED,
  payload: {
    tracks,
    invoiceid,
    invoicedata
  }
});

export const completeUploadingSimulatedInvoiceLine = (statusCode) => ({
  type: types.UPLOAD_SIMULATED_INVOICE_LINE_COMPLETED,
  payload: statusCode
});

export const failUploadingSimulatedInvoiceLine = (error) => ({
  type: types.UPLOAD_SIMULATED_INVOICE_LINE_FAILED,
  payload: error,
});

export const startUploadingInvoiceLine = (tracks, invoiceid, invoicedata) => ({
  type: types.UPLOAD_INVOICELINE_STARTED,
  payload: {
    tracks,
    invoiceid,
    invoicedata
  }
});

export const completeUploadingInvoiceLine = (statusCode) => ({
  type: types.UPLOAD_INVOICELINE_COMPLETED,
  payload: statusCode
});

export const failUploadingInvoiceLine = (error) => ({
  type: types.UPLOAD_INVOICELINE_FAILED,
  payload: error,
});

