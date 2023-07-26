import * as React from 'react';

import { _authLogin } from '../../redux/actions/authActions'
import AlertStyled from '../ui/AlertStyled'
import { Modal, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';
import { theme } from '../../utils/theme';

import ButtonAuthentication from '../Btn/ButtonAuthentication';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure();
export default function ContinueGoogle({ shadow }) {

    const [text, setText] = React.useState('')
    const [Loading, setLoading] = React.useState(false)

    const [user, setUser] = React.useState({})

    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId: '511900415351-u8a9qj8q91nc2d6jan3vvhoqhajir6v8.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            scopes: [
                'profile',
                'email',
                'openid',
                'https://www.googleapis.com/auth/user.phonenumbers.read', // Para acceder al número de teléfono
                'https://www.googleapis.com/auth/user.birthday.read', // Para acceder a la fecha de nacimiento
            ]
        });

        isSignedIn()
    }, [])

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices()

            const userInfo = await GoogleSignin.signIn();
            console.log('due___', userInfo)
            setUser(userInfo)
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

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();

        if (!!isSignedIn) {
            getCurrentInfoAsync()
        } else {
            console.log('Please Login')
        }
    }

    const getCurrentInfoAsync = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log('edit_____', userInfo)
            setUser({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log('user has not signed in yet ')
                // user has not signed in yet
            } else {
                console.log('error total getCurrentUserInfo')
                // some other error
            }
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUser({}); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {
                !user.idToken
                    ? <ButtonAuthentication
                        disabled={false}
                        shadow={false}
                        title={"Continuar con Google"}
                        onPress={signIn}
                        backgroundColor={theme.dark}
                        WithBorder={true}
                        borderColor={theme.tertiary}
                        colorText={theme.primary}
                        image={require('./GoogleLogo.png')}
                    />
                    : <ButtonAuthentication
                        disabled={false}
                        shadow={false}
                        title={"Cerrar Sesión de Google"}
                        onPress={signOut}
                        backgroundColor={theme.dark}
                        WithBorder={true}
                        borderColor={theme.tertiary}
                        colorText={theme.primary}
                        image={require('./GoogleLogo.png')}
                    />
            }

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