import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { theme_colors } from '../../utils/theme/theme_colors'
import ViewStyled from '../../utils/ui/ViewStyled'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function SelectOptionItem({
    onPress,
    nameOption,
    isActive,
    activeColor = theme_colors.primary,
    inactiveColor = theme_colors.grey,
    textColor = theme_colors.dark,
    disabled
}) {
    return (
        <TouchableOpacity
            disabled={isActive || disabled}
            onPress={onPress}
            style={{
                width: '40%'
            }}
        >
            <ViewStyled
                height={5}
                backgroundColor={theme_colors.transparent}
                style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomWidth: 2,
                    borderBottomColor: isActive ? activeColor : inactiveColor
                }}
            >
                <TextStyled
                    fontSize={theme_textStyles.medium}
                    color={isActive ? textColor : inactiveColor}
                    fontFamily={isActive ? 'SFPro-Bold' : 'SFPro-SemiBold'}
                >
                    {nameOption}
                </TextStyled>
            </ViewStyled>
        </TouchableOpacity>
    )
}