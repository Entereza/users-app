import React from 'react'
import { TouchableOpacity } from 'react-native'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../utils/ui/adjustText'

export default function InfoField({
    typeIcon = "MaterialCommunityIcons",
    icon = "information",
    label = "Label",
    value = "Value",
    secondaryValue = "SecValue",
    emptyValues = "EmptyValues",
    onPress = null
}) {
    const hasValues = value !== "" && secondaryValue !== ""

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <ViewStyled
                backgroundColor={theme_colors.white}
                width={95}
                marginBottom={2}
                paddingVertical={1}
                style={{
                    height: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,

                    shadowColor: theme_colors.black,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 3,
                }}
            >
                <ViewStyled
                    paddingVertical={1.5}
                    marginBottom={1}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '90%',
                        height: 'auto',
                        borderBottomWidth: 0.5,
                        borderColor: theme_colors.greyLine,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        fontFamily='SFPro-Bold'
                        textAlign='left'
                        fontSize={theme_textStyles.medium}
                        color={theme_colors.dark}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                            width: '100%'
                        }}
                    >
                        {label}
                    </TextStyled>
                </ViewStyled>

                <ViewStyled
                    paddingVertical={1}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '90%',
                        height: 'auto',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {typeIcon === "MaterialCommunityIcons" &&
                        <MaterialCommunityIcons
                            name={icon}
                            color={theme_colors.dark}
                            size={adjustFontSize(theme_textStyles.medium)}
                        />
                    }

                    {typeIcon === "FontAwesome6" &&
                        <FontAwesome6
                            name={icon}
                            color={theme_colors.dark}
                            size={adjustFontSize(theme_textStyles.medium)}
                        />
                    }

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{
                            width: '80%',
                            height: 'auto',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextStyled
                            fontFamily='SFPro-SemiBold'
                            textAlign='left'
                            fontSize={hasValues ? theme_textStyles.smedium : theme_textStyles.small + .5}
                            color={hasValues ? theme_colors.black : "#5D5D5D"}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{
                                width: '100%',
                                marginBottom: 2
                            }}
                        >
                            {hasValues ? value : emptyValues}
                            {hasValues &&
                                <TextStyled
                                    fontFamily='SFPro-Regular'
                                    textAlign='left'
                                    fontSize={theme_textStyles.small + .5}
                                    color={"#5D5D5D"}
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                >
                                    {`   ${secondaryValue}`}
                                </TextStyled>
                            }
                        </TextStyled>
                    </ViewStyled>

                    <FontAwesome6
                        name={hasValues ? 'pencil' : 'plus'}
                        color={theme_colors.lightGrey2}
                        size={adjustFontSize(theme_textStyles.smedium)}
                    />
                </ViewStyled>
            </ViewStyled>
        </TouchableOpacity>
    )
}