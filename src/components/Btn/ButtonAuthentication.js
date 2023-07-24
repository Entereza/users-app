import React from 'react';

//Importacion de Etiquetas de ReactNative
import { Pressable } from 'react-native';
import TextStyled from '../ui/TextStyled';
import ImageStyled from '../ui/ImageStyled';
import ViewStyled from '../ui/ViewStyled';


import { theme } from '../../utils/theme';
import { customStyles } from '../../utils/customStyles';
import adjustFontSize from '../../utils/adjustText';

export default function ButtonAuthentication({ disabled = false, title, onPress, image = require('./EnterezaLogo.png'), backgroundColor = theme.dark, colorText = theme.primary, showButton = 'flex', shadow = true, margin = true, borderColor = theme.transparent, WithBorder = false }) {
    return (
        <ViewStyled
            width={80}
            height={7}
            marginBottom={margin ? 2 : 0}
            backgroundColor={theme.transparent}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: showButton
            }}
        >
            <Pressable onPress={onPress} title={title} disabled={disabled}
                style={[
                    shadow && customStyles.shadowStyle,
                    {
                        width: '100%',
                        height: '100%',
                        backgroundColor: backgroundColor,
                        borderRadius: 15,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingLeft: 30,
                        borderColor: borderColor,
                        borderWidth: WithBorder ? 1 : 0
                    }
                ]}
            >
                <ViewStyled
                    width={8}
                    height={4}
                    marginRight={2.5}
                    backgroundColor={theme.transparent}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderColor: theme.danger,
                        // borderWidth: 1
                    }}
                >
                    <ImageStyled
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                        source={image}
                    />
                </ViewStyled>

                <TextStyled
                    fontSize={adjustFontSize(14)}
                    color={colorText}
                >
                    {title}
                </TextStyled>
            </Pressable >
        </ViewStyled>
    )
}