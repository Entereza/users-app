import React from 'react'
import ViewStyled from '../../utils/ui/ViewStyled'
import TextInputStyled from '../../utils/ui/TextInputStyled'
import { StyleSheet } from 'react-native'
import { theme_colors } from '../../utils/theme/theme_colors'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import adjustFontSize from '../../utils/ui/adjustText'
import { theme_textStyles } from '../../utils/theme/theme_textStyles'

export default function AddInfoAddressData({
    formik,
    disabled
}) {
    return (
        <ViewStyled
            backgroundColor={theme_colors.transparent}
            width={90}
            style={{
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <TextInputStyled
                autoFocus={true}
                editable={!disabled}
                value={formik.values.nameAddress}
                label='Nombre del lugar'
                placeholder="Ingresa el nombre del lugar"
                onChangeText={text => formik.setFieldValue('nameAddress', text)}
                onBlur={() => formik.setFieldTouched('nameAddress')}
                errorMessage={formik.touched.nameAddress && formik.errors.nameAddress}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                errorStyle={styles.errorText}
                returnKeyType='next'
            />

            <TextInputStyled
                editable={!disabled}
                value={formik.values.referencesAddress}
                label='Referencias del lugar'
                placeholder="Ingresa la referencia del lugar"
                onChangeText={text => formik.setFieldValue('referencesAddress', text)}
                onBlur={() => formik.setFieldTouched('referencesAddress')}
                errorMessage={formik.touched.referencesAddress && formik.errors.referencesAddress}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={[styles.inputText, styles.textAreaInput]}
                errorStyle={styles.errorText}
                returnKeyType='done'
                multiline={true}
                numberOfLines={3}
            />
        </ViewStyled>
    )
}

const styles = StyleSheet.create({
    textPlaceholder: theme_colors.grey,
    colorIcon: theme_colors.secondary,
    sizeIcon: 12,
    containerInput: {
        width: widthPercentageToDP(85),
        height: 'auto',
        paddingVertical: heightPercentageToDP(0.8),
        marginBottom: 10
    },
    labelInput: {
        fontFamily: 'SFPro-SemiBold',
        color: theme_colors.dark,
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    textAreaInput: {
        textAlignVertical: 'top',
        textAlign: 'left',
    },
    errorText: {
        width: '100%',
        textAlign: 'left',
        paddingLeft: 12,

        color: theme_colors.danger,
        fontSize: adjustFontSize(theme_textStyles.small)
    },
})