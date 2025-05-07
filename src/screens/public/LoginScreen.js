import React, { useState, useEffect } from 'react'
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
import { StyleSheet, Alert, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import adjustFontSize from '../../utils/ui/adjustText';
import ButtonWithIcon from '../../components/Buttons/ButtonWithIcon';
import { authService } from '../../services/api/auth';
import useAuthStore from '../../utils/tools/interface/authStore';
import { useNavigation } from '@react-navigation/native';
import { public_name_routes } from '../../utils/route/public_name_routes';
import { toastService } from '../../utils/tools/interface/toastService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationService } from '../../services/notifications/notificationService';
import useNotificationStore from '../../utils/tools/interface/notificationStore';
import RecoverPasswordModal from '../../components/Modals/RecoverPasswordModal';
import MessageModal from '../../components/Modals/MessageModal';
import { userService } from '../../services/api/users/userService';

export default function LoginScreen() {
    const insets = useSafeAreaInsets();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setUserData } = useAuthStore();
    const navigation = useNavigation()
    const { setExpoPushToken, setNotificationListeners, setIsNotificationsEnabled } = useNotificationStore();
    const [showRecoverModal, setShowRecoverModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageModalData, setMessageModalData] = useState({
        title: '',
        message: '',
        type: 'success'
    });
    const [isRecovering, setIsRecovering] = useState(false);

    useEffect(() => {
        return () => {
            // Cleanup notification listeners on unmount
            const { notificationListeners } = useNotificationStore.getState();
            if (notificationListeners) {
                notificationService.removeNotificationListeners(notificationListeners);
            }
        };
    }, []);

    const handleNotificationsSetup = async (userId) => {
        const notificationSetup = await notificationService.initializeNotificationsAfterLogin(userId);
        if (notificationSetup) {
            const { token, listeners } = notificationSetup;
            setExpoPushToken(token);
            setNotificationListeners(listeners);
            setIsNotificationsEnabled(true);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schemaLogin,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                console.log('values: ', values)
                setLoading(true);
                const response = await authService.login(values.email, values.password);

                console.log('response: ', response)
                if (response && response.code === 'COD200') {
                    const userData = {
                        id: response.client.id,
                        names: response.client.names,
                        lastNames: response.client.lastNames,
                        phoneNumber: response.client.phoneNumber,
                        ci: response.client.carnet,
                        cashback: response.client.cashback,
                        email: response.client.email,
                        image: response.client.img,
                        password: response.client?.password || response.client?.plainPassword || "",
                        status: response.client.status,
                        username: response.client.username,
                    }

                    setUserData(userData);
                    AsyncStorage.setItem('userData', JSON.stringify(userData));
                    if (response.token) {
                        AsyncStorage.setItem('token', response.token)
                    }

                    await handleNotificationsSetup(response.client.id);
                } else if (response && response.code === 'COD723') {
                    navigation.navigate(public_name_routes.auth.accountRecovery);
                } else if (response && response.code === 'COD401') {
                    toastService.showErrorToast("Correo electrónico o contraseña incorrectos");
                } else {
                    toastService.showErrorToast(response.msg || "Error al iniciar sesión");
                }
            } catch (error) {
                console.error('Error during login:', error);
                toastService.showErrorToast(error.message || "Hubo un problema al intentar iniciar sesión");
            } finally {
                setLoading(false);
            }
        }
    });

    const goToRegisterScreen = () => {
        navigation.navigate(public_name_routes.auth.signUp)
    }

    const handleForgotPassword = () => {
        setShowRecoverModal(true);
    };

    const handleRecoverPassword = async (email) => {
        try {
            setIsRecovering(true);
            const response = await userService.forgetPassword(email);

            setShowRecoverModal(false);

            setMessageModalData({
                title: 'Contraseña Recuperada',
                message: 'Se ha enviado una contraseña temporal a tu correo electrónico. Utilízala para iniciar sesión y luego cámbiala por una nueva.',
                type: 'success'
            });

            setShowMessageModal(true);
        } catch (error) {
            console.error('Error recovering password:', error);

            setMessageModalData({
                title: 'Error',
                message: 'No se pudo recuperar la contraseña. Verifica que el correo electrónico sea correcto e intenta nuevamente.',
                type: 'error'
            });

            setShowMessageModal(true);
        } finally {
            setIsRecovering(false);
        }
    };

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ViewStyled
                    backgroundColor={theme_colors.dark}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                    }}
                >
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            alignItems: 'center',
                            paddingTop: insets.top + heightPercentageToDP(10),
                            paddingBottom: insets.bottom,
                        }}
                        keyboardShouldPersistTaps="handled"
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

                        <Pressable onPress={handleForgotPassword} style={{ alignSelf: 'flex-end', marginRight: 22, marginTop: 5, marginBottom: 15 }}>
                            <TextStyled
                                textAlign='right'
                                fontFamily='SFPro-Italic'
                                fontSize={theme_textStyles.smaller + .5}
                                color={theme_colors.white}
                            >
                                {'¿Olvidaste tu contraseña?'}
                            </TextStyled>
                        </Pressable>

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

                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            style={{
                                width: '100%',
                                marginTop: 'auto',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
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
                                    marginBottom: 10,
                                }}
                            />

                            <TermsConditions />
                        </ViewStyled>
                    </ScrollView>
                </ViewStyled>
            </KeyboardAvoidingView>

            <RecoverPasswordModal
                visible={showRecoverModal}
                onClose={() => setShowRecoverModal(false)}
                onSubmit={handleRecoverPassword}
                isLoading={isRecovering}
            />

            <MessageModal
                visible={showMessageModal}
                onClose={() => setShowMessageModal(false)}
                title={messageModalData.title}
                message={messageModalData.message}
                type={messageModalData.type}
            />
        </>
    );
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