import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';

export default function BigBottomButton ({ text, color, textColor, onPress, width, marginTop }) {
    
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: width,
                alignSelf: 'center',
                borderRadius: 10,
                borderWidth: 1,
                backgroundColor: color,
                borderColor: color,
                padding: 10,
                marginTop: marginTop,
                elevation: 50,
                shadowColor: theme_colors.black,
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }}
        >
            <TextStyled
                textAlign='center'
                fontSize={8}
                color={textColor}
                style={{
                    fontFamily: 'SFPro-Bold'
                }}
            >
                {text}
            </TextStyled>
        </TouchableOpacity>
    );
};