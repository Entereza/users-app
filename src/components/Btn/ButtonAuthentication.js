import React from 'react';

//Importacion de Etiquetas de ReactNative
import { ActivityIndicator, Pressable } from 'react-native';
import TextStyled from '../ui/TextStyled';
import ImageStyled from '../ui/ImageStyled';
import ViewStyled from '../ui/ViewStyled';


import { theme } from '../../utils/theme';
import { customStyles } from '../../utils/customStyles';
import adjustFontSize from '../../utils/adjustText';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default function ButtonAuthentication({
    disabled = false,
    title,
    onPress,
    image = require('./EnterezaLogo.png'),
    backgroundColor = theme.dark,
    colorText = theme.primary,
    showButton = 'flex',
    shadow = true,
    margin = true,
    borderColor =
    theme.transparent,
    WithBorder = false,
    loading = false
}) {
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
                        paddingLeft: 25,
                        borderColor: borderColor,
                        borderWidth: WithBorder ? 1 : 0
                    }
                ]}
            >
                {
                    loading
                        ? <ActivityIndicator size="large" color={theme.secondary} style={{ marginRight: widthPercentageToDP(1.6) }} />
                        : <ViewStyled
                            width={8}
                            height={4}
                            marginRight={3}
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
                }

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