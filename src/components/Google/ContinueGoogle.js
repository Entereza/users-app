import * as React from 'react';

import { _authLogin } from '../../redux/actions/authActions'
import AlertStyled from '../ui/AlertStyled'
import { Modal, ActivityIndicator, Platform } from 'react-native';
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';
import { theme } from '../../utils/theme';

import { makeRedirectUri, startAsync, useAuthRequest } from 'expo-auth-session';
import * as Random from 'expo-random';
import * as WebBrowser from 'expo-web-browser';

import ButtonAuthentication from '../Btn/ButtonAuthentication';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export default function ContinueGoogle({ shadow }) {
    const [text, setText] = React.useState('')
    const [Loading, setLoading] = React.useState(false)


    const [showAlert, setShowAlert] = React.useState(false)
    const [alertText, setAlertText] = React.useState({
        title: '',
        message: '',
        type: 'success',
    })
    const handleCloseAlert = () => setShowAlert(false)

    const [nonce, setNonce] = React.useState(null);

    // React.useEffect(() => {
    //     generateNonce();
    // }, []);

    // const generateNonce = async () => {
    //     const buffer = await Random.getRandomBytesAsync(16);
    //     const generatedNonce = [...new Uint8Array(buffer)].map(b => String.fromCharCode(b)).join('');
    //     setNonce(generatedNonce);
    // }

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: Platform.OS === 'ios' ? '511900415351-ej15snog5mn00ikjcbuqeqa1pap18nkn.apps.googleusercontent.com' : '511900415351-o4h1055kmlku12n50vn9vrto3k04jls2.apps.googleusercontent.com',
            scopes: ['openid', 'profile', 'email'],
            // Debes reemplazar 'my.redirect.uri' con tu propia URI de redireccionamiento
            redirectUri: makeRedirectUri({
                native: 'com.entereza.client',
                useProxy: true,
                projectNameForProxy: '@intirraptor/enterezaClient'
            }),
            nonce,
        },
        discovery
    );

    const handleSignIn = async () => {
        try {
            const result = await startAsync({ authUrl: request.url, projectNameForProxy: '@intirraptor/enterezaClient' });
            if (result.type === 'success') {
                // Aquí puedes manejar la respuesta exitosa
                console.log(result);
            }
        } catch (error) {
            // Aquí puedes manejar errores de inicio de sesión
            console.log(error);
        }
    };

    React.useEffect(() => {
        console.log('Response Google: ', response)

        if (response?.type === 'success') {
            console.log('Response Exitosa.')
            // const { code } = response.params;
            // Aquí puedes manejar el código de autorización que se obtuvo después de un inicio de sesión exitoso.
            // Normalmente, enviarías este código a tu servidor, que lo cambiaría por un token de acceso.
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
                disabled={!request || !nonce}
                shadow={false}
                title={"Continuar con Google"}
                onPress={() => null}
                backgroundColor={theme.dark}
                WithBorder={true}
                borderColor={theme.tertiary}
                colorText={theme.primary}
                image={require('./GoogleLogo.png')}
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