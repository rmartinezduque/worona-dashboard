import { CREATE_SITE_REQUESTED, CREATE_SITE_STATUS_CHANGED, CREATE_SITE_SUCCEED,
  CREATE_SITE_FAILED } from '../actiontypes';

export const createSiteRequested = (name, url, _id) =>
  ({ type: CREATE_SITE_REQUESTED, name, url, _id });
export const createSiteStatusChanged = status => ({ type: CREATE_SITE_STATUS_CHANGED, status });
export const createSiteSucceed = siteId => ({ type: CREATE_SITE_SUCCEED, siteId });
export const createSiteFailed = error => ({ type: CREATE_SITE_FAILED, error });