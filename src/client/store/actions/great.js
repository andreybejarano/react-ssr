import { GET_GREAT } from '../actionTypes';

import GreatService from '@/services/great';

export const getChannels = () => {
  return dispatch => {
    const great = GreatService.getGreat();
    return dispatch({
      type: GET_GREAT,
      data: great.data
    });
  };
};
