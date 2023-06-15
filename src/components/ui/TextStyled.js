import React from 'react'
import { Text } from 'react-native'


import { theme } from '../../utils/theme'

export default function TextStyled({
    children,
    fontSize=12,
    fontWeight='normal',
    color=theme.secondary,
    textAlign='left',
    fontFamily='BRFirma',
    style,
    ...rest
}) {
  return (
      <Text
        {...rest}
        style={[
            fontSize && {fontSize: (fontSize)},
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