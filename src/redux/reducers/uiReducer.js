import { theme } from "../../utils/theme"
import { types } from "../types"

const initialState = {
    loading: false,
    checking: true,
    error: null,
    qrmode: false,
    statusbarbackground: theme.primary,
    statusbarstyle: "dark",
    statusbarhidden: false,
    permissions: false,
    permissionsgps: false,
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case types.uiStartLoading:
            return {
                ...state,
                loading: true,
            }

        case types.uiFinishLoading:
            return {
                ...state,
                loading: false,
            }
        
        case types.uiStartChecking:
            return {
                ...state,
                checking: true,
            }
        
        case types.uiFinishChecking:
            return {
                ...state,
                checking: false,
            }
        
        case types.uiOpenQrMode:
            return {
                ...state,
                qrmode: true,
            }

        case types.uiCloseQrMode:
            return {
                ...state,
                qrmode: false,
            }

        case types.uiSetStatusBarBackground:
            return {
                ...state,
                statusbarbackground: action.payload,
            }

        case types.uiSetStatusBarStyle:
            return {
                ...state,
                statusbarstyle: action.payload,
            }

        case types.uiSetStatusBarHidden:
            return {
                ...state,
                statusbarhidden: action.payload,
            }
        case types.uiSetPermission:
            return {
                ...state,
                permissions: action.payload,
            }

        case types.uiSetPermissionGps:
            return {
                ...state,
                permissionsgps: action.payload,
            }

        default:
            return state
    }

}