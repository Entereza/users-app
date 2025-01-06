import React from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../../utils/ui/adjustText'
import TextStyled from '../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'

export default function PaymentInfo({
    iconName,
    text,
    textColor = theme_colors.black,
    style
}) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            height={3}
            style={[
                {
                    width: 'auto',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, style && style
            ]}
        >
            <MaterialCommunityIcons
                name={iconName}
                size={adjustFontSize(theme_textStyles.smedium)}
                color={theme_colors.dark}
                style={{
                    marginRight: 5
                }}
            />

            <TextStyled
                fontFamily={'SFPro-Medium'}
                textAlign={'center'}
                fontSize={theme_textStyles.small}
                color={textColor}
            >
                {text}
            </TextStyled>
        </ViewStyled>
    )
}