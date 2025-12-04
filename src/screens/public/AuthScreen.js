import React from 'react'
import { StyleSheet } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import ImageStyled from '../../utils/ui/ImageStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import TermsConditions from '../../components/public/Auth/TermsConditions';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthButtons from '../../components/public/Auth/AuthButtons';

export default function AuthScreen() {
    const insets = useSafeAreaInsets();
    
    return (
        <ViewStyled
            backgroundColor={theme_colors.dark}
            style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
        >
            <ViewStyled
                width={80}
                height={20}
                backgroundColor={theme_colors.transparent}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ImageStyled
                    source={require('../../../assets/icons/logoWhiteEntereza.png')}
                    style={{
                        resizeMode: 'contain',
                        width: '100%',
                        height: '100%'
                    }}
                />
            </ViewStyled>

            <TextStyled
                textAlign='center'
                fontFamily='Artegra-Light'
                fontSize={theme_textStyles.large}
                color={theme_colors.white}
                style={{
                    marginTop: 10,
                    width: "100%",
                }}
            >
                {'¡Bienvenid@ a '}
                <TextStyled
                    fontFamily='Artegra-Bold'
                    textAlign='center'
                    fontSize={theme_textStyles.xlarge}
                    color={theme_colors.primary}
                    style={{
                        width: "100%",
                    }}
                >
                    {'Entereza'}
                </TextStyled>
                {'!'}
            </TextStyled>

            <AuthButtons />

            <TermsConditions />
        </ViewStyled>
    )
}