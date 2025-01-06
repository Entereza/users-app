import React from 'react';
import { TouchableOpacity } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';

export default function ShowDetailsButton ({ text, size, onPress }) {
    
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                alignSelf: 'center',
                backgroundColor: theme_colors.transparent,
                borderColor: theme_colors.backgroundGrey,
            }}
        >
            <TextStyled
                    fontSize={4.5}
                    color={theme_colors.black}
                    style={{
                        marginTop: 10,
                        textDecorationLine: 'underline'
                    }}
                >
                {text}
            </TextStyled>
        </TouchableOpacity>
    );
};