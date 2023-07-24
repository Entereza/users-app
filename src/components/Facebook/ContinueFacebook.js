import * as React from 'react';
import { useDispatch } from 'react-redux';

import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { _authLogin } from '../../redux/actions/authActions'
import { fetchWithoutToken } from '../../utils/fetchWithoutToken'
import { codeErrors } from '../../utils/codeErrors'
import AlertStyled from '../ui/AlertStyled'
import { Modal, ActivityIndicator } from 'react-native';
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';
import { theme } from '../../utils/theme';
import ButtonAuthentication from '../Btn/ButtonAuthentication';

WebBrowser.maybeCompleteAuthSession();

export default function ContinueFacebook({ display }) {
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
                        showCancelButton={false}
                        onConfirmPressed={handleCloseAlert}
                        showCloseButton={false}
                    />
                )
            }

            <ButtonAuthentication
                shadow={false}
                title={"Continuar con Facebook"}
                onPress={() => null}
                backgroundColor={theme.dark}
                WithBorder={true}
                borderColor={theme.tertiary}
                colorText={theme.primary}
                image={require('./FacebookLogo.png')}
                showButton={display}
            />

            <Modal
                visible={Loading}
                animationType="fade"
                transparent={true}
            >
                <ViewStyled
                    backgroundColor='#000000AA'
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ViewStyled
                        width={70}
                        height={18}
                        backgroundColor='#ffffff'
                        borderRadius={2}

                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextStyled
                            fontSize={15}
                            textAlign='center'
                            color='#888cf3'
                            style={{
                                marginBottom: 20,
                                width: '90%'
                            }}
                        >
                            {text}
                        </TextStyled>
                        <ActivityIndicator size="large" color={theme.secondary} />
                    </ViewStyled>
                </ViewStyled>
            </Modal>
        </>
    )
}