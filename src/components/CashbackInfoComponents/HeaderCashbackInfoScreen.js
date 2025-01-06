import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { theme_colors } from '../../utils/theme/theme_colors'
import ViewStyled from '../../utils/ui/ViewStyled'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../utils/ui/adjustText'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function HeaderCashbackInfoScreen({ goBack }) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            width={95}
            height={8}
            marginBottom={1}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}
        >
            <Pressable
                onPress={goBack}
                style={{
                    left: 0,
                    position: 'absolute'
                }}
            >
                <ViewStyled
                    width={12}
                    height={6}
                    borderRadius={1}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',

                        borderWidth: 1,
                        borderColor: theme_colors.white
                    }}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={adjustFontSize(theme_textStyles.xlarge)}
                        color={theme_colors.white}
                    />
                </ViewStyled>
            </Pressable>
        </ViewStyled>
    )
}