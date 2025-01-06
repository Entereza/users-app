import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import ProfileOptionsItem from './ProfileOptionsItem'

export default function ProfileOptions({
  profileOptions = []
}) {
  return (
    <ViewStyled
      width={95}
      marginTop={3}
      paddingVertical={1.5}
      borderRadius={2}
      backgroundColor={theme_colors.white}
      style={{
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme_colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {profileOptions.map((option) => (
        <ProfileOptionsItem
          key={option.id}
          iconOption={option.iconOption}
          nameOption={option.nameOption}
          onPress={option.onPress}
        />
      ))}
    </ViewStyled>
  )
}