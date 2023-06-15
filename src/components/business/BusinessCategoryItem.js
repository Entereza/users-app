import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { theme } from '../../utils/theme'
import ImageStyled from '../ui/ImageStyled'
import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled'
import { useNavigation } from '@react-navigation/native'
import { customStyles } from '../../utils/customStyles'

export default function BusinessCategoryItem({ item }) {

    const navigation = useNavigation()

    const GoScreenBusinness = () => {
        navigation.push('BusinessCategory', { data: item })
    }

    return (
        <>
            <ViewStyled
                backgroundColor={theme.transparent}
                width={21.5}
                height={12}
                marginRight={3}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Pressable
                    onPress={GoScreenBusinness}
                >
                    <ViewStyled
                        width={18}
                        height={8}
                        backgroundColor={theme.primary}
                        borderRadius={2}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2
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
                        fontWeight='400'
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