import React from 'react'
import { Pressable } from 'react-native'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../utils/ui/adjustText'

export default function HeaderCodeEnterezaScreen({ goBack }) {
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
                        size={adjustFontSize(25)}
                        color={theme_colors.white}
                    />
                </ViewStyled>
            </Pressable>
        </ViewStyled>
    )
}