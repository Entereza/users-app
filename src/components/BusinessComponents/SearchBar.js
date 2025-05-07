import React from 'react'
import { TextInput, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ViewStyled from '../../utils/ui/ViewStyled'
import adjustFontSize from '../../utils/ui/adjustText'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function SearchBar({
    onPress,
    placeHolderActive = "¿Qué estás buscando?",
    nameUser = "",
    searchValue,
    setSearchValue,
    active = false,
    autoFocus = false,
}) {
    return (
        <>
            <Pressable onPress={onPress}>
                <ViewStyled
                    backgroundColor={"#f8f6f5"}
                    width={90}
                    height={6}
                    marginTop={1.5}
                    borderRadius={2}
                    paddingHorizontal={3}
                    style={{
                        zIndex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <ViewStyled
                        width={7}
                        height={5}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <MaterialCommunityIcons
                            name={"magnify"}
                            color={theme_colors.dark}
                            size={adjustFontSize(theme_textStyles.large)}
                        />
                    </ViewStyled>

                    <ViewStyled
                        width={75}
                        marginLeft={1}
                        backgroundColor={theme_colors.transparent}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}
                    >
                        {
                            active
                                ? <TextInput
                                    autoFocus={autoFocus}
                                    value={searchValue}
                                    onChangeText={value => { setSearchValue(value) }}
                                    keyboardType={"default"}
                                    placeholder={placeHolderActive}
                                    returnKeyType='search'
                                    onSubmitEditing={onPress}
                                    style={{
                                        fontFamily: 'SFPro-Regular',
                                        fontSize: adjustFontSize(theme_textStyles.smaller + .5),
                                        backgroundColor: theme_colors.transparent,
                                        width: "100%",
                                    }}
                                />
                                : <TextStyled
                                    textAlign='left'
                                    fontSize={theme_textStyles.small}
                                    color={theme_colors.grey}
                                    numberOfLines={2}
                                    ellipsizeMode='tail'
                                >
                                    {
                                        `¿Qué estás buscando ${nameUser}?`
                                    }
                                </TextStyled>
                        }
                    </ViewStyled>
                </ViewStyled>
            </Pressable>
        </>
    )
}