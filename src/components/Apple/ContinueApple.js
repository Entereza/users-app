import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { codeErrors } from '../../utils/codeErrors'
import * as AppleAuthentication from 'expo-apple-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { __authGetInfo, _authLogin } from '../../redux/actions/authActions';
import { fetchWithoutToken } from '../../utils/fetchWithoutToken';
import { Modal, ActivityIndicator, Alert } from 'react-native';
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';
import { theme } from '../../utils/theme';
import ButtonAuthentication from '../Btn/ButtonAuthentication';
import AlertStyled from '../ui/AlertStyled';

export default function ContinueApple({ display }) {
    const [text, setText] = useState("Continuar con Apple")
    const [Loading, setLoading] = useState(false)

    const [showAlert, setShowAlert] = React.useState(false)
    const [alertText, setAlertText] = React.useState({
        title: '',
        message: '',
        type: 'success',
    })
    const handleCloseAlert = () => setShowAlert(false)

    const dispatch = useDispatch();

    const RegisterApple = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            console.log('Credential apple: ', credential)

            setText('Ingresando con Apple...')
            setLoading(true)
            const dataApple = {
                token_id: credential.identityToken,
                user_code: credential.user
            }

            console.log('Data Send Apple: ', dataApple)

            const res = await fetchWithoutToken("entereza/apple_sign_up", "POST", dataApple);
            const response = await res.json();

            console.log("Back Apple: ", response)

            if (response.codeError === "COD200") {
                console.log('Response Mensaje: ', response.msgError)

                LoginApple(credential)
            } else if (response.codeError === "COD056") {
                console.log('El correo ya está en uso: ', response.msgError)
                LoginApple(credential)
            } else {
                setShowAlert(true)
                setAlertText({
                    title: 'Ha ocurrido un error.',
                    message: entereza.msgError,
                    type: 'error',
                })

                setLoading(false)
                setText("Continuar con Apple")
            }
        } catch (e) {
            console.log("Error Apple: ", e)
            setShowAlert(true)
            setAlertText({
                title: 'Error al Continuar con Apple',
                message: 'Por favor intente nuevamente en unos minutos.',
                type: 'error',
            })

            setLoading(false)
            setText("Continuar con Apple")
        }
    }

    const LoginApple = async (credential) => {
        console.log('DataApple: ', credential)

        try {
            let dataLogin = {
                token_id: credential.identityToken,
                user_code: credential.user
            }
            console.log("Send Data Apple:", dataLogin)

            const res = await fetchWithoutToken("entereza/login_apple", "POST", dataLogin)

            const {
                entereza,
                mail,
                codigoEntidad,
                jwt,
                rol,
                ...rest
            } = await res.json()
            console.log("Login Apple Res: ", entereza)

            if (entereza.codeError === codeErrors.cod200) {
                console.log('Inicio de sesión exitoso: ', entereza, mail, codigoEntidad, jwt, rol)

                await Promise.all([
                    AsyncStorage.setItem('ENT-EMAIL', mail),
                    AsyncStorage.setItem('ENT-CODUSR', codigoEntidad),
                    AsyncStorage.setItem('ENT-TKN', jwt),
                ]);

                await Promise.all([
                    console.log('Starts __authGetInfo'),
                    dispatch(__authGetInfo()),
                ]).then(() => {
                    setTimeout(() => {
                        console.log('Starts _authLogin...')
                        dispatch(_authLogin(dataLogin))
                    }, 1000);
                })
            } else {
                setShowAlert(true)
                setAlertText({
                    title: 'Ha ocurrido un error.',
                    message: entereza.msgError,
                    type: 'error',
                })

                setLoading(false)
                setText("Continuar con Apple")
            }
        } catch (error) {
            setShowAlert(true)
            setAlertText({
                title: 'Error al Continuar con Apple',
                message: 'Por favor intente nuevamente en unos minutos.',
                type: 'error',
            })

            setLoading(false)
            setText("Continuar con Apple")
            console.log('Error LoginApple: ', error)
        }
    }

    return (
        <>
            {
                showAlert
                && (
                    <AlertStyled
                        widthModal={70}
                        heightModal={30}
                        title={alertText.title}
                        message={alertText.message}
                        type={alertText.type}
                        onConfirmPressed={handleCloseAlert}
                        showCloseButton={false}
                        showCancelButton={false}
                    />
                )
            }

            <ButtonAuthentication
                shadow={false}
                title={text}
                onPress={RegisterApple}
                backgroundColor={theme.dark}
                WithBorder={true}
                borderColor={theme.tertiary}
                colorText={theme.primary}
                image={require('./AppleLogo.png')}
                showButton={display}
                disabled={Loading}
                loading={Loading}
            />
        </>
    )
}