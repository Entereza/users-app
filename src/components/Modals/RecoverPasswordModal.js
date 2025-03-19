import React, { useState } from 'react';
import { Modal, StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import { theme_colors } from '../../utils/theme/theme_colors';
import { theme_textStyles } from '../../utils/theme/theme_textStyles';
import TextStyled from '../../utils/ui/TextStyled';
import ViewStyled from '../../utils/ui/ViewStyled';
import TextInputStyled from '../../utils/ui/TextInputStyled';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import { Ionicons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import adjustFontSize from '../../utils/ui/adjustText';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const RecoverPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es requerido'),
});

export default function RecoverPasswordModal({ visible, onClose, onSubmit, isLoading }) {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: RecoverPasswordSchema,
        onSubmit: (values) => {
            onSubmit(values.email);
        },
    });

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Pressable
                style={styles.centeredView}
                onPress={onClose}
            >
                <Pressable
                    style={styles.modalView}
                    onPress={(e) => e.stopPropagation()}
                >
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        width={100}
                        style={styles.headerContainer}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.medium + 1}
                            color={theme_colors.primary}
                            fontFamily='SFPro-Bold'
                            style={styles.title}
                        >
                            Recuperar contraseña
                        </TextStyled>

                        {/* <Pressable onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={theme_colors.primary} />
                        </Pressable> */}
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        width={100}
                        style={styles.contentContainer}
                    >
                        <TextStyled
                            fontSize={theme_textStyles.smaller + .5}
                            color={theme_colors.white}
                            fontFamily='SFPro-Regular'
                            style={styles.description}
                        >
                            Ingresa tu correo electrónico y te enviaremos una contraseña temporal para que puedas acceder a tu cuenta.
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
                            colorText={theme_colors.white}
                            onPress={formik.handleSubmit}
                            borderRadius={1.5}
                            withIcon={false}
                            loading={isLoading}
                            fontSize={theme_textStyles.medium}
                            fontFamily={'SFPro-Bold'}
                            textButton={isLoading ? 'Enviando...' : 'Enviar'}
                            height={6}
                            style={styles.button}
                        />
                    </ViewStyled>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        width: '85%',
        backgroundColor: theme_colors.black,
        borderRadius: 15,
        paddingVertical: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
        shadowColor: theme_colors.white,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    title: {
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
    },
    contentContainer: {
        alignItems: 'center',
        width: '100%',
    },
    description: {
        textAlign: 'center',
        marginBottom: 25,
        paddingHorizontal: 10,
        lineHeight: 20,
    },
    labelInput: {
        color: theme_colors.white,
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
    },
    errorText: {
        color: theme_colors.error,
        fontFamily: 'SFPro-Regular',
        fontSize: adjustFontSize(theme_textStyles.smaller),
    },
    button: {
        width: '100%',
        marginTop: 5,
    },
    loader: {
        marginTop: 15,
    },
}); 