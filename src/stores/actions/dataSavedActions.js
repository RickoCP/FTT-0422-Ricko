export const TOGGLE_DATASAVED_BEGIN = 'TOGGLE_DATASAVED_BEGIN'
export const TOGGLE_DATASAVED_SUCCESS = 'TOGGLE_DATASAVED_SUCCESS'
export const TOGGLE_DATASAVED_FAILURE = 'TOGGLE_DATASAVED_FAILURE'

export const TOGGLE_REMOVEDATASAVED_SUCCESS = 'TOGGLE_REMOVEDATASAVED_SUCCESS'
export const TOGGLE_ADDDATASAVED_SUCCESS = 'TOGGLE_ADDDATASAVED_SUCCESS'

import { queryDataSaved } from '../../data/asyncStorage';


export function fetchDataSaved(storageKey) {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_DATASAVED_BEGIN
    });

    try {
      const result = await queryDataSaved(storageKey);
        dispatch({
        type: TOGGLE_DATASAVED_SUCCESS,
        payload: result
      });
     
    } catch (err) {

        dispatch({
        type: TOGGLE_DATASAVED_FAILURE,
        error: "data asyncstorage error"
      });
    }
  };
}

export function RemoveDataSaved(storageKey,id) {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_REMOVEDATASAVED_SUCCESS,
      payload: id,
      key: storageKey

    });
  };
}

export function AddDataSaved(storageKey,id,image_id) {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_ADDDATASAVED_SUCCESS,
      payload: {id,image_id},
      key: storageKey
    });
  };
}