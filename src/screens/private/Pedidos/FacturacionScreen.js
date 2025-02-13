import React, { useEffect, useState } from 'react'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { theme_colors } from '../../../utils/theme/theme_colors'
import TextStyled from '../../../utils/ui/TextStyled'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import TextInputStyled from '../../../utils/ui/TextInputStyled'
import { useFormik } from 'formik'
import { schemaFacturacion } from '../../../utils/tools/interface/schemasFormik'
import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import adjustFontSize from '../../../utils/ui/adjustText'
import ButtonWithIcon from '../../../components/Buttons/ButtonWithIcon'
import useCartStore from '../../../utils/tools/interface/cartStore'
import { useNavigation } from '@react-navigation/native'

export default function FacturacionScreen() {
    const navigation = useNavigation()
    const { billingInfo, setBillingInfo } = useCartStore()
    const [isDisabled, setIsDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: "",
            nit: "",
        },
        validationSchema: schemaFacturacion,
        validateOnChange: true,
        onSubmit: async (values) => {
            setIsLoading(true)
            try {
                const dataFacturation = {
                    name: values.name,
                    nit: values.nit,
                };

                setBillingInfo(dataFacturation)
            } catch (err) {
                console.log('Error on editProfile: ', err)
            } finally {
                setTimeout(() => {
                    setIsLoading(false)
                    navigation.goBack()
                }, 1000);
            }
        }
    });

    useEffect(() => {
        formik.setValues({ name: billingInfo.name, nit: billingInfo.nit })
    }, [billingInfo])

    useEffect(() => {
        const formValues = formik.values;
        const hasChanges = (
            formValues.name !== billingInfo?.name ||
            formValues.nit.toString() !== billingInfo?.nit?.toString()
        );

        const isValid = formik.isValid && hasChanges;

        setIsDisabled(!isValid);
    }, [formik.values, formik.isValid, billingInfo])

    return (
        <ViewStyled
            backgroundColor={theme_colors.white}
            style={{
                width: '100%',
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <ViewStyled
                paddingVertical={1.5}
                paddingHorizontal={1}
                backgroundColor={theme_colors.transparent}
                style={{
                    width: '90%',
                    height: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: 0.2,
                    borderColor: theme_colors.primary
                }}
            >
                <TextStyled
                    fontFamily='SFPro-Bold'
                    textAlign='left'
                    fontSize={theme_textStyles.medium}
                    color={theme_colors.primary}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                >
                    Datos de Facturación
                </TextStyled>
            </ViewStyled>

            <TextInputStyled
                value={formik.values.name}
                label='Nombre / Razón Social *'
                placeholder="Ej: Rocha"
                onChangeText={text => formik.setFieldValue('name', text)}
                onBlur={() => formik.setFieldTouched('name')}
                errorMessage={formik.touched.name && formik.errors.name}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                errorStyle={styles.errorText}
                returnKeyType='next'
            />

            <TextInputStyled
                value={formik.values.nit}
                label='CI / NIT *'
                placeholder="Ej: 123456"
                onChangeText={text => formik.setFieldValue('nit', text)}
                onBlur={() => formik.setFieldTouched('nit')}
                keyboardType={"number-pad"}
                errorMessage={formik.touched.nit && formik.errors.nit}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                errorStyle={styles.errorText}
                returnKeyType='next'
            />

            <ButtonWithIcon
                disabled={isDisabled || isLoading}
                loading={isLoading}
                backgroundColor={isDisabled ? `${theme_colors.grey}22` : theme_colors.primary}
                borderWidth={0}
                colorText={theme_colors.white}
                onPress={formik.handleSubmit}
                borderRadius={1.5}
                withIcon={false}
                fontSize={theme_textStyles.medium}
                fontFamily={'SFPro-Bold'}
                textButton={isLoading ? 'Guardando datos...' : 'Guardar cambios'}
                height={6}
                style={{
                    width: '95%',
                    marginTop: 'auto',
                    marginBottom: 20
                }}
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
        marginTop: 10
    },
    labelInput: {
        fontFamily: 'SFPro-SemiBold',
        color: theme_colors.black,
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
        fontFamily: 'SFPro-Regular',
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