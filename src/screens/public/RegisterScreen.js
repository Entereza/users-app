import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import TextInputStyled from '../../utils/ui/TextInputStyled';
import { useFormik } from 'formik';
import { schemaRegister } from '../../utils/tools/interface/schemasFormik';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import adjustFontSize from '../../utils/ui/adjustText';
import ButtonWithIcon from '../../components/Buttons/ButtonWithIcon';
import { authService } from '../../services/api/auth';
import useAuthStore from '../../utils/tools/interface/authStore';

export default function RegisterScreen() {
    const insets = useSafeAreaInsets();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setUserData } = useAuthStore();

    const formik = useFormik({
        initialValues: {
            names: '',
            lastNames: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
        },
        validationSchema: schemaRegister,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const response = await authService.signup({
                    names: values.names,
                    lastnames: values.lastNames,
                    email: values.email,
                    password: values.password,
                    phoneNumber: values.phoneNumber
                });

                console.log('Signup response:', response);

                if (response.code === '200') {
                    Alert.alert(
                        "Éxito",
                        response.msg || "Registro exitoso",
                        [{ text: "OK" }]
                    );
                    setUserData({
                        names: values.names,
                        lastNames: values.lastNames,
                        phoneNumber: values.phoneNumber,
                        ci: '',
                        cashback: 0,
                        email: values.email,
                        password: values.password,
                        image: ""
                    });
                } else {
                    Alert.alert(
                        "Error",
                        response.msg || "Error en el registro",
                        [{ text: "OK" }]
                    );
                }
            } catch (error) {
                console.error('Error during registration:', error);
                Alert.alert(
                    "Error",
                    error.message || "Hubo un problema al intentar registrarse",
                    [{ text: "OK" }]
                );
            } finally {
                setLoading(false);
            }
        }
    });

  return (
        <ViewStyled
            backgroundColor={theme_colors.dark}
            style={{
                width: '100%',
                height: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'relative',
                paddingTop: insets.top + heightPercentageToDP(5),
                paddingBottom: insets.bottom,
            }}
        >
            <TextStyled
                textAlign='center'
                fontFamily='Artegra-Light'
                fontSize={theme_textStyles.medium}
                color={theme_colors.white}
                style={{
                    marginBottom: 10,
                    width: "100%",
                }}
            >
                {'Crea tu cuenta con '}
                <TextStyled
                    fontFamily='Artegra-Bold'
                    textAlign='center'
                    fontSize={theme_textStyles.large}
                    color={theme_colors.primary}
                    style={{
                        width: "100%",
                    }}
                >
                    {'Entereza'}
                </TextStyled>
            </TextStyled>

            <TextInputStyled
                value={formik.values.names}
                label='Nombres'
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
                label='Apellidos'
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
                value={formik.values.email}
                label='Correo electrónico'
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
                keyboardType='email-address'
                autoCapitalize='none'
            />

            <TextInputStyled
                value={formik.values.password}
                label='Contraseña'
                placeholder="Ingresa tu contraseña"
                onChangeText={text => formik.setFieldValue('password', text)}
                onBlur={() => formik.setFieldTouched('password')}
                errorMessage={formik.touched.password && formik.errors.password}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={styles.passwordInputText}
                errorStyle={styles.errorText}
                returnKeyType='next'
                isSecure={!showPassword}
                icon={showPassword ? 'eye-off' : 'eye'}
                handleVisible={() => setShowPassword(!showPassword)}
            />

            <TextInputStyled
                value={formik.values.confirmPassword}
                label='Confirmar contraseña'
                placeholder="Confirma tu contraseña"
                onChangeText={text => formik.setFieldValue('confirmPassword', text)}
                onBlur={() => formik.setFieldTouched('confirmPassword')}
                errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword}
                placeholderTextColor={styles.textPlaceholder}
                labelStyle={styles.labelInput}
                containerStyle={styles.containerInput}
                inputStyle={styles.passwordInputText}
                errorStyle={styles.errorText}
                returnKeyType='next'
                isSecure={!showConfirmPassword}
                icon={showConfirmPassword ? 'eye-off' : 'eye'}
                handleVisible={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={styles.phoneContainer}
            >
                <TextStyled
                    style={styles.labelInput}
                >
                    {'Número de celular'}
                </TextStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    style={styles.phoneInputContainer}
                >
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={styles.countryCode}
                    >
                        <TextStyled
                            color={theme_colors.white}
                            fontSize={theme_textStyles.small + .5}
                        >
                            {'🇧🇴 +591'}
                        </TextStyled>
                    </ViewStyled>

                    <TextInputStyled
                        value={formik.values.phoneNumber}
                        placeholder="Ej: 76647839"
                        onChangeText={text => formik.setFieldValue('phoneNumber', text)}
                        onBlur={() => formik.setFieldTouched('phoneNumber')}
                        errorMessage={formik.touched.phoneNumber && formik.errors.phoneNumber}
                        placeholderTextColor={styles.textPlaceholder}
                        containerStyle={styles.phoneInputField}
                        inputStyle={styles.inputText}
                        errorStyle={styles.errorText}
                        returnKeyType='done'
                        keyboardType='phone-pad'
                    />
                </ViewStyled>
            </ViewStyled>

            <ButtonWithIcon
                disabled={!formik.isValid || !formik.dirty || loading}
                backgroundColor={!formik.isValid || !formik.dirty ? `${theme_colors.grey}22` : theme_colors.primary}
                borderWidth={0}
                colorText={!formik.isValid || !formik.dirty ? theme_colors.textGrey : theme_colors.white}
                onPress={formik.handleSubmit}
                borderRadius={2}
                withIcon={false}
                fontSize={theme_textStyles.smedium}
                fontFamily={'SFPro-SemiBold'}
                textButton={'Crear cuenta'}
                height={7}
                loading={loading}
                style={{
                    width: '95%',
                    marginTop: 'auto',
                    marginBottom: 10,
                }}
            />
        </ViewStyled>
    )
}

const styles = StyleSheet.create({
    textPlaceholder: theme_colors.grey,
    containerInput: {
        width: widthPercentageToDP(90),
        height: 'auto',
        paddingVertical: heightPercentageToDP(0.8),
        marginBottom: 10
    },
    labelInput: {
        fontFamily: 'SFPro-SemiBold',
        color: theme_colors.white,
        fontSize: adjustFontSize(theme_textStyles.small + .5),
        marginBottom: 10
    },
    inputText: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: theme_colors.transparent,
        borderColor: theme_colors.white,
        borderWidth: 1,
        width: '100%',
        height: 'auto',
        color: theme_colors.white,
        fontFamily: 'SFPro-Medium',
        fontSize: adjustFontSize(theme_textStyles.small + .5),
    },
    errorText: {
        width: '100%',
        textAlign: 'left',
        paddingLeft: 12,
        color: theme_colors.danger,
        fontSize: adjustFontSize(theme_textStyles.small)
    },
    phoneContainer: {
        width: widthPercentageToDP(90),
        marginBottom: 10,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    countryCode: {
        borderWidth: 1,
        borderColor: theme_colors.white,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    phoneInputField: {
        flex: 1,
        marginBottom: 0,
    },
    passwordInputText: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: theme_colors.transparent,
        borderColor: theme_colors.white,
        borderWidth: 1,
        width: '90%',
        height: 'auto',
        color: theme_colors.white,
        fontFamily: 'SFPro-Medium',
        fontSize: adjustFontSize(theme_textStyles.small + .5),
    },
});