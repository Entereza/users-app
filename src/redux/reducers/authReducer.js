import { types } from "../types"

const initialState = {
    user: null,
    info: null,
    location: null,
    cityData: [],
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                user: action.payload,
            }
        case types.authLogout:
            return {
                ...state,
                user: null,
            }

        case types.authGetInfo:
            return {
                ...state,
                info: action.payload,
            }

        case types.authSetAddress:
            return {
                ...state,
                location: action.payload,
            }

        case types.authSetCities:
            return {
                ...state,
                cityData: action.payload,
            };
        default:
            return state;
    }
}