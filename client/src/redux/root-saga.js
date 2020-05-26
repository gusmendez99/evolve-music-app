import { all, call } from 'redux-saga/effects';

import { authSagas } from './auth/auth.sagas';
import { userSagas } from './user/user.sagas';
import { roleSagas } from './role/role.sagas';
import { artistSagas } from './artist/artist.sagas';
import { albumSagas } from './album/album.sagas';
import { genreSagas } from './genre/genre.sagas';
import { mediaTypesSagas } from './mediatype/mediatype.sagas';
import { trackSagas } from './track/track.sagas';
import { watchCheckoutStarted, watchUploadInvoiceline, watchCheckoutSimulationStarted, watchUploadSimulatedInvoiceline } from './cart/cart.sagas';
import { playbackSagas } from './playback/playback.sagas';

export default function* rootSaga() {
  yield all([call(authSagas), call(userSagas), call(roleSagas), call(artistSagas), call(genreSagas), call(mediaTypesSagas), call(albumSagas), call(trackSagas), call(watchCheckoutStarted), call(watchUploadInvoiceline), call(playbackSagas), call(watchCheckoutSimulationStarted), call(watchUploadSimulatedInvoiceline)]);
}