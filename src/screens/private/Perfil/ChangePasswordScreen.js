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
import { userService } from '../../../services/api/users/userService'
import { toastService } from '../../../utils/tools/interface/toastService';
import useAuthStore from '../../../utils/tools/interface/authStore'
import { useNavigation } from '@react-navigation/native'

export default function ChangePasswordScreen() {
  const { user } = useAuthStore()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

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
        setIsLoading(true)
        setIsDisabled(true)

        const response = await userService.changePassword(
          user.email,
          values.password,
          values.newPassword
        )

        if (response.code === 'COD200') {
          toastService.showSuccessToast('Contraseña actualizada correctamente')
          navigation.goBack()
        } else if (response.code === 'COD400') {
          toastService.showWarningToast('Contraseña actual incorrecta')
        } else {
          toastService.showErrorToast('Error al cambiar la contraseña')
        }
      } catch (err) {
        console.log('Error on ChangePasswordScreen: ', err)
        toastService.showErrorToast('Error al cambiar la contraseña')
      } finally {
        setIsLoading(false)
        setIsDisabled(false)
      }
    }
  });

  React.useEffect(() => {
    const formValues = formik.values;
    const hasChanges = formValues.password !== "" &&
      formValues.newPassword !== "" &&
      formValues.confirmNewPassword !== "" &&
      formik.isValid;

    setIsDisabled(!hasChanges || isLoading);
  }, [formik.values, formik.isValid, isLoading]);

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
          loading={isLoading}
          disabled={isDisabled}
          backgroundColor={isDisabled && !isLoading ? `${theme_colors.grey}22` : theme_colors.primary}
          borderWidth={0}
          colorText={theme_colors.white}
          onPress={formik.handleSubmit}
          borderRadius={1.5}
          withIcon={false}
          fontSize={theme_textStyles.medium}
          fontFamily={'SFPro-Bold'}
          textButton={isLoading ? 'Guardando...' : 'Guardar cambios'}
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