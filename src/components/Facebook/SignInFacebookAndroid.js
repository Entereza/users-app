import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


//Importar dependencias de facebook
import * as Facebook from 'expo-facebook';

import { codeErrors } from '../../utils/codeErrors'


import AsyncStorage from '@react-native-async-storage/async-storage';
import { _authLogin } from '../../redux/actions/authActions';
import { fetchWithoutToken } from '../../utils/fetchWithoutToken';

import { Platform } from 'react-native';

export default function SignInFacebookAndroid() {
    const [showButton, setShowButton] = React.useState('none')

    const IosOrAndroid = async () => {
        if (Platform.OS === 'android') {
            setShowButton('flex')
            console.log('Android Sign In')
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
        type: '',
    })
    const handleCloseAlert = () => setShowAlert(false)

    const dispatch = useDispatch();

    async function LogInFacebook() {
        try {
            setText('Iniciando Sesión con Facebook...')

            await Facebook.initializeAsync({
                appId: '3933991310158655',
            });
            const { type, token } =
                await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile', 'email'],
                });
            if (type === 'success') {
                setLoading(true)

                var data = {
                    token_id: token
                }
                const res = await fetchWithoutToken("entereza/login_fb", "POST", data)

                const {
                    entereza,
                    mail,
                    codigoEntidad,
                    jwt,
                    rol,
                    ...rest
                } = await res.json()

                console.log(res)
                if (entereza.codeError === codeErrors.cod200) {
                    await Promise.all([
                        AsyncStorage.setItem('ENT-EMAIL', mail),
                        AsyncStorage.setItem('ENT-CODUSR', codigoEntidad),
                        AsyncStorage.setItem('ENT-TKN', jwt)
                    ])
                    dispatch(_authLogin(data))

                } else {
                    setShowAlert(true)
                    setAlertText({
                        title: 'Ha ocurrido un error',
                        message: entereza.msgError,
                        type: 'error',
                    })
                }
                setLoading(false)
            } else {
                setLoading(false)

                setShowAlert(true)
                setAlertText({
                    title: 'Oops!',
                    message: 'Algo salió mal, por favor intente de nuevo más tarde.',
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
