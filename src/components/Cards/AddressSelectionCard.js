import React from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { FontAwesome6, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import TextStyled from '../../utils/ui/TextStyled';
import { Pressable } from 'react-native';
import adjustFontSize from '../../utils/ui/adjustText';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';

export default function AddressSelectionCard({ item, isSelected, onPressSelect, onPressEdit }) {
    const colorIcon = isSelected ? theme_colors.white : theme_colors.grey
    const colorText = isSelected ? theme_colors.white : theme_colors.black
    const colorSubtitle = isSelected ? theme_colors.white : theme_colors.grey
    const backgroundColor = isSelected ? theme_colors.primary : theme_colors.white

    return (
        <ViewStyled
            width={90}
            height={10}
            paddingHorizontal={1}
            marginBottom={1}
            backgroundColor={theme_colors.transparent}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Pressable onPress={onPressSelect} style={{ width: '86%', height: '100%' }}>
                <ViewStyled
                    borderRadius={2}
                    paddingHorizontal={3.5}
                    backgroundColor={backgroundColor}
                    style={{
                        width: '100%',
                        height: '90%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        shadowColor: theme_colors.black,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 3,
                    }}
                >
                    <Octicons name={"location"} size={adjustFontSize(theme_textStyles.large)} color={colorIcon} />

                    <ViewStyled
                        paddingHorizontal={2}
                        height={7}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.small}
                            color={colorText}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                            style={{
                                fontFamily: 'SFPro-SemiBold',
                            }}
                        >
                            {item.nameAddress}
                        </TextStyled>

                        <TextStyled
                            fontSize={theme_textStyles.smaller + .5}
                            color={colorSubtitle}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{
                                fontFamily: 'SFPro-Regular',
                            }}
                        >
                            {item.referencesAddress}
                        </TextStyled>
                    </ViewStyled>

                    <MaterialCommunityIcons name={"checkbox-blank-circle-outline"} size={adjustFontSize(theme_textStyles.smedium)} color={colorIcon} />
                </ViewStyled>
            </Pressable>

            <Pressable
                onPress={onPressEdit}
                style={{
                    width: '10%',
                    height: '70%',
                }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={{
                        width: '100%',
                        height: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <FontAwesome6 name={"pencil"} size={adjustFontSize(theme_textStyles.medium)} color={theme_colors.lightGrey2} />
                </ViewStyled>
            </Pressable>
        </ViewStyled >
    );
}