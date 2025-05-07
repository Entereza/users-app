import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ProfileOptionsItem from './ProfileOptionsItem'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import useAuthStore from '../../utils/tools/interface/authStore'
import AlertStyled from '../../utils/ui/AlertStyled'

export default function ProfileCloseSession() {
  const { logout } = useAuthStore()
  const [showAlert, setShowAlert] = useState(false)

  const handleLogout = () => {
    logout()
    setShowAlert(false)
  }

  return (
    <>
      {showAlert && (
        <AlertStyled
          widthModal={90}
          heightModal={30}
          heightText={19}
          title="¿Cerrar sesión?"
          message="¿Estás seguro de querer cerrar sesión?"
          type="error"
          onConfirmPressed={() => setShowAlert(false)}
          onCancelPressed={handleLogout}
          textConfirmButton="Cancelar"
          textCancelButton="Cerrar sesión"
          showCloseButton={false}
          showCancelButton={true}
          widthConfirm="40%"
          widthCancel="55%"
          showAlert={showAlert}
        />
      )}
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
        }}
      >
        <ProfileOptionsItem
          iconOption={'export'}
          nameOption={'Cerrar Sesión'}
          onPress={() => setShowAlert(true)}
        />
      </ViewStyled>
    </>
  )
}