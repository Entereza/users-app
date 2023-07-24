import React from 'react'
import { ActivityIndicator } from 'react-native';
// import { useFonts } from 'expo-font'
import ViewStyled from '../components/ui/ViewStyled';
import { theme } from '../utils/theme';
import ImageStyled from '../components/ui/ImageStyled';
import TextStyled from '../components/ui/TextStyled';
import adjustFontSize from '../utils/adjustText';

export default function LoaderScreen({ textUpdates, updateAvailable }) {
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
            <ViewStyled
                width={50}
                height={30}
                backgroundColor={theme.transparent}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ImageStyled
                    source={require('../../assets/img/EnterezaLogoColors.png')}
                    style={{
                        resizeMode: 'contain',
                        width: '100%',
                        height: '100%'
                    }}
                />
            </ViewStyled>

            <TextStyled
                fontFamily='ArtegraBold'
                fontSize={adjustFontSize(16)}
                color={theme.primary}
            >
                {
                    textUpdates
                        ? updateAvailable
                            ? `Actualizando Entereza...`
                            : `Verificando Actualizaciones...`
                        : `Cargando Datos...`
                }
            </TextStyled>

            <ActivityIndicator size="large" color={theme.secondary} style={{ marginTop: 15 }} />
        </ViewStyled>
    );
}