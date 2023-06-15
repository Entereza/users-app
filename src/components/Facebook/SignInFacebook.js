import * as React from 'react';
import { useDispatch } from 'react-redux';

// import FacebookButton from '../Btn/ButtonFacebook';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { _authLogin } from '../../redux/actions/authActions'
import { fetchWithoutToken } from '../../utils/fetchWithoutToken'
import { codeErrors } from '../../utils/codeErrors'
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function SignInFacebook() {
    const [showButton, setShowButton] = React.useState('none')

    const IosOrAndroid = async () => {
        let platform = Platform.OS
        console.log(platform)
        if (Platform.OS === 'ios') {
            setShowButton('flex')
        }
    }

    React.useEffect(() => {
        IosOrAndroid()
    }, [])

    const [text, setText] = React.useState('')
    const [Loading, setLoading] = React.useState(false)


    const [showAlert, setShowAlert] = React.useState(false)
    const [alertText, setAlertText] = React.useState({
        title: '',
        message: '',
        type: 'success',
    })
    const handleCloseAlert = () => setShowAlert(false)

    const [request, response, promptAsync] = Facebook.useAuthRequest({
        iosClientId: '3933991310158655',
        androidClientId: '3933991310158655',
        expoClientId: '3933991310158655',
    }, { useProxy: false });

    const dispatch = useDispatch();

    const SignInG = async () => {
        try {
            setText('Iniciando Sesión con Facebook...')

            var data = {
                token_id: response.params.access_token,
            };
            console.log('Data Send Fb: ', data)


            setLoading(true)
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
                setShowAlert(true)
                setAlertText({
                    title: 'Ha ocurrido un error',
                    message: entereza.msgError,
                    type: 'error',
                })
            }
            setLoading(false)

        } catch ({ message }) {
            setLoading(false)

            setShowAlert(true)
            setAlertText({
                title: 'Error al Iniciar con Facebook',
                message: 'Por favor intente nuevamente en unos minutos.',
                type: 'error',
            })
            console.log('Error SignIn Facebook: ', message)
        }
    }

    React.useEffect(() => {
        console.log("Facebook: ", response)
        if (response?.type === 'success') {
            SignInG();

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
        }
        else if (response === "null") {
            return
        }
    }, [response]);

    return (
        <></>
    );
}