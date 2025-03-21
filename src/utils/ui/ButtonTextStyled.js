import React from 'react'

import { Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import { theme_colors } from '../theme/theme_colors'

import TextStyled from './TextStyled'
import ViewStyled from './ViewStyled'

export default function ButtonTextStyled({
    children,
    onPress,
    style={},
    color=theme_colors.secondary,
    backgroundColor=theme_colors.tertiaryGradient,
    disabled=false,
    fontSize=14,
    fontWeight="500",
    paddingHorizontal=5,
    paddingVertical=2,
    borderRadius=2,
    ...rest
}) {
  return (
    <Pressable
        onPress={onPress}
        style={style}            
        {
            ...rest
        }
    >
        <ViewStyled
            backgroundColor={ backgroundColor }
            style={[
                styles.button,
            ]}
            paddingHorizontal={paddingHorizontal}
            paddingVertical={disabled? 1:  paddingVertical}
            borderRadius={borderRadius}
        >
            <TextStyled
                fontSize={fontSize}
                fontWeight={fontWeight}
                color={ color }
                textAlign='center'
            >
                {
                    disabled
                        ? (
                            <ActivityIndicator size="large" color={ theme_colors.secondary } />
                        ): (
                            <>
                                {
                                    children
                                }
                            </>
                        )
                }
            </TextStyled>
        </ViewStyled>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        width: 'auto',
        height: 'auto',
    }
})