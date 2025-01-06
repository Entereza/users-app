import React from 'react'

import { StatusBar } from 'expo-status-bar'

import { theme_colors } from '../theme/theme_colors'

export default function StatusBarStyled({
  backgroundColor=theme_colors.primary,
  style='dark',
  barStyle='light-content',
  ...rest
}) {


  return (
    <StatusBar 
        style={ style }
        backgroundColor={ backgroundColor }
        translucent={ true }
        barStyle={ barStyle }
        {
            ...rest
        }
    />
  )
}