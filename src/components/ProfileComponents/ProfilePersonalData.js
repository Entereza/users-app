import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import TextInputStyled from '../../utils/ui/TextInputStyled'
import { theme_colors } from '../../utils/theme/theme_colors';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import adjustFontSize from '../../utils/ui/adjustText';

export default function ProfilePersonalData({
    formik
}) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            width={100}
            style={{
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <TextInputStyled
                value={formik.values.names}
                label='Nombres *'
                placeholder="Ingresa tus nombres"
                onChangeText={text => formik.setFieldValue('names', text)}
                onBlur={() => formik.setFieldTouched('names')}
                errorMessage={formik.touched.names && formik.errors.names}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                errorStyle={styles.errorText}
                returnKeyType='next'
            />

            <TextInputStyled
                value={formik.values.lastNames}
                label='Apellidos *'
                placeholder="Ingresa tus apellidos"
                onChangeText={text => formik.setFieldValue('lastNames', text)}
                onBlur={() => formik.setFieldTouched('lastNames')}
                errorMessage={formik.touched.lastNames && formik.errors.lastNames}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                errorStyle={styles.errorText}
                returnKeyType='next'
            />

            <TextInputStyled
                value={formik.values.phoneNumber}
                keyboardType={'number-pad'}
                label='Número de celular *'
                placeholder="Ingresa tu número de celular"
                onChangeText={text => formik.setFieldValue('phoneNumber', text)}
                onBlur={() => formik.setFieldTouched('phoneNumber')}
                errorMessage={formik.touched.phoneNumber && formik.errors.phoneNumber}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                errorStyle={styles.errorText}
                returnKeyType='next'
            />

            <TextInputStyled
                value={formik.values.email}
                label='Correo electrónico *'
                placeholder="Ingresa tu correo electrónico"
                onChangeText={text => formik.setFieldValue('email', text)}
                onBlur={() => formik.setFieldTouched('email')}
                errorMessage={formik.touched.email && formik.errors.email}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                errorStyle={styles.errorText}
                returnKeyType='next'
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
        paddingVertical: heightPercentageToDP(0.8)
    },
    labelInput: {
        fontFamily: 'SFPro-SemiBold',
        color: theme_colors.black,
        fontSize: adjustFontSize(13),
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
        fontSize: adjustFontSize(12),

        elevation: 2,
        shadowColor: theme_colors.black,
    },
    errorText: {
        width: '100%',
        textAlign: 'left',
        paddingLeft: 12,

        color: theme_colors.danger,
        fontSize: adjustFontSize(10)
    },
})