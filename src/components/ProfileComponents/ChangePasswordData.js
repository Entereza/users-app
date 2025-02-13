import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import { theme_colors } from '../../utils/theme/theme_colors'
import TextInputStyled from '../../utils/ui/TextInputStyled'
import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import adjustFontSize from '../../utils/ui/adjustText'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function ChangePasswordData({
    formik
}) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            width={100}
            style={{
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <TextInputStyled
                value={formik.values.password}
                label='Contraseña actual *'
                placeholder="Ingresa tu contraseña actual"
                onChangeText={text => formik.setFieldValue('password', text)}
                onBlur={() => formik.setFieldTouched('password')}
                errorMessage={formik.touched.password && formik.errors.password}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                errorStyle={styles.errorText}
                returnKeyType='next'
            />

            <TextInputStyled
                value={formik.values.newPassword}
                label='Nueva contraseña *'
                placeholder="Ingresa tu nueva contraseña"
                onChangeText={text => formik.setFieldValue('newPassword', text)}
                onBlur={() => formik.setFieldTouched('newPassword')}
                errorMessage={formik.touched.newPassword && formik.errors.newPassword}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                errorStyle={styles.errorText}
                returnKeyType='next'
            />

            <TextInputStyled
                value={formik.values.confirmNewPassword}
                label='Confirmar nueva contraseña *'
                placeholder="Confirma tu nueva contraseña"
                onChangeText={text => formik.setFieldValue('confirmNewPassword', text)}
                onBlur={() => formik.setFieldTouched('confirmNewPassword')}
                errorMessage={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                errorStyle={styles.errorText}
                returnKeyType='done'
            />
        </ViewStyled>
    )
}

const styles = StyleSheet.create({
    textPlaceholder: theme_colors.grey,
    colorIcon: theme_colors.secondary,
    sizeIcon: 12,
    containerInput: {
        width: widthPercentageToDP(90),
        height: 'auto',
        paddingVertical: heightPercentageToDP(0.8),
    },
    labelInput: {
        fontFamily: 'SFPro-SemiBold',
        color: theme_colors.grey,
        fontSize: adjustFontSize(theme_textStyles.small + .5),
        marginBottom: 6
    },
    inputText: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 12,

        backgroundColor: theme_colors.white,
        width: '100%',
        height: 'auto',

        color: theme_colors.black,
        fontFamily: 'SFPro-Medium',
        fontSize: adjustFontSize(theme_textStyles.smedium),

        elevation: 2,
        shadowColor: theme_colors.black,
    },
    errorText: {
        width: '100%',
        textAlign: 'left',
        paddingLeft: 12,

        color: theme_colors.danger,
        fontSize: adjustFontSize(theme_textStyles.small)
    },
})