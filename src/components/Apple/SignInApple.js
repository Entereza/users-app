import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { codeErrors } from '../../utils/codeErrors'


import AsyncStorage from '@react-native-async-storage/async-storage';
import { _authLogin } from '../../redux/actions/authActions';
import { fetchWithoutToken } from '../../utils/fetchWithoutToken';
import * as AppleAuthentication from 'expo-apple-authentication'
import { Alert } from 'react-native';

export default function SignInApple() {
    const [text, setText] = useState('')
    const [Loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const LoginApple = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            console.log('Credential apple: ', credential)

            var data = {
                token_id: credential.identityToken,
                user_code: credential.user
            }
            
            setText('Iniciando con Apple...')
            setLoading(true)

            const res = await fetchWithoutToken("entereza/login_apple", "POST", data)

            const {
                entereza,
                mail,
                codigoEntidad,
                jwt,
                rol,
                ...rest
            } = await res.json()
            console.log('Response Entereza Apple: ', entereza)
            setLoading(false)

            if (entereza.codeError === codeErrors.cod200) {
                await Promise.all([
                    AsyncStorage.setItem('ENT-EMAIL', mail),
                    AsyncStorage.setItem('ENT-CODUSR', codigoEntidad),
                    AsyncStorage.setItem('ENT-TKN', jwt)
                ])
                dispatch(_authLogin(data))
            } else {
                Alert.alert('Error al Iniciar Sesion con Apple', entereza.msgError)
            }
        } catch (e) {
            setLoading(false)
            Alert.alert('Error al Iniciar Sesion con Apple', 'Credenciales no válidas')
            console.log('Error Login Apple', e)
            if (e.code === 'ERR_CANCELED') {
                // handle that the user canceled the sign-in flow
            } else {
                // handle other errors
            }
        }
    }


    return (
        <></>
    );
}