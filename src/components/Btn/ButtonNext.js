import React from 'react';

//Importacion de Etiquetas de ReactNative
import { TouchableOpacity } from 'react-native';
import TextStyled from '../ui/TextStyled';
import ViewStyled from '../ui/ViewStyled';

import { theme } from '../../utils/theme';

export default function ButtonNext({ text, onPress, width = 100, height = 7, fontSize = 16 , color = theme.secondary, colorText = theme.primary, disabled = false }) {
    return (
        <ViewStyled
            backgroundColor={theme.transparent}
            width={width}
            height={height}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity onPress={onPress} disabled={disabled}>
                <ViewStyled
                    width={width}
                    height={height - 1}
                    backgroundColor={color}
                    borderRadius={2}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TextStyled
                        fontSize={fontSize}
                        color={colorText}
                        style={{
                            marginBottom: 4,
                            // fontFamily: 'Raleway',
                        }}>
                        {text}
                    </TextStyled>
                </ViewStyled>
            </TouchableOpacity >
        </ViewStyled>
    )
}