import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { theme_colors } from '../../utils/theme/theme_colors';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextStyled from '../../utils/ui/TextStyled';
import TextInputStyled from '../../utils/ui/TextInputStyled';
import ButtonWithIcon from '../../components/Buttons/ButtonWithIcon';
import { public_name_routes } from '../../utils/route/public_name_routes';
import { userService } from '../../services/api/users/userService';
import { Ionicons } from '@expo/vector-icons';
import '../../../'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import adjustFontSize from '../../utils/ui/adjustText';

const RecoverySchema = Yup.object().shape({
    email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es requerido'),
});

export default function AccountRecoveryScreen() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [recoveryStatus, setRecoveryStatus] = useState(null);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: RecoverySchema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const response = await userService.recoverAccount(values.email);

                if (response && response.code === 'COD200') {
                    setRecoveryStatus({
                        success: true,
                        message: 'Se ha enviado una contraseña temporal a tu correo electrónico. Utilízala para iniciar sesión y luego cámbiala por una nueva.'
                    });
                } else {
                    setRecoveryStatus({
                        success: false,
                        message: response?.msg || 'No se pudo recuperar la cuenta. Por favor, intenta nuevamente.'
                    });
                }
            } catch (error) {
                console.error('Error recovering account:', error);
                setRecoveryStatus({
                    success: false,
                    message: 'Ocurrió un error al intentar recuperar tu cuenta. Por favor, intenta nuevamente.'
                });
            } finally {
                setIsLoading(false);
            }
        },
    });

    const goToLogin = () => {
        navigation.navigate(public_name_routes.auth.signIn);
    };

    return (
        <ViewStyled
            backgroundColor={theme_colors.dark}
            width={100}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={[styles.scrollContent, { justifyContent: recoveryStatus ? 'center' : 'flex-start' }]}
                showsVerticalScrollIndicator={false}
            >
                {!recoveryStatus &&
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        width={100}
                        style={styles.headerContainer}
                    >
                        <Image
                            source={require('../../../assets/icons/IconColorsEntereza.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </ViewStyled>
                }

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    width={100}
                    style={styles.contentContainer}
                >
                    {!recoveryStatus ? (
                        <>
                            <TextStyled
                                fontSize={theme_textStyles.large}
                                color={theme_colors.white}
                                fontFamily='SFPro-Bold'
                                style={styles.title}
                            >
                                Recuperación de Cuenta
                            </TextStyled>


                            <TextStyled
                                fontSize={theme_textStyles.small}
                                color={theme_colors.white}
                                fontFamily='SFPro-Regular'
                                style={styles.description}
                            >
                                Hemos detectado que tu cuenta necesita ser recuperada. Por favor, ingresa tu correo electrónico para enviarte una contraseña temporal.
                            </TextStyled>


                            <TextInputStyled
                                value={formik.values.email}
                                label='Correo electrónico'
                                placeholder="Ingresa tu correo electrónico"
                                onChangeText={text => formik.setFieldValue('email', text)}
                                onBlur={() => formik.setFieldTouched('email')}
                                errorMessage={formik.touched.email && formik.errors.email}
                                placeholderTextColor={theme_colors.grey}
                                labelStyle={styles.labelInput}
                                containerStyle={styles.containerInput}
                                inputStyle={styles.inputText}
                                errorStyle={styles.errorText}
                                returnKeyType='done'
                                keyboardType='email-address'
                                autoCapitalize='none'
                            />

                            <ButtonWithIcon
                                disabled={isLoading || !formik.isValid || !formik.dirty}
                                backgroundColor={isLoading || !formik.isValid || !formik.dirty ? `${theme_colors.grey}22` : theme_colors.primary}
                                borderWidth={0}
                                colorText={!formik.isValid || !formik.dirty ? theme_colors.grey : theme_colors.white}
                                onPress={formik.handleSubmit}
                                borderRadius={1.5}
                                withIcon={false}
                                fontSize={theme_textStyles.medium}
                                fontFamily={'SFPro-Bold'}
                                textButton={isLoading ? 'Enviando...' : 'Recuperar Cuenta'}
                                height={6}
                                loading={isLoading}
                                style={styles.button}
                            />
                        </>
                    ) : (
                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            width={90}
                            style={styles.resultContainer}
                        >
                            <Ionicons
                                name={recoveryStatus.success ? 'checkmark-circle' : 'alert-circle'}
                                size={80}
                                color={recoveryStatus.success ? theme_colors.success : theme_colors.error}
                                style={styles.icon}
                            />

                            <TextStyled
                                fontSize={theme_textStyles.medium}
                                color={theme_colors.white}
                                fontFamily='SFPro-Bold'
                                style={styles.resultTitle}
                            >
                                {recoveryStatus.success ? '¡Correo Enviado!' : 'Error'}
                            </TextStyled>

                            <TextStyled
                                fontSize={theme_textStyles.small}
                                color={theme_colors.white}
                                fontFamily='SFPro-Regular'
                                style={styles.resultMessage}
                            >
                                {recoveryStatus.message}
                            </TextStyled>

                            {recoveryStatus.success && (
                                <TextStyled
                                    fontSize={theme_textStyles.small}
                                    color={theme_colors.white}
                                    fontFamily='SFPro-Italic'
                                    style={styles.thankYouMessage}
                                >
                                    ¡Gracias por volver a ser parte de Entereza! Estamos emocionados de tenerte de nuevo con nosotros.
                                </TextStyled>
                            )}

                            <ButtonWithIcon
                                backgroundColor={theme_colors.primary}
                                borderWidth={0}
                                colorText={theme_colors.white}
                                onPress={goToLogin}
                                borderRadius={1.5}
                                withIcon={false}
                                fontSize={theme_textStyles.medium}
                                fontFamily={'SFPro-Bold'}
                                textButton="Volver al Inicio de Sesión"
                                height={6}
                                style={styles.button}
                            />
                        </ViewStyled>
                    )}
                </ViewStyled>
            </ScrollView>
        </ViewStyled>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 40,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        marginBottom: 40,
    },
    logo: {
        width: 200,
        height: 80,
    },
    contentContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22,
    },
    labelInput: {
        color: theme_colors.primary,
        fontFamily: 'SFPro-SemiBold',
        fontSize: adjustFontSize(theme_textStyles.small),
        marginBottom: 10
    },
    containerInput: {
        width: '100%',
        height: 'auto',
        paddingVertical: heightPercentageToDP(0.8),
        marginBottom: 10
    },
    inputText: {
        borderColor: theme_colors.white,
        borderWidth: 1,
        width: '100%',
        height: 'auto',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        color: theme_colors.white,
        fontFamily: 'SFPro-Regular',
        fontSize: adjustFontSize(theme_textStyles.small),

        elevation: 2,
        shadowColor: theme_colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    errorText: {
        color: theme_colors.error,
        fontFamily: 'SFPro-Regular',
        fontSize: adjustFontSize(theme_textStyles.smaller),
    },
    button: {
        width: '100%',
        marginTop: 10,
    },
    loader: {
        marginTop: 20,
    },
    resultContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    icon: {
        marginBottom: 20,
    },
    resultTitle: {
        marginBottom: 15,
        textAlign: 'center',
    },
    resultMessage: {
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    thankYouMessage: {
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22,
    },
}); 