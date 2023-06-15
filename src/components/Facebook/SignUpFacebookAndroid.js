import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


//Importar dependencias de facebook
import * as Facebook from 'expo-facebook';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import { _authLogin } from '../../redux/actions/authActions'
import { fetchWithoutToken } from '../../utils/fetchWithoutToken'
import { codeErrors } from '../../utils/codeErrors'

export default function SignUpFacebookAndroid() {
    const [showButton, setShowButton] = React.useState('none')

    const IosOrAndroid = async () => {
        if (Platform.OS === 'android') {
            setShowButton('flex')
            console.log('Android Sign Up')
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
        type: 'success',
    })
    const handleCloseAlert = () => setShowAlert(false)

    const dispatch = useDispatch()

    async function SignUpFacebook() {
        try {
            setText('Registrando con Facebook...')
            await Facebook.initializeAsync({
                appId: '3933991310158655',
            });
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile', 'email'] });
            console.log(type)


            if (type === 'success') {
                setLoading(true)
                var data = {
                    token_id: token
                }
                console.log(data)

                await fetchWithoutToken(
                    "entereza/facebook_sign_up",
                    "POST",
                    data
                ).then((result) => {
                    result.json().then((resp) => {
                        console.log(resp)

                        if (resp.codeError === codeErrors.cod200) {
                            ContinueFacebook()
                        } else {
                            setShowAlert(true)
                            setAlertText({
                                title: 'Ha ocurrido un error',
                                message: resp.msgError,
                                type: 'error',
                                back: false
                            })
                        }
                    });
                });

            } else {
                // type === 'cancel'
                setShowAlert(true)
                setAlertText({
                    title: 'Error al Registrarse con Facebook',
                    message: 'Por favor intente nuevamente.',
                    type: 'error',
                })
            }
            setLoading(false)
        } catch ({ message }) {
            setLoading(false)
            setShowAlert(true)
            setAlertText({
                title: 'Error al Registrarse con Facebook',
                message: 'Por favor intente nuevamente en unos minutos.',
                type: 'error',
            })
            console.log(message)
        }
    }

    const ContinueFacebook = async () => {
        try {
            setText('Iniciando Sesión con Facebook...')

            await Facebook.initializeAsync({
                appId: '3933991310158655',
            });
            const { type, token } =
                await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile', , 'email'],
                });

            if (type === 'success') {
                setLoading(true)

                var data = {
                    token_id: token
                }
                console.log(data)

                const res = await fetchWithoutToken("entereza/login_fb", "POST", data)

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
                    console.log(entereza)
                    setShowAlert(true)
                    setAlertText({
                        title: 'Ha ocurrido un error',
                        message: entereza.msgError,
                        type: 'error'
                    })
                }
                setLoading(false)
            } else {
                setShowAlert(true)
                setAlertText({
                    title: 'Error al Iniciar con Facebook',
                    message: 'Por favor intente nuevamente.',
                    type: 'error',
                })
            }
        } catch ({ message }) {
            setLoading(false)
            setShowAlert(true)
            setAlertText({
                title: 'Error al Iniciar con Facebook',
                message: 'Por favor intente nuevamente en unos minutos.',
                type: 'error',
            })
            console.log(message)
        }
    }

    return (
        <></>
    );
}
