import { combineReducers } from 'redux';
import * as types from '../types';
import { METEOR_USER_NOT_LOGGED_IN, YOU_ARE_NOT_LOGGED_IN } from '../errors';
import * as deps from '../dependencies';

export const isCreatingSite = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_SITE_REQUESTED:
      return true;
    case types.CREATE_SITE_SUCCEED:
    case types.CREATE_SITE_FAILED:
      return false;
    default:
      return state;
  }
};

export const createSiteStatus = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_SITE_STATUS_CHANGED:
      return action.status;
    case types.CREATE_SITE_SUCCEED:
    case types.CREATE_SITE_FAILED:
      return false;
    default:
      return state;
  }
};

export const createSiteError = (state = false, action) => {
  const { error } = action;
  switch (action.type) {
    case types.CREATE_SITE_FAILED:
      if (error.error === METEOR_USER_NOT_LOGGED_IN) {
        error.reason = YOU_ARE_NOT_LOGGED_IN;
      }
      return error;
    case types.CREATE_SITE_REQUESTED:
    case types.CREATE_SITE_SUCCEED:
      return false;
    default:
      return state;
  }
};

export default () => combineReducers({
  isCreatingSite,
  createSiteStatus,
  createSiteError,
  collection: deps.reducerCreators.collectionCreator('sites'),
  isReady: deps.reducerCreators.isReadyCreator('sites'),
});