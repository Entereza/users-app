import AsyncStorage from '@react-native-async-storage/async-storage';
import { codeErrors } from "../../utils/codeErrors";
import { fetchWithToken } from "../../utils/fetchWithToken";
import { types } from "../types";
import { _uiFinishChecking, _uiStartChecking } from "./uiActions";
import { Alert } from 'react-native';

export const _authLogin = (payload) => ({
    type: types.authLogin,
    payload,
})

export const __authLogin = (payload) => {
    return async (dispatch) => {
        dispatch(_authLogin(payload))
    }
}

export const _authLogout = () => ({
    type: types.authLogout,
})

export const __authLogout = () => {
    return async (dispatch) => {
        dispatch(_uiStartChecking())
        try {
            let email = await AsyncStorage.getItem('ENT-EMAIL')
            var data = {
                email: email
            }
            console.log('Logout data: ', data)

            var close = {

            }
            let res = await fetchWithToken("entereza/logout", "POST", data)

            let { codeError } = await res.json();

            if (codeError === codeErrors.cod200) {
                dispatch(_authGetInfo(close))
                await Promise.all([
                    AsyncStorage.clear()
                ]).then((
                    dispatch(_authLogout())
                ));
            } else {
                alert("Algo salió mal", "No se pudo cerrar Sesion")
            }

        } catch (err) {
            console.log(err)
            alert("Error Server", "Error Logout")
        }
        dispatch(_uiFinishChecking())
    }
}

export const _authGetInfo = (payload) => ({
    type: types.authGetInfo,
    payload,
})

export const __authGetInfo = () => {
    return async (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const mail = await AsyncStorage.getItem('ENT-EMAIL')

                console.log('Starts Searching Info of User: ', mail)

                const response = await fetchWithToken(`entereza/usuarios_list?code=${mail}`)

                console.log('Informacion del usuario encontrada.')

                const {
                    entereza,
                    lista_usuarios,
                    modales,
                    token,
                    tiempo_faltante,
                    codigo_transacciones,
                    creado_entereza,
                    expo
                } = await response.json()


                if (entereza.codeError === codeErrors.cod526) {
                    let data = {
                        ahorro: tiempo_faltante.ahorro,
                        disponible: tiempo_faltante.fecha,
                        ...lista_usuarios[0],
                        modales,
                        token,
                        codigo: codigo_transacciones,
                        entereza: creado_entereza,
                        expoToken: expo
                    }

                    await Promise.all([
                        await AsyncStorage.setItem('CODE-NOMBRE', lista_usuarios[0].usuarioBean?.nombres),
                        await AsyncStorage.setItem('CODE-SALDO', tiempo_faltante.ahorro),
                    ])
                    dispatch(_authGetInfo(data))

                    resolve();
                } else {
                    console.log('Logout by token caducado.', entereza)
                    dispatch(_authLogout())
                }
            } catch (err) {
                console.log('Error authGetInfo: ', err)

                Alert.alert('Ocurrió un error al cargar los datos.', 'Por favor intente nuevamente.')
            } finally {
                console.log('Finished AuthGetInfo')
                dispatch(_uiFinishChecking())
            }
        });
    }
}

export const _authValidate = () => ({
    type: types.authValidate,
})

export const __authValidate = () => {
    return async (dispatch) => {
        try {
            console.log('Validating User...')
            const mail = await AsyncStorage.getItem('ENT-EMAIL')
            const codigoEntidad = await AsyncStorage.getItem('ENT-CODUSR')
            const token = await AsyncStorage.getItem('ENT-TKN')
            console.log("Mail: ", mail, "- CodEntidad: ", codigoEntidad, "- Token: ", token)

            var data = {
                mail,
                codigoEntidad,
                token
            }

            if (token && mail && codigoEntidad) {
                dispatch(_authLogin(data))
                // console.log("Si hay token")
                dispatch(__authGetInfo())

            } else {
                dispatch(_authLogout())

                dispatch(_uiFinishChecking())

                console.log('Close Validate Screen.')
                return;
                // console.log("No hay nada")
            }
        } catch (err) {
            dispatch(_uiFinishChecking())

            console.log('EROR VALIDATE', err)
        }
    }
}

export const _authSetLocation = (payload) => ({
    type: types.authSetAddress,
    payload,
})

export const _authSetCityData = (cityData) => ({
    type: types.authSetCities,
    payload: cityData,
});