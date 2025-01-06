import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import TextStyled from '../../utils/ui/TextStyled'
import { TouchableOpacity } from 'react-native'
import { theme_colors } from '../../utils/theme/theme_colors'

export default function SendAddressCard({ onPress, selectedAddress }) {
  return (
    <ViewStyled
      marginVertical={1}
      backgroundColor={theme_colors.transparent}
      style={{
        width: '95%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {
        selectedAddress ? (
          <>
            <TextStyled
              fontSize={4.5}
              color={theme_colors.grey}
              style={{
                fontFamily: 'SFPro-Medium',
                width: 'auto',
                marginRight: 6
              }}
            >
              Enviar a:
            </TextStyled>
            <TouchableOpacity
              onPress={onPress}
            >
              <TextStyled
                fontSize={5}
                color={theme_colors.darkGrey}
                numberOfLines={1}
                ellipsizeMode='tail'
                style={{
                  fontFamily: 'SFPro-Bold',
                  textDecorationLine: 'underline',
                  width: '85%',
                }}
              >
                {selectedAddress}
              </TextStyled>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={onPress}
          >
            <TextStyled
              fontSize={7}
              color={theme_colors.secondary}
              style={{
                fontFamily: 'SFPro-Bold',
                textDecorationLine: 'underline'
              }}
            >
              Selecciona una dirección
            </TextStyled>
          </TouchableOpacity>
        )
      }
    </ViewStyled>
  )
}