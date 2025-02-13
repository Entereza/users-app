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
    withFilters = false,
}) {
    const [openFilters, setOpenFilters] = React.useState(false)

    return (
        <>
            <Pressable onPress={onPress}>
                <ViewStyled
                    backgroundColor={theme_colors.white}
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

                        shadowColor: theme_colors.black,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 3,
                    }}
                >
                    <ViewStyled
                        width={75}
                        height={4.5}
                        backgroundColor={theme_colors.transparent}
                        style={{
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

                    {/* <Pressable onPress={active ? () => setOpenFilters(true) : null}> */}
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
                            name={withFilters ? "tune" : "magnify"}
                            color={theme_colors.textGrey}
                            size={adjustFontSize(theme_textStyles.large)}
                        />
                    </ViewStyled>
                    {/* </Pressable> */}
                </ViewStyled>
            </Pressable>
        </>
    )
}