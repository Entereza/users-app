import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import { FontAwesome6 } from '@expo/vector-icons';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';

export default function HomeButton({ text, icon, onPress }) {

    return (
        <ViewStyled
            style={{
                width: 'auto',
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme_colors.transparent,
            }}
        >
            <TouchableOpacity
                onPress={onPress}
            >
                <ViewStyled
                    marginBottom={1}
                    width={11}
                    height={5}
                    borderRadius={1}
                    backgroundColor={'#6F6F70'}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <FontAwesome6 name={icon} color={theme_colors.white} size={20} />
                </ViewStyled>
            </TouchableOpacity>

            <TextStyled
                fontSize={theme_textStyles.smaller + .5}
                fontFamily='SFPro-Medium'
                color={theme_colors.white}
                numberOfLines={1}
                ellipsizeMode='tail'
            >
                {text}
            </TextStyled>
        </ViewStyled>
    );
};