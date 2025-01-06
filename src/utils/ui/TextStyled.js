import React from 'react'
import { Text } from 'react-native'
import { theme_colors } from '../theme/theme_colors'
import adjustFontSize from './adjustText'

export default function TextStyled({
    children,
    fontSize=12,
    fontWeight='normal',
    color=theme_colors.secondary,
    textAlign='left',
    fontFamily='SFPro-Regular',
    style,
    ...rest
}) {
  return (
      <Text
        {...rest}
        style={[
            fontSize && {fontSize: adjustFontSize(fontSize)},
            fontWeight && {fontWeight: fontWeight},
            color && {color: color},
            textAlign && {textAlign: textAlign},
            {
                fontFamily: fontFamily,
            },
            style && style,
        ]}
      >
        {
            children
        }
      </Text>
  )
}