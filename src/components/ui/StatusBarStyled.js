import React from 'react'

import { StatusBar } from 'expo-status-bar'

import { theme } from '../../utils/theme'

export default function StatusBarStyled({
  backgroundColor=theme.primary,
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