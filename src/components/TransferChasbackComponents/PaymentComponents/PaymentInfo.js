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
    style,
    textAlign = 'left'
}) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            height={3}
            paddingLeft={textAlign !== 'center' ? 3 : 0}
            style={[
                {
                    width: textAlign !== 'center' ? 'auto' : '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, style && style
            ]}
        >
            <MaterialCommunityIcons
                name={iconName}
                size={adjustFontSize(theme_textStyles.smedium)}
                color={theme_colors.primary}
                style={{
                    marginRight: 5
                }}
            />

            <TextStyled
                fontFamily={'SFPro-Medium'}
                textAlign={textAlign}
                fontSize={theme_textStyles.small}
                color={textColor}
                numberOfLines={1}
                style={{
                    marginTop: 3,
                }}
            >
                {text}
            </TextStyled>
        </ViewStyled>
    )
}