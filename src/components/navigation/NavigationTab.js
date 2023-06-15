// REACT 
import React from 'react'

// CUSTOM 
import adjustFontSize from '../../utils/adjustText'
import { theme } from '../../utils/theme'
import TextStyled from '../ui/TextStyled'
import ViewStyled from '../ui/ViewStyled'

export default function NavigationTab({
    children,
    focused,
    label,
    labelStyle,
    style
}) {
  return (
    <ViewStyled
        style={[
            {
                width: 'auto',
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
            },
            style && style,
        ]}
    >
        {
            children
        }
        <TextStyled
            fontSize={ focused? adjustFontSize(11): adjustFontSize(10) }
            color={ focused? theme.secondary : theme.tertiary }
            style={[
                {
                    //transition: 'all 0.4s ease',
                },
                labelStyle && labelStyle,
            ]}
        >
            {
                label
            }
        </TextStyled>
    </ViewStyled>
  )
}