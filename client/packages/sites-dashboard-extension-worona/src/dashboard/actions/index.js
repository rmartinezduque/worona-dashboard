import stringifyError from 'stringify-error-message';
import * as types from '../types';
// Create Site actions:
export const createSiteRequested = (name, url, _id) =>
  ({ type: types.CREATE_SITE_REQUESTED, name, url, _id });
export const createSiteStatusChanged = status =>
  ({ type: types.CREATE_SITE_STATUS_CHANGED, status });
export const createSiteSucceed = siteId =>
  ({ type: types.CREATE_SITE_SUCCEED, siteId });
export const createSiteFailed = errorObj =>
  ({ type: types.CREATE_SITE_FAILED, error: stringifyError(errorObj) });
// Delete Site actions:
export const deleteSiteRequested = _id =>
  ({ type: types.DELETE_SITE_REQUESTED, _id });
export const deleteSiteStatusChanged = status =>
    ({ type: types.DELETE_SITE_STATUS_CHANGED, status });
export const deleteSiteSucceed = siteId =>
  ({ type: types.DELETE_SITE_SUCCEED, siteId });
export const deleteSiteFailed = errorObj =>
  ({ type: types.DELETE_SITE_FAILED, error: stringifyError(errorObj) });
  // Check Site actions
export const checkSiteRequested = (url, _id) =>
  ({ type: types.CHECK_SITE_REQUESTED, url, _id });
export const checkSiteSucceed = () =>
  ({ type: types.CHECK_SITE_SUCCEED });
export const checkSiteFailed = (errorObj) =>
  ({ type: types.CHECK_SITE_FAILED, error: stringifyError(errorObj) });
