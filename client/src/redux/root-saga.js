import { all, call } from 'redux-saga/effects';

import { authSagas } from './auth/auth.sagas';
//import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
  yield all([call(authSagas)]);
}