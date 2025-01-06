import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';

export default function BiggerGeneralButton ({ text, margin, color, onPress }) {
    
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: 115,
                alignSelf: 'center',
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: color,
                borderColor: color,
                padding: 10,
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
                fontSize={7}
                color={theme_colors.white}
                style={{
                    width: "100%",
                    fontFamily: 'SFPro-Bold'
                }}
            >
                {text}
            </TextStyled>
        </TouchableOpacity>
    );
};