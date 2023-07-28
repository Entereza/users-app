import * as React from 'react';

import { __authGetInfo, _authLogin } from '../../redux/actions/authActions'
import { Modal, ActivityIndicator } from 'react-native';
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';
import { theme } from '../../utils/theme';

import ButtonAuthentication from '../Btn/ButtonAuthentication';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { fetchWithoutToken } from '../../utils/fetchWithoutToken';
import { codeErrors } from '../../utils/codeErrors';
import AlertStyled from '../ui/AlertStyled';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure();
export default function ContinueGoogle({ shadow }) {

    const dispatch = useDispatch()

    const [text, setText] = React.useState("Continuar con Google")
    const [Loading, setLoading] = React.useState(false)

    const [tokenId, setTokenId] = React.useState(null)

    const [showAlert, setShowAlert] = React.useState(false)
    const [alertText, setAlertText] = React.useState({
        title: '',
        message: '',
        type: 'success',
    })
    const handleCloseAlert = () => setShowAlert(false)

    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId: '511900415351-u8a9qj8q91nc2d6jan3vvhoqhajir6v8.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
            scopes: [
                'profile',
                'email',
                'openid',
            ]
        });
    }, [])

    React.useEffect(() => {
        if (tokenId) {
            console.log('Data For Send', tokenId)
            RegisterGoogle()
        }
    }, [tokenId])

    const signInGoogleTokenId = async () => {
        try {
            await GoogleSignin.hasPlayServices()

            const userInfo = await GoogleSignin.signIn();
            // console.log('userInfo: ', userInfo)
            setTokenId(userInfo.idToken)
        } catch (error) {
            console.log('Error signIn: ', error.message)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('Cancelled SignIn: ', error.code)
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('InPorgress SignIn: ', error.code)

                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Cancelled PLAY_SERVICES_NOT_AVAILABLE: ', error.code)

                // play services not available or outdated
            } else {
                console.log('some other error happened SignIn: ', error.code)
                // some other error happened
            }
        }
    }

    const RegisterGoogle = async () => {
        setLoading(true)
        setText('Ingresando con Google...')
        try {
            let dataRegister = {
                token_id: tokenId,
            }

            const res = await fetchWithoutToken(`entereza/google_sign_up`, 'POST', dataRegister)

            const { codeError, msgError } = await res.json()

            if (codeError === 'COD200') {
                console.log('Registro Exitoso: ', codeError, '- ', msgError)
                LoginGoogle()
            } else if (codeError === "COD056") {
                console.log('Correo ya está en uso: ', codeError, '- ', msgError)
                LoginGoogle()
            } else {
                setShowAlert(true)
                setAlertText({
                    title: 'Ha ocurrido un error.',
                    message: msgError,
                    type: 'error',
                })

                setTokenId(null)
                setLoading(false)
                setText('Continuar con Google')
                console.log('Error on google_sign_up: ', codeError, '- ', msgError)
            }
        } catch (error) {
            setShowAlert(true)
            setAlertText({
                title: 'Error al Continuar con Google',
                message: 'Por favor intente nuevamente en unos minutos.',
                type: 'error',
            })

            setTokenId(null)
            setLoading(false)
            setText('Continuar con Google')
            console.log('Error RegisterGoogle: ', error)
        }
    }

    const LoginGoogle = async () => {
        try {
            let dataLogin = {
                token_id: tokenId,
            };

            const res = await fetchWithoutToken("entereza/login_go", "POST", dataLogin)

            const {
                entereza,
                mail,
                codigoEntidad,
                jwt,
                rol,
                ...rest
            } = await res.json()

            if (entereza.codeError === codeErrors.cod200) {
                console.log('Inicio de sesión exitoso: ', entereza)

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

                console.log('Error on login_go: ', entereza)
                setTokenId(null)
                setLoading(false)
                setText('Continuar con Google')
            }
        } catch (error) {
            setShowAlert(true)
            setAlertText({
                title: 'Error al Continuar con Google',
                message: 'Por favor intente nuevamente en unos minutos.',
                type: 'error',
            })

            setTokenId(null)
            setLoading(false)
            setText('Continuar con Google')
            console.log('Error LoginGoogle: ', error)
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
                disabled={Loading}
                shadow={false}
                title={text}
                onPress={signInGoogleTokenId}
                backgroundColor={theme.dark}
                WithBorder={true}
                borderColor={theme.tertiary}
                colorText={theme.primary}
                image={require('./GoogleLogo.png')}
                loading={Loading}
            />
        </>
    )
}