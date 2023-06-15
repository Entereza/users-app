import React, { useState } from 'react'
import { ScrollView, KeyboardAvoidingView, ActivityIndicator, Modal, TouchableOpacity } from 'react-native'

import { Formik } from 'formik'
import { useDispatch } from 'react-redux'

import TextInputStyled from '../components/ui/TextInputStyled'
import ViewStyled from '../components/ui/ViewStyled'
import { theme } from '../utils/theme'
import ButtonTextStyled from '../components/ui/ButtonTextStyled'
import { fetchWithToken } from '../utils/fetchWithToken'
import { schemaDeleteAccount } from '../utils/schemas'
import ImageStyled from '../components/ui/ImageStyled'
import AlertStyled from '../components/ui/AlertStyled'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TextStyled from '../components/ui/TextStyled'
import { __authLogout } from '../redux/actions/authActions';
import { MaterialIcons } from '@expo/vector-icons'

export default function DeleteAccountScreen({
    navigation
}) {
    const dispatch = useDispatch();
    const [closeModal, setCloseModal] = useState(false);

    const [closing, setClosing] = useState(false)


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

    const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
        if (values.carnet_identidad !== '' && values.carnet_identidad > 5) {
            setSubmitting(true)
            try {
                const email = await AsyncStorage.getItem('ENT-EMAIL')

                let data = {
                    correo: email,
                    carnet: values.carnet_identidad
                }
                console.log(data)

                const res = await fetchWithToken('entereza/del_user', 'POST', data)
                const {
                    codeError,
                    msgError
                } = await res.json()
                console.log(codeError, msgError)

                if (codeError === null) {
                    setCloseModal(true)
                } else {
                    setShowAlert(true)
                    setAlertText({
                        title: 'Error al Eliminar Cuenta',
                        message: 'Por favor, revise sus datos e intente nuevamente.',
                        type: 'warning',
                        back: false
                    })
                }

            } catch (err) {
                console.log(err)
                setShowAlert(true)
                setAlertText({
                    title: 'Error al Eliminar Cuenta',
                    message: 'Algo salió mal.\nPor favor intente más tarde',
                    type: 'error',
                    back: true
                })
            }
            setSubmitting(false)
        } else {
            setShowAlert(true)
            setAlertText({
                title: 'Carnet no válido',
                message: 'El campo de carnet no puede estar vacío.',
                type: 'warning',
                back: false
            })
        }
    }

    // const [deleteModal, setDeleteModal] = React.useState(false)

    // const Delete = () => {
    //     setDeleteModal(true)
    // }

    // const DeleteFalse = () => {
    //     setDeleteModal(false)
    // }

    const closeSesion = () => {
        setClosing(true)
        dispatch(__authLogout())
        setClosing(false)
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: theme.primary
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
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}
                >
                    <ViewStyled
                        width={100}
                        height={30}
                        marginBottom={2}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <ImageStyled
                            source={require('../assets/profile/passsword.png')}
                            width={75}
                            height={29.5}
                            style={{
                                resizeMode: 'cover'
                            }}
                        />
                    </ViewStyled>
                    <TextStyled
                        fontSize={16}
                        textAlign='center'
                        color={theme.tertiary}
                        style={{
                            width: '95%',
                            marginBottom: 20
                        }}
                    >
                        Esta acción borrará TODOS tus datos con Entereza, incluyendo las compras y el dinero que tienes en la aplicación.
                    </TextStyled>
                    <TextStyled
                        fontSize={16}
                        textAlign='center'
                        color={theme.quaternary}
                        style={{
                            width: '85%',
                            marginTop: 5,
                            marginBottom: 10,
                        }}
                    >
                        Para confirmar la eliminación de tu cuenta, ingresa tu Nro de CI.
                    </TextStyled>
                    <Formik
                        initialValues={{
                            carnet_identidad: ''
                        }}
                        onSubmit={handleOnSubmit}
                        validationSchema={schemaDeleteAccount}
                    >
                        {
                            ({
                                handleSubmit,
                                isSubmitting
                            }) => (
                                <KeyboardAvoidingView
                                    behavior="position"
                                >
                                    <ViewStyled
                                        width={90}
                                        height={25}
                                        backgroundColor={theme.transparent}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TextInputStyled
                                            label={'Ingrese su CI'}
                                            name='carnet_identidad'
                                            type='phone-pad'
                                            disabled={isSubmitting}
                                            placeholder={'123456789'}
                                            width={85}
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
                                            // disabled={isSubmitting}
                                        >
                                            Confirmar CI
                                        </ButtonTextStyled>
                                    </ViewStyled>
                                </KeyboardAvoidingView>
                            )
                        }
                    </Formik>
                </ViewStyled>
            </ScrollView>

            <Modal
                visible={closeModal}
                animationType="fade"
                transparent={true}
            >
                <ViewStyled
                    backgroundColor='#000000AA'
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ViewStyled
                        width={80}
                        height={25}
                        backgroundColor='#ffffff'
                        borderRadius={2}

                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <MaterialIcons
                            name="check-circle"
                            size={25}
                            color={theme.success}
                        />
                        <TextStyled
                            fontSize={15}
                            textAlign='center'
                            color={theme.quaternary}
                            style={{
                                marginTop: 10,
                                marginBottom: 15,
                                width: '90%',
                            }}
                        >
                            {`Su cuenta fue eliminada con éxito.\n Gracias por haber sido parte de Entereza.`}
                        </TextStyled>
                        <TouchableOpacity onPress={closeSesion}>
                            <ViewStyled
                                width={38}
                                height={5}
                                backgroundColor={theme.secondary}
                                borderRadius={2}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <TextStyled
                                    fontSize={13}
                                    color={theme.primary}
                                    textAlign={'center'}
                                    style={{
                                        marginBottom: 4,
                                        width: '90%',
                                        // fontFamily: 'Raleway',
                                    }}>
                                    Aceptar
                                </TextStyled>
                            </ViewStyled>
                        </TouchableOpacity>
                    </ViewStyled>
                </ViewStyled>
            </Modal>

            {/* <Modal
                visible={deleteModal}
                animationType="fade"
                transparent={true}
            >
                <ViewStyled
                    backgroundColor='#000000AA'
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ViewStyled
                        width={90}
                        height={25}
                        backgroundColor={theme.primary}
                        borderRadius={2}

                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ViewStyled
                            width={80}
                            height={11}
                            backgroundColor={theme.transparent}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <MaterialIcons
                                name="error"
                                size={25}
                                color={theme.danger}
                            />
                            <TextStyled
                                fontSize={17}
                                textAlign='center'
                                color={theme.quaternary}
                                style={{
                                    marginTop: 5
                                }}
                            >
                                ¿Estas seguro de cerrar sesión?
                            </TextStyled>
                        </ViewStyled>

                        <ViewStyled
                            width={65}
                            height={6}
                            marginTop={1}
                            backgroundColor={theme.transparent}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <TouchableOpacity onPress={DeleteFalse} style={{ marginRight: 10 }}>
                                <ViewStyled
                                    width={35}
                                    height={5}
                                    backgroundColor={theme.secondary}
                                    borderRadius={2}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <TextStyled
                                        fontSize={13}
                                        color={theme.primary}
                                        style={{
                                            marginBottom: 4,
                                            // fontFamily: 'Raleway',
                                        }}>
                                        Cancelar
                                    </TextStyled>
                                </ViewStyled>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleOnSubmit}>
                                <ViewStyled
                                    width={38}
                                    height={5}
                                    backgroundColor={theme.danger}
                                    borderRadius={2}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <TextStyled
                                        fontSize={13}
                                        color={theme.primary}
                                        textAlign={'center'}
                                        style={{
                                            marginBottom: 4,
                                            width: '90%',
                                            // fontFamily: 'Raleway',
                                        }}>
                                        Eliminar Cuenta
                                    </TextStyled>
                                </ViewStyled>
                            </TouchableOpacity>
                        </ViewStyled>
                    </ViewStyled>
                </ViewStyled>
            </Modal> */}

            <Modal
                visible={closing}
                animationType="fade"
                transparent={true}
            >
                <ViewStyled
                    backgroundColor='#000000AA'
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ViewStyled
                        width={70}
                        height={18}
                        backgroundColor='#ffffff'
                        borderRadius={2}

                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextStyled
                            fontSize={18}
                            textAlign='center'
                            color='#888cf3'
                            style={{
                                marginBottom: 20,
                                width: '90%'
                            }}
                        >
                            Cerrando Sesión...
                        </TextStyled>
                        <ActivityIndicator size="large" color={theme.secondary} />
                    </ViewStyled>
                </ViewStyled>
            </Modal>
        </>

    )
}