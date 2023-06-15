import { theme } from "../../utils/theme";
import { types } from "../types";

export const _uiOpenQrMode = () => ({
    type: types.uiOpenQrMode,
})

export const _uiCloseQrMode = () => ({
    type: types.uiCloseQrMode,
})

export const __uiOpenQrMode = () => {
    return (dispatch) => {
        dispatch( _uiSetStatusBarStyle("light") ) 
        dispatch( _uiSetStatusBarBackground(theme.secondary) )
        dispatch(_uiOpenQrMode())
    }
}

export const __uiCloseQrMode = () => {
    return (dispatch) => {
        dispatch( _uiSetStatusBarStyle("dark") )
        dispatch( _uiSetStatusBarBackground(theme.primary) )
        dispatch(_uiCloseQrMode())
    }
}


export const _uiSetStatusBarBackground = (payload) => ({
    type: types.uiSetStatusBarBackground,
    payload,
})

export const _uiSetStatusBarStyle = (payload) => ({
    type: types.uiSetStatusBarStyle,
    payload,
})

export const _uiSetStatusBarHidden = (payload) => ({
    type: types.uiSetStatusBarHidden,
    payload,
})

export const _uiSetPermission = (payload) => ({
    type: types.uiSetPermission,
    payload,
})

export const _uiStartChecking = () => ({
    type: types.uiStartChecking
})

export const _uiFinishChecking = () => ({
    type: types.uiFinishChecking
})

export const _uiSetPermissionGps = (payload) => ({
    type: types.uiSetPermissionGps,
    payload,
})