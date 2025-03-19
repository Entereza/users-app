import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import TextStyled from '../../utils/ui/TextStyled'
import { TouchableOpacity } from 'react-native'
import { theme_colors } from '../../utils/theme/theme_colors'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import adjustFontSize from '../../utils/ui/adjustText'

export default function SendAddressCard({ onPress, selectedAddress }) {
  return (
    <ViewStyled
      marginVertical={0.5}
      backgroundColor={theme_colors.transparent}
      style={{
        width: '98%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <TextStyled
        fontSize={theme_textStyles.small + .5}
        color={theme_colors.grey}
        style={{
          fontFamily: 'SFPro-Regular',
          width: 'auto',
        }}
      >
        Dirección
      </TextStyled>
      {
        selectedAddress ? (
          <>
            <TouchableOpacity
              onPress={onPress}
              style={{
                width: '90%',
                backgroundColor: theme_colors.transparent,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <Octicons
                name={"location"}
                color={theme_colors.black}
                size={adjustFontSize(theme_textStyles.large)}
              />
              <TextStyled
                fontSize={theme_textStyles.smedium}
                color={theme_colors.black}
                numberOfLines={1}
                ellipsizeMode='tail'
                style={{
                  fontFamily: 'SFPro-SemiBold',
                  marginTop: 2,
                  marginLeft: 6
                }}
              >
                {selectedAddress}
              </TextStyled>
              <MaterialCommunityIcons
                name={"chevron-down"}
                color={theme_colors.black}
                size={adjustFontSize(theme_textStyles.large)}
              />
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