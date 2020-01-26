import { combineReducers } from 'redux';

import { GET_GREAT } from '../actionTypes';

const initialState = {
  isFetching: false,
  success: false,
  rejected: false,
  data: null,
  error: null
};

const getGreat = (state = initialState, action) => {
  switch (action.type) {
    case GET_GREAT:
      return {
        ...state,
        isFetching: false,
        success: true,
        rejected: false,
        data: action.data
      };
    default:
      return state;
  }
};

export default combineReducers({
  great: getGreat
});
