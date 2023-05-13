import {
  UPDATE_ITEMS,
} from '../actionTypes/Search';

/**
 * Update Items in store
 * @param {object} payload - Items to update in store
 * @returns {object}
 */
export const updateItems = (payload) => ({
  type: UPDATE_ITEMS,
  payload,
});