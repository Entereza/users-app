import React, { useEffect } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ButtonAuthentication from '../../Buttons/ButtonAuthentication'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

export default function AuthButtons() {
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
        configureGoogleSignIn()
    }, [])

    // Google Sign In
    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices()

            const userInfo = await GoogleSignin.signIn()
            console.log(userInfo)
        } catch (error) {
            console.log(error)
        }
    }

    const listButtons = [
        {
            'title': 'Continuar con Google',
            'icon': require('../../../../assets/icons/logoGoogle.png'),
            'onPress': null,
            'backgroundColor': theme_colors.white,
            'borderColor': theme_colors.lightGrey,
            'colorText': theme_colors.black,
        },
        {
            'title': 'Continuar con Apple',
            'icon': require('../../../../assets/icons/logoApple.png'),
            'onPress': null,
            'backgroundColor': theme_colors.white,
            'borderColor': theme_colors.lightGrey,
            'colorText': theme_colors.black,
        },
        {
            'title': 'Continuar con Entereza',
            'icon': require('../../../../assets/icons/logoWhiteEntereza.png'),
            'onPress': null,
            'backgroundColor': theme_colors.primary,
            'borderColor': theme_colors.primary,
            'colorText': theme_colors.white,
        }
    ]

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
                        backgroundColor={button.backgroundColor}
                        borderColor={button.borderColor}
                        colorText={button.colorText}
                        WithBorder={true}
                        borderWidth={0.8}
                        margin={true}
                    />
                ))
            }
        </ViewStyled>
    )
}