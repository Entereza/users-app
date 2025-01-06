import React from 'react';
import { ActivityIndicator } from 'react-native';
import ViewStyled from '../utils/ui/ViewStyled';
import { theme_colors } from '../utils/theme/theme_colors';
import ImageStyled from '../utils/ui/ImageStyled';
import TextStyled from '../utils/ui/TextStyled';

export default function LoaderScreen() {
    return (
        <ViewStyled
            width={100}
            height={100}
            backgroundColor={theme_colors.dark}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ViewStyled
                width={50}
                height={30}
                marginBottom={2}
                backgroundColor={theme_colors.transparent}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ImageStyled
                    source={require('../../assets/icons/IconColorsEntereza.png')}
                    style={{
                        resizeMode: 'contain',
                        width: '100%',
                        height: '100%'
                    }}
                />
            </ViewStyled>

            <TextStyled
                fontSize={30}
                color={theme_colors.white}
                fontFamily='Artegra-SemiBold'
            >
                {
                    `Cargando datos...`
                }
            </TextStyled>

            <ActivityIndicator
                size="large"
                color={theme_colors.white}
                style={{ marginTop: 15 }}
            />
        </ViewStyled>
    );
}
