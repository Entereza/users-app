import React from 'react';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TextStyled from '../../utils/ui/TextStyled';
import { Pressable } from 'react-native';
import adjustFontSize from '../../utils/ui/adjustText';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';

export default function SelectionCard({ id, name, icon, onPress, selection }) {
    const isSelected = selection === id;
    const colorIcon = isSelected ? theme_colors.white : theme_colors.grey;
    const colorText = isSelected ? theme_colors.white : theme_colors.black;
    const backgroundColor = isSelected ? theme_colors.primary : theme_colors.white;

    return (
        <ViewStyled
            width={90}
            height={10}
            paddingHorizontal={1}
            marginBottom={1}
            backgroundColor={theme_colors.transparent}
        >
            <Pressable onPress={onPress} style={{ width: '100%', height: '100%' }}>
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
                    <MaterialCommunityIcons 
                        name={icon} 
                        size={adjustFontSize(theme_textStyles.large)} 
                        color={colorIcon} 
                    />

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
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{
                                fontFamily: 'SFPro-SemiBold',
                            }}
                        >
                            {name}
                        </TextStyled>
                    </ViewStyled>

                    <MaterialCommunityIcons 
                        name={"checkbox-blank-circle-outline"} 
                        size={adjustFontSize(theme_textStyles.smedium)} 
                        color={colorIcon} 
                    />
                </ViewStyled>
            </Pressable>
        </ViewStyled>
    );
}