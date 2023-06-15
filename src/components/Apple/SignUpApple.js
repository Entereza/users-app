import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { codeErrors } from '../../utils/codeErrors'
import * as AppleAuthentication from 'expo-apple-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { _authLogin } from '../../redux/actions/authActions';
import { fetchWithoutToken } from '../../utils/fetchWithoutToken';
import { Alert } from 'react-native';

export default function SignUpApple() {
    const [text, setText] = useState('')
    const [Loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const RegisterApple = async () => {
        try {
            setText('Registrando con Apple...')
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
            console.log('Data Send Apple: ', data)

            setLoading(true)
            const res = await fetchWithoutToken("entereza/apple_sign_up", "POST", data);
            const response = await res.json();
            console.log("Back Apple: ", response)
            setLoading(false)

            if (response.codeError === "COD200") {
                console.log('Reponse Mensaje: ', response.msgError)
                setText('Iniciando Sesión con Apple...')

                setLoading(true)
                var data = {
                    token_id: credential.identityToken,
                    user_code: credential.user
                }
                console.log("Send Data Apple:", data)

                const res = await fetchWithoutToken("entereza/login_apple", "POST", data)

                const {
                    entereza,
                    mail,
                    codigoEntidad,
                    jwt,
                    rol,
                    ...rest
                } = await res.json()
                console.log("SignUp Apple Res: ", entereza)

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
                setLoading(false)
            } else {
                Alert.alert('Error al registrar con Apple', response.msgError)
            }
        } catch (e) {
            setLoading(false)
            console.log("Error Apple::", e)
            if (e.code === 'ERR_CANCELED') {
                Alert.alert('Error al registrar con Apple', 'El registro fue cancelado.')
            }
        }
    }

    // React.useEffect(() => {
    //     // if (credentialToken === '' && credentialUser === '') {
    //     //     console.log('No hay credentialToken, credentialUser')
    //     // } else {
    //     //     console.log('Si hay credentialUser, credentialToken')
    //     //     LoginApple()
    //     // }
    // }, [credentialToken, credentialUser])

    // const LoginApple = async () => {
    //     try {

    //     } catch (message) {
    //         setLoading(false)
    //         console.log(message)
    //         Alert.alert('Error al Iniciar Sesion con Apple', 'Por favor intente nuevamente en unos minutos.')
    //     }
    // }


    return (
        <></>
    );
}