import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { _authLogin } from '../../redux/actions/authActions'
import { fetchWithoutToken } from '../../utils/fetchWithoutToken'
import { codeErrors } from '../../utils/codeErrors'


WebBrowser.maybeCompleteAuthSession();

export default function SignUpGoogle() {
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

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        iosClientId: "511900415351-ej15snog5mn00ikjcbuqeqa1pap18nkn.apps.googleusercontent.com",
        androidClientId: "511900415351-o4h1055kmlku12n50vn9vrto3k04jls2.apps.googleusercontent.com",
        webClientId: "511900415351-b1g7213gfgt8ur96qqfnlinf9rjardj8.apps.googleusercontent.com",
    }, 
    { useProxy: false }    
    );

    //Continuar con Google (Set AsyncStorage)
    const ContinueGoogle = async () => {
        try {
            setText('Iniciando Sesión con Google...')
            setLoading(true)

            var data = {
                token_id: response.params.id_token,
            };
            console.log(data)

            const res = await fetchWithoutToken("entereza/login_go", "POST", data)
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
                title: 'Error al Iniciar con Google',
                message: 'Por favor intente nuevamente en unos minutos.',
                type: 'error',
            })
        }
    }

    //Enviar Token de Registro Google

    async function SendGoogle() {
        try {
            setText('Registrando con Google...')
            // setLoading(true)

            var data = {
                token_id: response.params.id_token,
            };
            console.log(data)

            await fetchWithoutToken(
                "entereza/google_sign_up",
                "POST",
                data
            ).then((result) => {
                result.json().then((resp) => {
                    console.log("Registro Respuesta", resp);
                    if (resp.codeError === codeErrors.cod200) {
                        ContinueGoogle()
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
                title: 'Error al Registrarse con Google',
                message: 'Por favor intente nuevamente en unos minutos.',
                type: 'error',
            })
        }
    }

    React.useEffect(() => {
        console.log("google: ", response)
        if (response?.type === 'success') {
            SendGoogle();
        } else if (response?.type === 'cancel') {
            setShowAlert(true)
            setAlertText({
                title: 'Error al Registrarse con Google',
                message: 'El registro fue cancelado.',
                type: 'error',
            })
            return;
        } else if (response?.type === 'error') {
            setShowAlert(true)
            setAlertText({
                title: 'Error al Registrarse con Google',
                message: 'El registro fue cancelado.',
                type: 'error',
            })
            return;
        } else if (response?.type === 'dismiss') {
            setShowAlert(true)
            setAlertText({
                title: 'Error al Registrarse con Google',
                message: 'El registro fue cancelado.',
                type: 'error',
            })
            return;
        }
        else if (response === "null") {
            return
        }
    }, [response]);

    return (
        <></>
    );
}