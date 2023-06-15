import React from 'react'
import { Pressable } from 'react-native'
import { theme } from '../../utils/theme'
import ImageStyled from '../ui/ImageStyled'
import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled'
import { useNavigation } from '@react-navigation/native'

export default function BusinessCategoryItemAll({ item, onCloseModals}) {
    const navigation = useNavigation()

    const GoScreenBusinness = () => {
        onCloseModals()
        navigation.navigate('BusinessCategory', { data: item })
    }

    return (
        <>
            <ViewStyled
                backgroundColor={theme.transparent}
                width={21}
                height={14}
                marginRight={2}
                marginTop={1}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Pressable
                    onPress={GoScreenBusinness}
                >
                    <ViewStyled
                        width={21}
                        height={9.8}
                        backgroundColor={theme.primary}
                        borderRadius={2}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5
                        }}
                    >
                        <ImageStyled
                            source={item.image}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                            }}
                        />
                    </ViewStyled>

                </Pressable>

                <ViewStyled
                    width={31}
                    height={3}
                    backgroundColor={theme.transparent}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TextStyled
                        textAlign='center'
                        fontSize={11}
                        color={theme.quaternary}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                            width: '100%',
                        }}
                    >
                        {
                            item.nombre
                        }
                    </TextStyled>
                </ViewStyled>
            </ViewStyled>
        </>
    )
}