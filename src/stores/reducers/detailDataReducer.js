import * as detailDataActionTypes from "../actions/detailDataActions";

const defaultState = {
    payload: {},
    isLoading: false,
    error: {}
};

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case detailDataActionTypes.TOGGLE_DETAILDATA_BEGIN: {
            return {
                ...state,
                isLoading: true
            };
        }

        case detailDataActionTypes.TOGGLE_DETAILDATA_SUCCESS: {
            return {
                ...state,
                payload: action.payload,
                isLoading: false
            };
        }

        case detailDataActionTypes.TOGGLE_DETAILDATA_FAILURE: {
            return {
                ...state,
                payload: {},
                error: action.error,
                isLoading: false
            };
        }

        default:
            return state;

    }
}