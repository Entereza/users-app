import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import { theme_colors } from '../../utils/theme/theme_colors';
import ViewStyled from '../../utils/ui/ViewStyled';
import ImageStyled from '../../utils/ui/ImageStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';

export default function ButtonAuthentication({
    disabled = false,
    title,
    onPress,
    image = require('../../../assets/favicon.png'),
    backgroundColor = theme_colors.primary,
    colorText = theme_colors.white,
    showButton = 'flex',
    margin = true,
    borderColor = theme_colors.transparent,
    WithBorder = false,
    loading = false,
    borderWidth = 1
}) {
    return (
        <ViewStyled
            width={80}
            height={7}
            marginBottom={margin ? 2 : 0}
            backgroundColor={theme_colors.transparent}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: showButton
            }}
        >
            <TouchableOpacity onPress={onPress} title={title} disabled={disabled} activeOpacity={0.6}
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: backgroundColor,
                    borderRadius: 15,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingLeft: 30,
                    borderColor: borderColor,
                    borderWidth: WithBorder ? borderWidth : 0
                }}
            >
                {
                    loading
                        ? <ActivityIndicator size="large" color={colorText} style={{ marginRight: widthPercentageToDP(1.6) }} />
                        : <ViewStyled
                            width={8}
                            height={4}
                            marginRight={5}
                            backgroundColor={theme_colors.transparent}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
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
                    fontFamily='SFPro-SemiBold'
                    fontSize={theme_textStyles.smedium}
                    color={colorText}
                >
                    {title}
                </TextStyled>
            </TouchableOpacity >
        </ViewStyled>
    )
}