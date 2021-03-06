import { createSelector } from 'reselect';
import * as deps from '../deps';

export const getCategories = () => ([
  { name: 'Settings', order: 0 },
  { name: 'Appearance', order: 100 },
  { name: 'Extensions', order: 200 },
  { name: 'Publish', order: 500 },
]);

export const getAllSettings = state => state.settings.collection;
export const getIsReadySettings = state => state.settings.isReady;

export const getSiteSettings = id => createSelector(
  getAllSettings,
  settings => settings.filter(setting => setting.siteId === id)
);

export const getSelectedSiteSettings = (state) => {
  const currentId = deps.selectors.getSelectedSiteId(state);
  return getSiteSettings(currentId);
};

// export const getSiteSettingsByCategory = id => createSelector(
//   getCategories,
//   getSiteSettings(id),start
//   (categories, settings) => categories.map(({ name }) => ({
//     name,
//     entries: settings.filter(entry => entry.categoryName === name),
//   }))
// );
