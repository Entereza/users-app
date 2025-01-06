import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';

export default function GeneralButton ({ text, isSelected, onPress }) {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: '50%',
                alignSelf: 'center',
                borderRadius: 10,
                borderWidth: 1,
                backgroundColor: isSelected ? theme_colors.primary : theme_colors.white,
                borderColor: isSelected ? theme_colors.primary : theme_colors.requiredGrey,
                padding: 10
            }}
        >
            <TextStyled
                textAlign='center'
                fontSize={7}
                color={isSelected ? theme_colors.white : theme_colors.black}
                style={{
                    fontFamily: 'SFPro-Bold'
                }}
            >
                {text}
            </TextStyled>
        </TouchableOpacity>
    );
};