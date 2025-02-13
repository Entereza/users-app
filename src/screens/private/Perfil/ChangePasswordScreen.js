import React, { useState } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import HeaderDefaultScreen from '../../../components/Header/HeaderDefaultScreen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ChangePasswordData from '../../../components/ProfileComponents/ChangePasswordData'
import { schemaChangePassword } from '../../../utils/tools/interface/schemasFormik'
import { useFormik } from 'formik'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import ButtonWithIcon from '../../../components/Buttons/ButtonWithIcon'
import { StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import adjustFontSize from '../../../utils/ui/adjustText'
import ImageStyled from '../../../utils/ui/ImageStyled'

export default function ChangePasswordScreen() {
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: ""
    },
    validationSchema: schemaChangePassword,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const dataChangePassword = {
          password: values.password,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword
        };

        console.log(dataChangePassword)
      } catch (err) {
        console.log('Error on editProfile: ', err)
      }
    }
  });

  const isDisabled = (formik.dirty && !formik.isValid)

  return (
    <ViewStyled
      backgroundColor={theme_colors.white}
      width={100}
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <HeaderDefaultScreen title={"Cambiar Contraseña"} />

      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={20}
      >
        <ViewStyled
          backgroundColor={theme_colors.transparent}
          marginTop={2}
          marginBottom={2}
          style={{
            width: 'auto',
            height: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ImageStyled
            width={100}
            height={100}
            borderRadius={1.5}
            source={require('../../../../assets/images/ImageLock.png')}
            style={{
              maxHeight: 100,
              maxWidth: 100,
              borderWidth: 0.2,
              borderColor: theme_colors.grey,
              position: "relative"
            }}
            resizeMode="cover"
          />
        </ViewStyled>
        
        <ChangePasswordData formik={formik} />

        <ButtonWithIcon
          disabled={isDisabled}
          backgroundColor={isDisabled ? `${theme_colors.grey}22` : theme_colors.primary}
          borderWidth={0}
          colorText={theme_colors.white}
          onPress={formik.handleSubmit}
          borderRadius={1.5}
          withIcon={false}
          fontSize={theme_textStyles.medium}
          fontFamily={'SFPro-Bold'}
          textButton={'Guardar cambios'}
          height={6}
          style={{
            width: '95%',
            marginTop: 150
          }}
        />
      </KeyboardAwareScrollView>
    </ViewStyled>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
});