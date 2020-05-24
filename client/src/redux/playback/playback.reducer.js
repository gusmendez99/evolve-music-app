import { combineReducers } from 'redux';

import * as types from './playback.types';

const isExecuting = (state = false, action) => {
    switch (action.type) {
        case types.ADD_PLAYBACK_STARTED: {
            return true;
        }
        case types.ADD_PLAYBACK_FAILED:
        case types.ADD_PLAYBACK_COMPLETED: {
            return false;
        }
        default: {
            return state;
        }
    }
};
const error = (state = null, action) => {
    switch (action.type) {
        case types.ADD_PLAYBACK_FAILED: {
            return action.payload.error;
        }
        case types.ADD_PLAYBACK_STARTED:
        case types.ADD_PLAYBACK_COMPLETED: {
            return null;
        }
        default: {
            return state;
        }
    }
};

export default combineReducers({
    isExecuting,
    error,
})

export const isExecutingAddPlaybackRecord = (state) => state.isExecuting;
export const getAddPlaybackRecordError = (state) => state.error;