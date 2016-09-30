import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as types from '../types';
import * as actions from '../actions';
import * as deps from '../dependencies';

export function* logoutRequestedSaga() {
  try {
    yield call(deps.libs.logout);
    yield put(actions.logoutSucceed());
  } catch (error) {
    yield put(actions.logoutFailed(error.message));
  }
}

export function* logoutSucceedSaga() {
  // Redirect the user to the home after a successful logout.
  yield put(deps.actions.push('/login'));
}

export default function* logoutSagas() {
  yield [
    takeLatest(types.LOGOUT_REQUESTED, logoutRequestedSaga),
    takeLatest(types.LOGOUT_SUCCEED, logoutSucceedSaga),
  ];
}