import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { theme_colors } from '../../utils/theme/theme_colors'
import ViewStyled from '../../utils/ui/ViewStyled'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../utils/ui/adjustText'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function ProfileOptionsItem({
    nameOption,
    iconOption,
    onPress
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: '93%',
                backgroundColor: theme_colors.transparent,
                marginBottom: 5
            }}
        >
            <ViewStyled
                height={6}
                backgroundColor={theme_colors.transparent}
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <ViewStyled
                    borderRadius={1}
                    backgroundColor={theme_colors.categoryGrey}
                    style={{
                        width: '13%',
                        height: '90%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MaterialCommunityIcons
                        name={iconOption}
                        size={adjustFontSize(theme_textStyles.large)}
                        color={theme_colors.secondary}
                    />
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '70%',
                        height: '90%',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-SemiBold'
                        textAlign='left'
                        fontSize={theme_textStyles.smedium}
                        color={theme_colors.black}
                    >
                        {nameOption}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: 'auto',
                        height: '90%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MaterialCommunityIcons
                        name={"chevron-right"}
                        size={adjustFontSize(theme_textStyles.xlarge)}
                        color={theme_colors.grey}
                    />
                </ViewStyled>

            </ViewStyled>
        </TouchableOpacity>
    )
}