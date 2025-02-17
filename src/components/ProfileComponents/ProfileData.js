import React from 'react'
import { theme_colors } from '../../utils/theme/theme_colors'
import ViewStyled from '../../utils/ui/ViewStyled'
import TextStyled from '../../utils/ui/TextStyled'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function ProfileData({
  userData,
}) {
  // console.log('userData: ', userData)

  return (
    <ViewStyled
      width={90}
      backgroundColor={theme_colors.transparent}
      style={{
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextStyled
        fontFamily='SFPro-Bold'
        textAlign='center'
        fontSize={theme_textStyles.smedium}
        color={theme_colors.black}
        numberOfLines={1}
        style={{
          width: "90%",
        }}
      >
        {userData?.names && userData?.lastNames ? `${userData.names + ' ' + userData.lastNames}` : 'Sin nombre'}
      </TextStyled>

      <TextStyled
        fontFamily='SFPro-Medium'
        textAlign='center'
        fontSize={theme_textStyles.small}
        color={theme_colors.grey}
        numberOfLines={1}
        style={{
          width: "90%",
        }}
      >
        {'CI: ' + (userData?.ci ? userData.ci : 'N/A')}
      </TextStyled>
    </ViewStyled>
  )
}