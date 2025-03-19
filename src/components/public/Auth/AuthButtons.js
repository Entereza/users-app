import React, { useEffect, useState } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ButtonAuthentication from '../../Buttons/ButtonAuthentication'
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../../../utils/tools/interface/authStore';
import { public_name_routes } from '../../../utils/route/public_name_routes';
import { authService } from '../../../services/api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toastService } from '../../../utils/tools/interface/toastService';
import { notificationService } from '../../../services/notifications/notificationService';
import useNotificationStore from '../../../utils/tools/interface/notificationStore';

export default function AuthButtons() {
    const { setUserData } = useAuthStore();
    const navigation = useNavigation();
    const { setExpoPushToken, setNotificationListeners, setIsNotificationsEnabled } = useNotificationStore();

    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingApple, setLoadingApple] = useState(false);

    // Configure Google Sign In
    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            scopes: ['email'],
            webClientId: '511900415351-b1g7213gfgt8ur96qqfnlinf9rjardj8.apps.googleusercontent.com',
            iosClientId: '511900415351-ej15snog5mn00ikjcbuqeqa1pap18nkn.apps.googleusercontent.com',
            androidClientId: '511900415351-o4h1055kmlku12n50vn9vrto3k04jls2.apps.googleusercontent.com',
        })
    }

    useEffect(() => {
        configureGoogleSignIn();
        return () => {
            // Cleanup notification listeners on unmount
            const { notificationListeners } = useNotificationStore.getState();
            if (notificationListeners) {
                notificationService.removeNotificationListeners(notificationListeners);
            }
        };
    }, []);

    const handleNotificationsSetup = async (userId) => {
        const notificationSetup = await notificationService.initializeNotificationsAfterLogin(userId);
        if (notificationSetup) {
            const { token, listeners } = notificationSetup;
            setExpoPushToken(token);
            setNotificationListeners(listeners);
            setIsNotificationsEnabled(true);
        }
    };

    // Set Fake UserData
    const setUserDataFake = (token) => {
        if (token) {
            AsyncStorage.setItem('token', token)
        }
        setUserData({
            names: "Anelisse",
            lastNames: "Rocabado",
            phoneNumber: 75469425,
            ci: 7820697,
            cashback: 50,
            email: "anelisserocabado@gmail.com",
            password: "12345678",
            image: ""
        })
    }

    // Google Sign In
    const signInWithGoogle = async () => {
        try {
            setLoadingGoogle(true);
            await GoogleSignin.hasPlayServices()

            const userInfo = await GoogleSignin.signIn()
            // Try signup first
            try {
                const signupResponse = await authService.signupWithGoogle({
                    token_id: userInfo.idToken
                });

                console.log('SignupResponse: ', signupResponse)

                if (signupResponse.code === 'COD200') {
                    return;
                }
            } catch (signupError) {
                console.log('Signup failed, trying login:', signupError);
                if (signupError.message !== 'Usuario ya existe') {
                    toastService.showErrorToast(signupError.message || "Error en el registro");
                }
            }

            // If signup fails, try login
            try {
                const loginResponse = await authService.loginWithGoogle({
                    token_id: userInfo.idToken
                });

                console.log('LoginRsponse: ', loginResponse)

                if (loginResponse.code === 'COD200') {
                    AsyncStorage.setItem('token', loginResponse.token)
                    AsyncStorage.setItem('userId', loginResponse.client.id.toString())

                    let userData = {
                        id: loginResponse.client.id,
                        names: loginResponse.client.names,
                        lastNames: loginResponse.client.lastnames,
                        phoneNumber: loginResponse.client.phoneNumber,
                        ci: loginResponse.client.carnet,
                        cashback: loginResponse.client.cashback,
                        email: loginResponse.client.email,
                        image: loginResponse.client.img,
                        password: loginResponse.client.password,
                        status: loginResponse.client.status,
                        username: loginResponse.client.username,
                    }
                    setUserData(userData);
                    AsyncStorage.setItem('userData', JSON.stringify(userData));

                    // Initialize notifications after successful login
                    await handleNotificationsSetup(loginResponse.client.id);
                } else {
                    toastService.showErrorToast(loginResponse.msg || "Error al iniciar sesión");
                }
            } catch (loginError) {
                console.error('Login failed:', loginError);
                toastService.showErrorToast(loginError.message || "Error al iniciar sesión con Google");
                throw loginError;
            }
        } catch (error) {
            console.log('Google Error: ', error);
            toastService.showErrorToast("Hubo un problema al autenticar con Google");
        } finally {
            setLoadingGoogle(false);
        }
    }

    // Apple Sign In
    const signInWithApple = async () => {
        try {
            setLoadingApple(true);
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });

            // credential.user is the unique identifier for this user
            console.log('Apple Credential: ', credential);
            setUserDataFake();
            
            // Initialize notifications after successful Apple login
            if (credential.user) {
                await handleNotificationsSetup(credential.user);
            }
            
            return credential;
        } catch (error) {
            if (error.code === 'ERR_CANCELED') {
                console.log('User canceled Apple Sign in');
            } else {
                console.error('Error during Apple Sign in:', error);
                toastService.showErrorToast("Error al iniciar sesión con Apple");
            }
        } finally {
            setLoadingApple(false);
        }
    }

    // Entereza Sign In
    const signInWithEntereza = async () => {
        navigation.navigate(public_name_routes.auth.signIn)
    }

    const isAnyLoading = loadingGoogle || loadingApple;

    const listButtons = [
        {
            'title': 'Continuar con Google',
            'icon': require('../../../../assets/icons/logoGoogle.png'),
            'onPress': signInWithGoogle,
            'backgroundColor': theme_colors.white,
            'borderColor': theme_colors.lightGrey,
            'colorText': theme_colors.black,
            'loading': loadingGoogle,
            'disabled': isAnyLoading
        },
        ...(Platform.OS === 'ios' ? [{
            'title': 'Continuar con Apple',
            'icon': require('../../../../assets/icons/logoApple.png'),
            'onPress': signInWithApple,
            'backgroundColor': theme_colors.white,
            'borderColor': theme_colors.lightGrey,
            'colorText': theme_colors.black,
            'loading': loadingApple,
            'disabled': isAnyLoading
        }] : []),
        {
            'title': 'Continuar con Entereza',
            'icon': require('../../../../assets/icons/logoWhiteEntereza.png'),
            'onPress': signInWithEntereza,
            'backgroundColor': theme_colors.primary,
            'borderColor': theme_colors.primary,
            'colorText': theme_colors.white,
            'loading': false,
            'disabled': isAnyLoading
        }
    ]

    const pass = () => {
        setUserData({
            names: "Anelisse",
            lastNames: "Rocabado",
            phoneNumber: 75469425,
            ci: 7820697,
            cashback: 50,
            email: 'anelisse@gmail.com',
            password: '12345678',
            image: ""
        });
    }

    return (
        <ViewStyled
            width={100}
            height={40}
            backgroundColor={theme_colors.transparent}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {
                listButtons.map((button, index) => (
                    <ButtonAuthentication
                        key={index}
                        title={button.title}
                        image={button.icon}
                        onPress={button.onPress}
                        // onPress={pass}
                        backgroundColor={button.backgroundColor}
                        borderColor={button.borderColor}
                        colorText={button.colorText}
                        WithBorder={true}
                        borderWidth={0.8}
                        margin={true}
                        loading={button.loading}
                        disabled={button.disabled}
                    />
                ))
            }
        </ViewStyled>
    )
}