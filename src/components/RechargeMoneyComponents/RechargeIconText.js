import React from 'react'
import { Entypo } from '@expo/vector-icons'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import adjustFontSize from '../../utils/ui/adjustText'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function RechargeIconText({
    iconName,
    primaryText,
    secondaryText,
    textColor = theme_colors.black,
    style
}) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            style={[
                {
                    width: 'auto',
                    height: 'auto',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, style && style
            ]}
        >
            <Entypo
                name={iconName}
                size={adjustFontSize(theme_textStyles.xlarge)}
                color={theme_colors.dark}
                style={{
                    marginRight: 5
                }}
            />

            <TextStyled
                fontFamily={'SFPro-Bold'}
                textAlign={'center'}
                fontSize={theme_textStyles.medium}
                color={textColor}
            >
                {primaryText}
            </TextStyled>

            <TextStyled
                fontFamily={'SFPro-Medium'}
                textAlign={'center'}
                fontSize={theme_textStyles.medium}
                color={textColor}
            >
                {secondaryText}
            </TextStyled>
        </ViewStyled>
    )
}