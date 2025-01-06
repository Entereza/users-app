import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import TextStyled from '../../utils/ui/TextStyled'
import { TouchableOpacity } from 'react-native'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function NumberButton({
    value,
    onPress
}) {
    return (
        <ViewStyled
            height={9}
            backgroundColor={theme_colors.transparent}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '33%',
            }}
        >
            <TouchableOpacity
                key={value}
                onPress={() => onPress(value)}
                style={{
                    width: 'auto',
                    height: 'auto',
                    paddingHorizontal: 15
                }}
            >
                <TextStyled
                    fontFamily='SFPro-SemiBold'
                    textAlign='center'
                    fontSize={theme_textStyles.large}
                    color={theme_colors.black}
                    style={{
                        width: "100%",
                    }}
                >
                    {value}
                </TextStyled>
            </TouchableOpacity>
        </ViewStyled>
    )
}