import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import TextStyled from '../../utils/ui/TextStyled'
import { TouchableOpacity } from 'react-native'
import { theme_colors } from '../../utils/theme/theme_colors'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

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
              fontSize={theme_textStyles.small}
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
              style={{
                width: '83%',
              }}
            >
              <TextStyled
                fontSize={theme_textStyles.smedium}
                color={theme_colors.darkGrey}
                numberOfLines={1}
                ellipsizeMode='tail'
                style={{
                  fontFamily: 'SFPro-Bold',
                  textDecorationLine: 'underline',
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
              fontSize={theme_textStyles.smedium}
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