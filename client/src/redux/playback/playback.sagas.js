import {
    call,
    takeEvery,
	put,
	all
} from 'redux-saga/effects';

import * as actions from "./playback.actions";
import * as types from "./playback.types";

const PLAYBACK_API_ROUTE = "http://localhost:3000/playback";

function* addPlaybackRecord(action) {
    //const { idUser, idTrack} = action.payload;
    
	try {
	  const response = yield call(
		fetch,
		`${PLAYBACK_API_ROUTE}`,
			{
			method: 'POST',
			body: JSON.stringify(action.payload),
			headers:{
				'Content-Type': 'application/json',
			},
		}
		);
		if (response.status === 201) {
			yield put(actions.completeAddingPlaybackRecord())
		}
	} catch(error) {
	  yield put(actions.failAddingPlaybackRecord(error.message))
	}
}

export function* watchAddPlaybackRecord() {
	yield takeEvery(types.ADD_PLAYBACK_STARTED, addPlaybackRecord);
}

export function* playbackSagas() {
	yield all([call(watchAddPlaybackRecord)]);
  }
  