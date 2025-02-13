import { View, Text } from 'react-native'
import React from 'react'
import ProfileOptionsItem from './ProfileOptionsItem'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import useAuthStore from '../../utils/tools/interface/authStore'

export default function ProfileCloseSession() {
  const { logout } = useAuthStore()

  return (
    <ViewStyled
      width={95}
      marginTop={2}
      paddingVertical={1}
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
      <ProfileOptionsItem
        iconOption={'export'}
        nameOption={'Cerrar Sesión'}
        onPress={logout}
      />
    </ViewStyled>
  )
}