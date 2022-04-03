import * as dataSavedActionTypes from "../actions/dataSavedActions";

const defaultState = {
    payload: [],
    isLoading: false,
    error: {}
};

// payload : {id:[123,456,789]}

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case dataSavedActionTypes.TOGGLE_DATASAVED_BEGIN: {
            return {
                ...state,
                isLoading: true
            };
        }

        case dataSavedActionTypes.TOGGLE_DATASAVED_SUCCESS: {
            return {
                ...state,
                payload: action.payload,
                isLoading: false
            };
        }

        case dataSavedActionTypes.TOGGLE_REMOVEDATASAVED_SUCCESS: {
            return {
                ...state,
                payload: state.payload.length>0? state.payload.filter(function (value, index, arr) {return value.id != action.payload}):state.payload,
                isLoading: false
            };
        }

        case dataSavedActionTypes.TOGGLE_ADDDATASAVED_SUCCESS: {
            return {
                ...state,
                payload: [...state.payload,action.payload],
                isLoading: false
            };
        }


        case dataSavedActionTypes.TOGGLE_DATASAVED_FAILURE: {
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