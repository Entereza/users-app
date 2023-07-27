import * as React from 'react';

import { _authLogin } from '../../redux/actions/authActions'
import AlertStyled from '../ui/AlertStyled'
import { Modal, ActivityIndicator } from 'react-native';
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';
import { theme } from '../../utils/theme';
import ButtonAuthentication from '../Btn/ButtonAuthentication';

import app from '../../../firebaseSetup';
import { getAuth, FacebookAuthProvider, signInWithCredential } from 'firebase/auth'
import { LoginManager, AccessToken, AuthenticationToken, Settings, LoginButton } from 'react-native-fbsdk-next'

export default function ContinueFacebook({ display }) {
    const [text, setText] = React.useState('')
    const [Loading, setLoading] = React.useState(false)
    const auth = getAuth(app)

    Settings.setAppID('3933991310158655')
    Settings.setAppName('Entereza')


    Settings.initializeSDK()

    const SignInWithFB = async () => {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                    return;
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                }
            },
        ).then(async() => {
            const data = await AccessToken.getCurrentAccessToken()
            console.log('Data: ', data)

            if (!data) {
                console.log('Something went wrong obtaining access token.')
            }

            const credential = FacebookAuthProvider.credential(data.accessToken)
            const user = await signInWithCredential(auth, credential);
            console.log(user);
        })
    }

    return (
        <>
            {/* <LoginButton
                permissions={['public_profile', 'email']}
                onLoginFinished={
                    (error, result) => {
                        console.log(result)
                        if (error) {
                            console.log("login has error: " + result.error);
                        } else if (result.isCancelled) {
                            console.log("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    console.log(data.accessToken.toString())
                                }
                            )
                        }
                    }
                }
                onLogoutFinished={() => console.log("logout.")}

            /> */}
            <ButtonAuthentication
                shadow={false}
                title={"Continuar con Facebook"}
                onPress={SignInWithFB}
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