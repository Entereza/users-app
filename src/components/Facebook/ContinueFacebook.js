import * as React from 'react';

import { _authLogin } from '../../redux/actions/authActions'
import AlertStyled from '../ui/AlertStyled'
import { Modal, ActivityIndicator, Alert } from 'react-native';
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

    const SignInWithFB = async () => {
        const result = await LoginManager.logInWithPermissions(["public_profile", "email", "user_photos", "user_gender"])

        if (result.isCancelled) {
            console.log("Login cancelled");
            return;
        } else {
            console.log('Result LoginManager: ', result)
        }

        const data = await AccessToken.getCurrentAccessToken()
        console.log('Data: ', data)

        if (!data) {
            console.log('Something went wrong obtaining access token.')
        }

        const credential = FacebookAuthProvider.credential(data.accessToken);
        const userCredential = await signInWithCredential(auth, credential);
        const user = userCredential.user;
        const birthdayUser = await userCredential._tokenResponse.dateOfBirth;
        console.log('Credential: ', userCredential);

        // Extract user information
        const email = user.email || 'N/A';
        const birthday = birthdayUser || 'N/A';
        const firstName = user.providerData[0].displayName.split(' ')[0] || 'N/A';
        const lastName = user.providerData[0].displayName.split(' ')[1] || 'N/A';

        // Display user information in an alert
        Alert.alert(
            'User Information',
            `Email: ${email}\nBirthday: ${birthday}\nFirst Name: ${firstName}\nLast Name: ${lastName}`
        );
    }

    return (
        <>
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