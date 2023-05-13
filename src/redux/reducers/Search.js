
import {
  UPDATE_ITEMS,
} from '../actionTypes/Search';

// INITIAL STATE
const initialState = { timeExpired: false };
const SearchReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case UPDATE_ITEMS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default SearchReducer;
