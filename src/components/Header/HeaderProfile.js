import React from "react";
import ViewStyled from "../../utils/ui/ViewStyled";
import TextStyled from "../../utils/ui/TextStyled";
import { Image, TouchableOpacity } from "react-native";
import { theme_colors } from "../../utils/theme/theme_colors";
import ImageStyled from "../../utils/ui/ImageStyled";
import { theme_textStyles } from "../../utils/theme/theme_textStyles";

export default function HeaderProfile({ user, onPress }) {
    return (
        <ViewStyled
            width={90}
            backgroundColor={theme_colors.transparent}
            style={{
                height: 'auto',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <ViewStyled
                width={70}
                paddingVertical={0.5}
                backgroundColor={theme_colors.transparent}
                style={{
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                }}
            >
                <TextStyled
                    fontSize={theme_textStyles.medium}
                    color={theme_colors.black}
                    style={{
                        fontFamily: 'SFPro-Bold',
                        marginBottom: 5
                    }}
                >
                    ¡Hola {user?.names?.split(' ')[0]}!
                </TextStyled>

                <TextStyled
                    color={theme_colors.transparent}
                >
                    <TextStyled
                        fontFamily='SFPro-Medium'
                        textAlign={'center'}
                        fontSize={theme_textStyles.small}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        color={theme_colors.grey}
                    >
                        {"Todas tus compras "}
                    </TextStyled>

                    <TextStyled
                        fontFamily='SFPro-Bold'
                        textAlign={'center'}
                        fontSize={theme_textStyles.smedium}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        color={theme_colors.primary}
                    >
                        {"tienen Cashback"}
                    </TextStyled>
                </TextStyled>
            </ViewStyled>

            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    width: 'auto',
                    height: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={onPress}
                    style={{
                        alignSelf: 'center',
                        backgroundColor: theme_colors.transparent
                    }}
                >
                    <ImageStyled
                        width={100}
                        height={100}
                        borderRadius={'50%'}
                        source={user?.image ? { uri: user?.image } : require('../../../assets/images/DefaultProfileUser.png')}
                        style={{
                            maxHeight: 54,
                            maxWidth: 54,
                            borderWidth: 0.2,
                            borderColor: theme_colors.grey
                        }}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </ViewStyled>
        </ViewStyled>
    );
};