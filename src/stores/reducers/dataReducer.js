import * as dataActionTypes from "../actions/dataActions";

const defaultState = {
    payload: [],
    isLoading: false,
    error: {}
};

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case dataActionTypes.TOGGLE_DATA_BEGIN: {
            return {
                ...state,
                isLoading: true
            };
        }

        case dataActionTypes.TOGGLE_DATA_SUCCESS: {
            return {
                ...state,
                payload: [...state.payload, ...action.payload],
                isLoading: false
            };
        }

        case dataActionTypes.TOGGLE_SEARCH_SUCCESS: {
            return {
                ...state,
                payload: action.payload,
                isLoading: false
            };
        }

        case dataActionTypes.TOGGLE_DATA_FAILURE: {
            return {
                ...state,
                payload: [],
                error: action.error,
                isLoading: false
            };
        }

        default:
            return state;

    }
}