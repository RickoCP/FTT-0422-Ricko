export const TOGGLE_DATA_BEGIN = 'TOGGLE_DATA_BEGIN'
export const TOGGLE_DATA_SUCCESS = 'TOGGLE_DATA_SUCCESS'
export const TOGGLE_DATA_FAILURE = 'TOGGLE_DATA_FAILURE'

export const TOGGLE_SEARCH_SUCCESS = 'TOGGLE_SEARCH_SUCCESS'

import { querySearch } from '../../data/api/index';
import { queryData } from '../../data/api/index';
import { queryDetailData } from '../../data/api/index';

export function fetchData(page,limit) {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_DATA_BEGIN
    });

    try {
        
      const result = await queryData(page,limit);

      if (result.status === 200) {
        dispatch({
          type: TOGGLE_DATA_SUCCESS,
          payload: result.data.data
        });
      } else {
        dispatch({
          type: TOGGLE_DATA_FAILURE,
          error: "data fail"
        });
      }
    } catch (err) {
        dispatch({
        type: TOGGLE_DATA_FAILURE,
        error: err
      });
    }
  };
}

export function fetchSearch(query) {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_DATA_BEGIN
    });
    
    try {
      const result = await querySearch(query);
      if (result.status === 200) {
        let newData = await Promise.all(result.data.data
        .map(async(item)=>{
          try{
            const detailResult = await queryDetailData(item.id);
            if (detailResult.status === 200) {
              
              return (detailResult.data.data)
            } else {
              dispatch({
                type: TOGGLE_DATA_FAILURE,
                error: "search fail"
              });
            }
          } catch (err){
            dispatch({
              type: TOGGLE_DATA_FAILURE,
              error: err
            });
          }
        }
        ))

        dispatch({
          type: TOGGLE_SEARCH_SUCCESS,
          payload: newData
        });

      } else {
        dispatch({
          type: TOGGLE_DATA_FAILURE,
          error: result.data
        });
      }
    } catch (err) {
        dispatch({
        type: TOGGLE_DATA_FAILURE,
        error: err
      });
    }
  };
}

// export default function fetchData(page,limit) {
//   return async (dispatch) => {
//     dispatch({
//       type: TOGGLE_DATA_BEGIN
//     });

//     try {
        
//       const result = await queryData(page,limit);

//       if (result.status === 200) {
//         dispatch({
//           type: TOGGLE_DATA_SUCCESS,
//           payload: result.data.data
//         });
//       } else {
//         dispatch({
//           type: TOGGLE_DATA_FAILURE,
//           error: result.data.data
//         });
//       }
//     } catch (err) {
//         dispatch({
//         type: TOGGLE_DATA_FAILURE,
//         error: err
//       });
//     }
//   };
// }