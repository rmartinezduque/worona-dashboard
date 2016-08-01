import { combineReducers } from 'redux';
import * as types from '../types';
import * as deps from '../dependencies';

export const showingMobileMenu = (state = false, action) => {
  switch (action.type) {
    case types.TOGGLE_MOBILE_MENU:
      return !state;
    case deps.types.LOGOUT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  showingMobileMenu,
});