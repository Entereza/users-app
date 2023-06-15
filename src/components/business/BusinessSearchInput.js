import React, { useState } from 'react'
import ViewStyled from '../ui/ViewStyled'
import { Pressable, TextInput } from 'react-native'
import { theme } from '../../utils/theme'
import { customStyles } from '../../utils/customStyles'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'
import adjustFontSize from '../../utils/adjustText'

export default function BusinessSearchInput({ name }) {

  const [searchValue, setSearchValue] = React.useState('')

  const SearchBusiness = async () => {
    try {
      console.log('SearchValue: ', searchValue, '- ', searchValue.length)
    } catch (error) {
      console.log('SearchBusiness: ', error)
    }
  }

  return (
    <>
      <ViewStyled
        backgroundColor={theme.transparent}
        width={100}
        height={9}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ViewStyled
          width={96}
          height={7}
          backgroundColor={theme.primary}
          borderRadius={2}
          paddingHorizontal={3}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.tertiaryGradient,
            ...customStyles.shadowStyle
          }}
        >
          <TextInput
            value={searchValue}
            onChangeText={value => {
              setSearchValue(value)
              SearchBusiness()
            }}
            keyboardType={"default"}
            placeholder={`¿Qué estás buscando ${name}?`}
            style={{
              backgroundColor: theme.transparent,
              width: "90%",
            }}
          />
          <Ionicons
            name="search"
            color={theme.tertiary}
            size={adjustFontSize(20)}
            onPress={SearchBusiness}
          />
        </ViewStyled>
      </ViewStyled>
    </>
  )
}