import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ViewStyled from '../../utils/ui/ViewStyled';
import { theme_colors } from '../../utils/theme/theme_colors';
import ImageStyled from '../../utils/ui/ImageStyled';
import TextStyled from '../../utils/ui/TextStyled';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import TermsConditions from '../../components/public/Auth/TermsConditions';
import TextInputStyled from '../../utils/ui/TextInputStyled';
import { useFormik } from 'formik';
import { schemaLogin } from '../../utils/tools/interface/schemasFormik';
import { StyleSheet, Alert, TouchableOpacity, Pressable } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import adjustFontSize from '../../utils/ui/adjustText';
import ButtonWithIcon from '../../components/Buttons/ButtonWithIcon';
import { authService } from '../../services/api/auth';
import useAuthStore from '../../utils/tools/interface/authStore';
import { useNavigation } from '@react-navigation/native';
import { public_name_routes } from '../../utils/route/public_name_routes';

export default function LoginScreen() {
    const insets = useSafeAreaInsets();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setUserData } = useAuthStore();
    const navigation = useNavigation()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schemaLogin,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const response = await authService.login({
                    nick: values.email,
                    password: values.password
                });
                
                console.log('Response: ', response)

                if (response.code === 'COD200') {
                    Alert.alert(
                        "Éxito",
                        response.msg || "Inicio de sesión exitoso",
                        [{ text: "OK" }]
                    );
                    setUserData({
                        names: "Anelisse",
                        lastNames: "Rocabado",
                        phoneNumber: 75469425,
                        ci: 7820697,
                        cashback: 50,
                        email: values.email,
                        password: values.password,
                        image: ""
                    });
                } else {
                    Alert.alert(
                        "Error",
                        response.msg || "Error al iniciar sesión",
                        [{ text: "OK" }]
                    );
                }
            } catch (error) {
                console.error('Error during login:', error);
                Alert.alert(
                    "Error",
                    error.message || "Hubo un problema al intentar iniciar sesión",
                    [{ text: "OK" }]
                );
            } finally {
                setLoading(false);
            }
        }
    });

    const goToRegisterScreen = () => {
        navigation.navigate(public_name_routes.auth.signUp)
    }

    return (
        <ViewStyled
            backgroundColor={theme_colors.dark}
            style={{
                width: '100%',
                height: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'relative',
                paddingTop: insets.top + heightPercentageToDP(10),
                paddingBottom: insets.bottom,
            }}
        >
            <ViewStyled
                width={80}
                height={20}
                backgroundColor={theme_colors.transparent}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ImageStyled
                    source={require('../../../assets/icons/IconColorsEntereza.png')}
                    style={{
                        resizeMode: 'contain',
                        width: '100%',
                        height: '100%'
                    }}
                />
            </ViewStyled>

            <TextStyled
                textAlign='center'
                fontFamily='Artegra-Light'
                fontSize={theme_textStyles.medium}
                color={theme_colors.white}
                style={{
                    marginTop: 10,
                    marginBottom: 30,
                    width: "100%",
                }}
            >
                {'Inicia sesión con '}
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
                returnKeyType='done'
                isSecure={!showPassword}
                icon={showPassword ? 'eye-off' : 'eye'}
                handleVisible={() => setShowPassword(!showPassword)}
            />

            <Pressable onPress={goToRegisterScreen} style={{ alignSelf: 'center', marginRight: 22 }}>
                <TextStyled
                    textAlign='right'
                    fontFamily='SFPro-Italic'
                    fontSize={theme_textStyles.smaller + .5}
                    color={theme_colors.white}
                    style={{
                        marginTop: 10,
                        width: "90%",
                    }}
                >
                    {'¿Aún no tienes una cuenta? '}
                    <TextStyled
                        fontFamily='SFPro-SemiBold'
                        textAlign='right'
                        fontSize={theme_textStyles.smaller + .5}
                        color={theme_colors.primary}
                        style={{
                            width: "100%",
                            textDecorationLine: 'underline'
                        }}
                    >
                        {'¡Regístrate!'}
                    </TextStyled>
                </TextStyled>
            </Pressable>


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
                textButton={'Iniciar sesión'}
                height={7}
                loading={loading}
                style={{
                    width: '95%',
                    marginTop: 'auto',
                    marginBottom: 10,
                }}
            />

            <TermsConditions />
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
    errorText: {
        width: '100%',
        textAlign: 'left',
        paddingLeft: 12,
        color: theme_colors.danger,
        fontSize: adjustFontSize(theme_textStyles.small)
    },
});