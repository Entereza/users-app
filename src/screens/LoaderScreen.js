import React from 'react'
import { ActivityIndicator } from 'react-native';
// import { useFonts } from 'expo-font'
import ViewStyled from '../components/ui/ViewStyled';
import { theme } from '../utils/theme';
import ImageStyled from '../components/ui/ImageStyled';

export default function LoaderScreen() {
    return (
        <ViewStyled
            width={100}
            height={100}
            backgroundColor={theme.dark}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ImageStyled
                width={50}
                height={30}
                source={require('../../assets/img/EnterezaLogoColors.png')}
                style={{
                    resizeMode: 'contain',
                }}
            />
            <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 15 }} />
        </ViewStyled>
    );
}