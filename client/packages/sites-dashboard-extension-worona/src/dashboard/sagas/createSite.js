import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { CREATING_SITE } from '../messages';
import * as actions from '../actions';
import * as libs from '../libs';
import * as types from '../types';
import * as deps from '../deps';

export function* createSiteSaga(action) {
  const { name, url, _id } = action;
  yield deps.sagaHelpers.waitForConnectionEstablished();
  try {
    yield put(actions.createSiteStatusChanged(CREATING_SITE));
    const siteId = yield call(libs.createSite, { name, url, _id });
    yield put(actions.createSiteSucceed(siteId));
    const nextURL = `/check-site/${siteId}`;
    yield call(deps.libs.push, nextURL);
  } catch (error) {
    yield put(actions.createSiteFailed(error));
  }
}

export function* createSiteWatcher() {
  yield* takeEvery(types.CREATE_SITE_REQUESTED, createSiteSaga);
}
