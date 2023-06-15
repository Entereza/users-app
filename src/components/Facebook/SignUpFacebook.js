import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { _authLogin } from '../../redux/actions/authActions'
import { fetchWithoutToken } from '../../utils/fetchWithoutToken'
import { codeErrors } from '../../utils/codeErrors'

import { Platform } from 'react-native';
import { ResponseType, makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function SignUpFacebook() {
    const [showButton, setShowButton] = React.useState('none')

    const IosOrAndroid = async () => {
        if (Platform.OS === 'ios') {
            setShowButton('flex')
            console.log('IOs Sign Up')
        }
    }

    React.useEffect(() => {
        IosOrAndroid()
    }, [])

    const [text, setText] = useState('')
    const [Loading, setLoading] = useState(false)

    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState({
        title: '',
        message: '',
        type: 'success'
    })
    const handleCloseAlert = () => setShowAlert(false)

    const dispatch = useDispatch()

    const [request, response, promptAsync] = Facebook.useAuthRequest(
        {
            responseType: ResponseType.Token,
            clientId: '3933991310158655',
            redirectUri: makeRedirectUri({ useProxy: false })
            // redirectUri: 'https://auth.expo.io/@intirraptor/enterezaClient'
        },
        { useProxy: false }
    );


    //Continuar con Facebook (Set AsyncStorage)
    const ContinueFacebook = async () => {
        try {
            setText('Iniciando Sesión con Facebook...')
            setLoading(true)

            var data = {
                token_id: response.authentication.accessToken,
            };
            console.log(data)

            const res = await fetchWithoutToken("entereza/login_fb", "POST", data)
            console.log(res)

            const {
                entereza,
                mail,
                codigoEntidad,
                jwt,
                rol,
                ...rest
            } = await res.json()

            if (entereza.codeError === codeErrors.cod200) {
                await Promise.all([
                    AsyncStorage.setItem('ENT-EMAIL', mail),
                    AsyncStorage.setItem('ENT-CODUSR', codigoEntidad),
                    AsyncStorage.setItem('ENT-TKN', jwt),
                ])
                dispatch(_authLogin(data))

            } else {
                setShowAlert(true)
                setAlertText({
                    title: 'Ha ocurrido un error',
                    message: entereza.msgError,
                    type: 'error'
                })
            }
            setLoading(false)
        } catch ({ message }) {
            console.log(message)
            setShowAlert(true)
            setAlertText({
                title: 'Error al Iniciar con Facebook',
                message: 'Por favor intente nuevamente en unos minutos.',
                type: 'error',
            })
        }
    }

    //Enviar Token de Registro Facebook

    async function SendFacebook() {
        try {
            setText('Registrando con Facebook...')
            // setLoading(true)

            var data = {
                token_id: response.authentication.accessToken,
            };
            console.log(data)

            await fetchWithoutToken(
                "entereza/facebook_sign_up",
                "POST",
                data
            ).then((result) => {
                result.json().then((resp) => {
                    console.log("Registro Respuesta", resp);
                    if (resp.codeError === codeErrors.cod200) {
                        ContinueFacebook()
                    } else {
                        setShowAlert(true)
                        setAlertText({
                            title: 'Ha ocurrido un error',
                            message: resp.msgError,
                            type: 'error',
                        })
                    }
                });
            });
        } catch ({ message }) {
            setLoading(false)
            console.log(message)
            setShowAlert(true)
            setAlertText({
                title: 'Error al Registrarse con Facebook',
                message: 'Por favor intente nuevamente en unos minutos.',
                type: 'error',
            })
        }
    }

    React.useEffect(() => {
        console.log("Facebook: ", response)
        if (response?.type === 'success') {
            SendFacebook();
        } else if (response?.type === 'cancel') {
            setShowAlert(true)
            setAlertText({
                title: 'Error al Registrarse con Facebook',
                message: 'El registro fue cancelado.',
                type: 'error',
            })
            return;
        } else if (response?.type === 'error') {
            setShowAlert(true)
            setAlertText({
                title: 'Error al Registrarse con Facebook',
                message: 'El registro fue cancelado.',
                type: 'error',
            })
            return;
        } else if (response?.type === 'dismiss') {
            setShowAlert(true)
            setAlertText({
                title: 'Error al Registrarse con Facebook',
                message: 'El registro fue cancelado.',
                type: 'error',
            })
            return;
        }
    }, [response]);

    return (
        <></>
    );
}