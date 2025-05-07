import React from 'react';

//Importacion de Etiquetas de ReactNative
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons as MatIconsComponent } from '@expo/vector-icons';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import ViewStyled from '../../utils/ui/ViewStyled';

import TextStyled from '../../utils/ui/TextStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import adjustFontSize from '../../utils/ui/adjustText';

export default function ButtonWithIcon({
    textButton,
    iconName = "apps",
    MaterialIcons = false,
    MatIcons = false,
    FontAwesome = false,
    EntypoIcon = false,
    onPress,

    width = 100,
    height = 7,
    widthIcon = 7,
    heightIcon = 6,

    fontSize = 12,
    fontFamily = 'SFPro-Medium',
    sizeIcon = 20,

    borderColor = theme_colors.secondary,
    borderWidth = 1,
    borderRadius = 15,

    withIcon = true,

    marginRightIcon = 10,

    backgroundColor = theme_colors.primary,
    colorText = theme_colors.black,
    colorIcon = colorIcon ? colorIcon : colorText,

    loading,
    sizeLoader = "small",

    disabled = false,
    style
}) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            width={width}
            height={height}
            style={[
                style && style,
                {
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            ]}
        >
            <TouchableOpacity
                disabled={disabled}
                onPress={onPress}
                style={[
                    {
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: borderWidth,
                        width: '100%',
                        height: '100%',
                        borderRadius: heightPercentageToDP(borderRadius),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                ]}
            >
                {
                    loading
                    && <ActivityIndicator
                        size={sizeLoader}
                        color={colorText}
                        style={{ marginRight: 10 }}
                    />
                }
                {withIcon &&
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        width={widthIcon}
                        height={heightIcon}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: marginRightIcon
                        }}
                    >
                        {
                            MaterialIcons
                                ? <MaterialCommunityIcons
                                    name={iconName}
                                    size={adjustFontSize(sizeIcon)}
                                    color={colorIcon}
                                />
                                : MatIcons
                                    ? <MatIconsComponent
                                        name={iconName}
                                        size={adjustFontSize(sizeIcon)}
                                        color={colorIcon}
                                    />
                                    : FontAwesome
                                        ? <FontAwesome5
                                            name={iconName}
                                            size={adjustFontSize(sizeIcon)}
                                            color={colorIcon}
                                        />
                                        : EntypoIcon
                                            ? <Entypo
                                                name={iconName}
                                                size={adjustFontSize(sizeIcon)}
                                                color={colorIcon}
                                            />
                                            : <Ionicons
                                                name={iconName}
                                                size={adjustFontSize(sizeIcon)}
                                                color={colorIcon}
                                            />
                        }
                    </ViewStyled>
                }
                <TextStyled
                    fontFamily={fontFamily}
                    fontSize={fontSize}
                    color={colorText}
                    style={{
                        marginTop: 2
                    }}
                >
                    {textButton}
                </TextStyled>
            </TouchableOpacity>
        </ViewStyled>
    )
}