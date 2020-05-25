import {
	call,
	takeEvery,
	put,
	select
} from 'redux-saga/effects';

import download from 'downloadjs';

import * as selectors from "../root-reducer";
import * as actions from "./cart.actions";
import * as types from "./cart.types";

const INVOICE_API_ROUTE = "http://localhost:3000/invoice/new";
const INVOICE_LINE_API_ROUTE = "http://localhost:3000/invoiceline";


function* uploadInvoiceLine(action) {
	const { tracks, invoiceid, invoicedata } = action.payload;
	const invoiceLines = tracks.map(track => {
		return [invoiceid, track.trackid, track.unitprice, track.quantity]
	});

	const data = {
		invoiceLines,
		invoicedata
	}

	try {
		const response = yield call(
			fetch,
			`${INVOICE_LINE_API_ROUTE}`,
			{
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		const fileBlob = yield response.blob();
		download(fileBlob);

		if (response.status === 200) {
			yield put(actions.completeUploadingInvoiceLine(response.status))
			yield put(actions.completeCheckout())
		}
	} catch (error) {
		yield put(actions.failUploadingInvoiceLine(error.message))
	}
}

function* checkout(action) {
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
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		if (response.status === 201) {
			const data = yield response.json()
			const items = cartTracks.map(track => {
				return {item: track.trackid, description: track.name, quantity: 1, amount: track.unitprice }
			})
			yield put(actions.startUploadingInvoiceLine(cartTracks, data.invoiceid, {...checkoutData, ...authUser, items}))
		} else {
			yield put(actions.failCheckout("Bad request from server..."));
		}
	} catch (error) {
		yield put(actions.failCheckout(error.message));
	}
};


export function* watchCheckoutStarted() {
	yield takeEvery(types.CHECKOUT_STARTED, checkout);
}

export function* watchUploadInvoiceline() {
	yield takeEvery(types.UPLOAD_INVOICELINE_STARTED, uploadInvoiceLine);
}