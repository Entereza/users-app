import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { FontAwesome } from '@expo/vector-icons'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function IndicatorItem({ indicator, iconSize = 16, fontSize = theme_textStyles.small }) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            style={{
                width: 'auto',
                height: 'auto',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
            }}
        >
            <FontAwesome name={indicator.icon} size={iconSize} color={theme_colors.primary} />
            <TextStyled
                fontFamily='SFPro-SemiBold'
                fontSize={fontSize}
                color={theme_colors.lightGrey2}
            >
                {indicator.title}
            </TextStyled>
        </ViewStyled>
    )
}