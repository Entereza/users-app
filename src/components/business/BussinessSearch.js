
import React, { useState } from 'react'
import ViewStyled from '../ui/ViewStyled'
import { TextInput } from 'react-native'
import { theme } from '../../utils/theme'
import { customStyles } from '../../utils/customStyles'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'
import adjustFontSize from '../../utils/adjustText'

export default function BussinessSearch({
  search,
  global = true,
  codCategory = '',
  nombreCategory = '',
}) {
  const [value, setValue] = useState(search ? search : "")
  const navigation = useNavigation()
  const handlerOnSubmit = () => {
    navigation.push("SearchInput", {
      value,
      global,
      codCategory,
      nombreCategory
    })
  }

  return (
    <ViewStyled
      backgroundColor={theme.transparent}
      width={95}
      height={7}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1%",
        marginBottom: "0.5%"
      }}
    >
      <TextInput
        value={value}
        onChangeText={setValue}
        keyboardType={"default"}
        returnKeyType={'search'}
        onSubmitEditing={handlerOnSubmit}
        placeholder='(Ej: Tu empresa favorita)'
        // onBlur={() => helpers.setTouched(true)}
        style={{
          backgroundColor: theme.primary,
          borderRadius: 10,
          width: "100%",
          paddingVertical: "2%",
          paddingHorizontal: "3%",
          borderWidth: 1,
          borderColor: theme.tertiaryGradient,
          ...customStyles.shadowStyle
        }}
      />
      <Ionicons
        name="search"
        color={theme.tertiary}
        size={adjustFontSize(26)}
        style={{
          position: "absolute",
          right: "2%",
          alignSelf: "flex-end",
        }}
        onPress={handlerOnSubmit}
      />
    </ViewStyled>
  )
}