import * as types from './playback.types'

export const startAddingPlaybackRecord = (idUser, idTrack) => ({
    type: types.ADD_PLAYBACK_STARTED,
    payload: { idUser, idTrack }
});

export const completeAddingPlaybackRecord = () => ({
    type: types.ADD_PLAYBACK_COMPLETED,
});

export const failAddingPlaybackRecord = (error) => ({
    type: types.ADD_PLAYBACK_FAILED,
    payload: {
        error,
    },
});