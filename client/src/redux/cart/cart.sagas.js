import {
    call,
    takeEvery,
    put,
	select,
	all
} from 'redux-saga/effects';

import axios from "axios";

import * as selectors from "../root-reducer";
import * as actions from "./cart.actions";
import * as types from "./cart.types";

const INVOICE_API_ROUTE = "http://localhost:3000/invoice/new";
const INVOICE_LINE_API_ROUTE = "http://localhost:3000/invoiceline";

  
function* uploadInvoiceLine(track, invoiceid) {
	const invoiceLine = {
		invoiceid: invoiceid,
		trackid: track.trackid,
		unitprice: track.unitprice,
		quantity: track.quantity,
	}
	try {
	  const response = yield call(
		fetch,
		`${INVOICE_LINE_API_ROUTE}`,
			{
			method: 'POST',
			body: JSON.stringify(invoiceLine),
			headers:{
				'Content-Type': 'application/json',
			},
		}
		);
		const data = yield response.json()
	  	console.log(data)
	} catch(err) {
	  console.log(err.message)
	}
}

function* checkout(action){
	const authUser = yield select(selectors.getAuthUser);
	const { checkoutData } = action.payload;
	const cartTracks = yield select(selectors.getCartTracks)
	checkoutData["userid"] = authUser.userid; 
    try {
        const response = yield call(
			fetch,
			`${INVOICE_API_ROUTE}`,
				{
				method: 'POST',
				body: JSON.stringify(checkoutData),
				headers:{
					'Content-Type': 'application/json',
				},
			}
		);
		if (response.status === 201) {
			const data = yield response.json()	
			const results = yield all (cartTracks.map(cartTrack => {
				return call(uploadInvoiceLine,cartTrack,data.invoiceid)
			}))
			yield put(actions.completeCheckout(data.invoiceid))
		} else {
			throw "Bad request from server...";
		}
    } catch (error) {
        yield put(actions.failCheckout(error.message));
    }
};


export function* watchCheckoutStarted() {
	yield takeEvery(types.CHECKOUT_STARTED, checkout);
}

export function* watchUploadInvoiceline(){
	yield takeEvery(types.UPLOAD_INVOICELINE_STARTED, uploadInvoiceLine);
}





