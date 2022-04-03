export const TOGGLE_DETAILDATA_BEGIN = 'TOGGLE_DETAILDATA_BEGIN'
export const TOGGLE_DETAILDATA_SUCCESS = 'TOGGLE_DETAILDATA_SUCCESS'
export const TOGGLE_DETAILDATA_FAILURE = 'TOGGLE_DETAILDATA_FAILURE'

import { queryDetailData } from '../../data/api/index';

export default function fetchDetailData(identifier) {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_DETAILDATA_BEGIN
    });

    try {
      
      const result = await queryDetailData(identifier);
      if (result.status === 200) {
        dispatch({
          type: TOGGLE_DETAILDATA_SUCCESS,
          payload: result.data.data
        });
      } else {
        dispatch({
          type: TOGGLE_DETAILDATA_FAILURE,
          error: "error"
        });
      }
    } catch (err) {
        dispatch({
        type: TOGGLE_DETAILDATA_FAILURE,
        error: err
      });
    }
  };
}
