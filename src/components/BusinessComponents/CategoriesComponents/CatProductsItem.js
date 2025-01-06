import React from 'react'
import { theme_colors } from '../../../utils/theme/theme_colors'
import TextStyled from '../../../utils/ui/TextStyled'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { widthPercentageToDP } from 'react-native-responsive-screen'

export default function CatProductsItem({ item, isSelected = false, onPress }) {
  return (
    <ViewStyled
      marginHorizontal={1}
      paddingVertical={1}
      paddingHorizontal={2}
      backgroundColor={isSelected ? theme_colors.primary : theme_colors.transparent}
      style={{
        width: 'auto',
        height: 'auto',
        minWidth: widthPercentageToDP(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: isSelected ? 0 : 1,
        borderColor: theme_colors.semiTransparent
      }}
    >
      <TextStyled
        fontFamily='SFPro-Bold'
        textAlign='center'
        fontSize={8}
        color={isSelected ? theme_colors.white : theme_colors.black}
      >
        {item}
      </TextStyled>
    </ViewStyled>
  )
}