import React, { useState } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'

import { Formik } from 'formik'
import { useSelector } from 'react-redux'

import TextInputStyled from '../components/ui/TextInputStyled'
import ViewStyled from '../components/ui/ViewStyled'
import { theme } from '../utils/theme'
import ButtonTextStyled from '../components/ui/ButtonTextStyled'
import { fetchWithToken } from '../utils/fetchWithToken'
import { codeErrors } from '../utils/codeErrors'
import { schemaChangePassword } from '../utils/schemas'
import ImageStyled from '../components/ui/ImageStyled'
import AlertStyled from '../components/ui/AlertStyled'

export default function ProfilePassword({
    navigation
}) {

    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState({
        title: '',
        message: '',
        type: 'success',
        back: false
    })

    const handleCloseAlert = () => setShowAlert(false)
    const handleOnCloseAlertAndGoBack = () => {
        setShowAlert(false)
        navigation.goBack()
    }

    const { info } = useSelector(state => state.auth)

    const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        try {

            let data = {
                user_password: values.currentPassword,
                new_password: values.newPassword,
                email: info?.usuarioBean?.mail || ''
            }

            const res = await fetchWithToken('entereza/user_auth_update', 'POST', data)
            const {
                codeError,
                msgError
            } = await res.json()
            console.log(msgError)
            if (codeError === codeErrors.cod243) {
                setShowAlert(true)
                setAlertText({
                    title: 'Contraseña actualizada',
                    message: 'Su contraseña ha sido actualizada con éxito.',
                    type: 'success',
                    back: true
                })
                resetForm()
            } else if (codeError === codeErrors.cod543) {
                setShowAlert(true)
                setAlertText({
                    title: 'Contraseña incorrecta',
                    message: 'Por favor, revise e intente nuevamente.',
                    type: 'warning',
                    back: false
                })
            } else if (codeError === codeErrors.cod737) {
                setShowAlert(true)
                setAlertText({
                    title: 'Límite de intentos excedido',
                    message: 'Por favor, intente nuevamente en unos minutos.',
                    type: 'error',
                    back: false
                })
            }

        } catch (err) {
            console.log(err)
            setShowAlert(true)
            setAlertText({
                title: 'Oops!',
                message: 'Algo salió mal.\nPor favor intente más tarde',
                type: 'error',
                back: true
            })
        }
        setSubmitting(false)
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
            scrollToOverflowEnabled={false}
        >
            {
                showAlert
                && (
                    <AlertStyled
                        widthModal={70}
                        heightModal={30}
                        heightText={20}
                        title={alertText.title}
                        message={alertText.message}
                        type={alertText.type}
                        showCancelButton={false}
                        onConfirmPressed={alertText.back ? handleOnCloseAlertAndGoBack : handleCloseAlert}
                        showCloseButton={false}
                    />
                )
            }
            <ViewStyled
                style={{
                    alignItems: 'center'
                }}
            >
                <KeyboardAvoidingView
                    behavior="position"
                >
                    <ViewStyled
                        width={100}
                        height={32}
                        marginVertical={2}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <ImageStyled
                            source={require('../assets/profile/ProfilePassword.png')}
                            width={75}
                            height={32}
                            style={{
                                resizeMode: 'contain'
                            }}
                        />
                    </ViewStyled>
                    <Formik
                        initialValues={{
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                        }}
                        onSubmit={handleOnSubmit}
                        validationSchema={schemaChangePassword}
                    >
                        {
                            ({
                                handleSubmit,
                                isSubmitting
                            }) => (
                                <ViewStyled
                                    width={100}
                                    height={52.5}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TextInputStyled
                                        label={'Contraseña actual'}
                                        name='currentPassword'
                                        type='default'
                                        placeholder={'********'}
                                        isSecure={true}
                                        disabled={isSubmitting}
                                    />
                                    <ViewStyled
                                        width={90}
                                        height={1}
                                        backgroundColor={theme.transparent}
                                    />
                                    <TextInputStyled
                                        label={'Nueva contraseña'}
                                        name='newPassword'
                                        type='default'
                                        isSecure={true}
                                        disabled={isSubmitting}
                                        placeholder={'********'}
                                    />
                                    <ViewStyled
                                        width={90}
                                        height={1}
                                        backgroundColor={theme.transparent}
                                    />
                                    <TextInputStyled
                                        label={'Confirmar contraseña'}
                                        name='confirmPassword'
                                        type='default'
                                        isSecure={true}
                                        disabled={isSubmitting}
                                        placeholder={'********'}
                                    />
                                    <ViewStyled
                                        width={90}
                                        height={1}
                                        backgroundColor={theme.transparent}
                                    />
                                    <ButtonTextStyled
                                        onPress={handleSubmit}
                                        backgroundColor={`${theme.secondary}23`}
                                        style={{
                                            position: 'relative',
                                            width: '85%',
                                            marginTop: 10
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        Cambiar contraseña
                                    </ButtonTextStyled>
                                </ViewStyled>)
                        }
                    </Formik>
                </KeyboardAvoidingView>
            </ViewStyled>
        </ScrollView >
    )
}