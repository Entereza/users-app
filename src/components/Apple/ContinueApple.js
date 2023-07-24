import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { codeErrors } from '../../utils/codeErrors'
import * as AppleAuthentication from 'expo-apple-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { _authLogin } from '../../redux/actions/authActions';
import { fetchWithoutToken } from '../../utils/fetchWithoutToken';
import { Modal, ActivityIndicator, Alert } from 'react-native';
import ViewStyled from '../ui/ViewStyled';
import TextStyled from '../ui/TextStyled';
import { theme } from '../../utils/theme';
import ButtonAuthentication from '../Btn/ButtonAuthentication';

export default function ContinueApple({ display, shadow }) {
    const [text, setText] = useState('')
    const [Loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const RegisterApple = async () => {
        try {
            setText('Registrando con Apple...')
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            console.log('Credential apple: ', credential)

            var data = {
                token_id: credential.identityToken,
                user_code: credential.user
            }
            console.log('Data Send Apple: ', data)

            setLoading(true)
            const res = await fetchWithoutToken("entereza/apple_sign_up", "POST", data);
            const response = await res.json();
            console.log("Back Apple: ", response)
            setLoading(false)

            if (response.codeError === "COD200") {
                console.log('Reponse Mensaje: ', response.msgError)
                setText('Iniciando Sesión con Apple...')

                setLoading(true)
                var data = {
                    token_id: credential.identityToken,
                    user_code: credential.user
                }
                console.log("Send Data Apple:", data)

                const res = await fetchWithoutToken("entereza/login_apple", "POST", data)

                const {
                    entereza,
                    mail,
                    codigoEntidad,
                    jwt,
                    rol,
                    ...rest
                } = await res.json()
                console.log("SignUp Apple Res: ", entereza)

                if (entereza.codeError === codeErrors.cod200) {
                    await Promise.all([
                        AsyncStorage.setItem('ENT-EMAIL', mail),
                        AsyncStorage.setItem('ENT-CODUSR', codigoEntidad),
                        AsyncStorage.setItem('ENT-TKN', jwt)
                    ])
                    dispatch(_authLogin(data))

                } else {
                    Alert.alert('Error al Iniciar Sesion con Apple', entereza.msgError)
                }
                setLoading(false)
            } else {
                Alert.alert('Error al registrar con Apple', response.msgError)
            }
        } catch (e) {
            setLoading(false)
            console.log("Error Apple::", e)
            if (e.code === 'ERR_CANCELED') {
                Alert.alert('Error al registrar con Apple', 'El registro fue cancelado.')
            }
        }
    }

    return (
        <>
            <ButtonAuthentication
                shadow={false}
                title={"Continuar con Apple"}
                onPress={() => null}
                backgroundColor={theme.dark}
                WithBorder={true}
                borderColor={theme.tertiary}
                colorText={theme.primary}
                image={require('./AppleLogo.png')}
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