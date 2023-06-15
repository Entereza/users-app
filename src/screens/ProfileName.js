import React, { useState } from 'react'
import { ScrollView, KeyboardAvoidingView, TextInput, ActivityIndicator, Modal, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity } from 'react-native'

import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import TextInputStyled from '../components/ui/TextInputStyled'
import ViewStyled from '../components/ui/ViewStyled'
import { theme } from '../utils/theme'
import ButtonTextStyled from '../components/ui/ButtonTextStyled'
import { fetchWithToken } from '../utils/fetchWithToken'
import { codeErrors } from '../utils/codeErrors'
import { schemaChangePassword } from '../utils/schemas'
import ImageStyled from '../components/ui/ImageStyled'
import AlertStyled from '../components/ui/AlertStyled'
import { useNavigation } from '@react-navigation/native'
import TextStyled from '../components/ui/TextStyled'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ButtonNext from '../components/Btn/ButtonNext'
import { __authGetInfo } from '../redux/actions/authActions'

export default function ProfileName() {
    const User = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [buttonDisabled, setButtonDisabled] = useState(true)


    const [nameUser, setNameUser] = useState('')
    const [apellidosUser, setApellidosUser] = useState('')

    const [newNameUser, setNewNameUser] = useState('')
    const [newApellidosUser, setNewApellidosUser] = useState('')

    const [modal, setModal] = useState(false)

    const [CI_User, setCI_User] = useState('')

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

    const SetNameDefaults = async () => {
        try {
            console.log(info.usuarioBean?.nombres)
            console.log(info.usuarioBean?.apellidos)

            const name = await info.usuarioBean?.nombres
            const last = await info.usuarioBean?.apellidos

            setNameUser(name)
            setApellidosUser(last)

            setNewNameUser(name)
            setNewApellidosUser(last)
        } catch (error) {
            console.log('SetNameDefaults: ', error)
        }
    }

    React.useEffect(() => {
        if (info !== null) {
            SetNameDefaults()
        }
    }, [info])

    const CheckNameApellido = async () => {
        if (newNameUser !== nameUser || newApellidosUser !== apellidosUser) {
            console.log('Cambia el nombre o apellido')
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }

    React.useEffect(() => {
        if (nameUser !== '' && apellidosUser !== '' && newNameUser !== '' && newApellidosUser !== '') {
            CheckNameApellido()
        }
    }, [newNameUser, newApellidosUser])

    const SendNewData = async () => {
        setIsSubmitting(true)
        try {
            const codeUser = await User.info.usuarioBean?.codigo_usuario

            const data = {
                nombre: newNameUser,
                apellido: newApellidosUser,
                codigoUsuario: codeUser
            }

            const res = await fetchWithToken("entereza/update_an", "PUT", data)
            const {
                codeError,
                msgError
            } = await res.json()
            console.log('Console SendNewData: ', codeError, '- ', msgError)

            if (codeError === codeErrors.cod200) {
                dispatch(__authGetInfo())
                setShowAlert(true)
                setAlertText({
                    title: 'Datos Actualizados',
                    message: 'Sus datos se actualizaron correctamente.',
                    type: 'success',
                    back: true
                })
            } else {
                setShowAlert(true)
                setAlertText({
                    title: 'Error al guardar sus datos.',
                    message: 'Por favor, revise sus datos e intente nuevamente.',
                    type: 'error',
                    back: false
                })
            }

        } catch (error) {
            console.log('Error SendNewData: ', error)
            setShowAlert(true)
            setAlertText({
                title: 'Error al guardar sus datos.',
                message: 'Por favor, revise sus datos e intente en unos minutos.',
                type: 'error',
                back: true
            })
        }
        setIsSubmitting(false)
    }

    const VerifyCIUser = async () => {
        try {
            const CI = await User.info.usuarioBean?.carnet_identidad

            if (CI_User !== '') {
                if (CI_User !== CI) {
                    setShowAlert(true)
                    setAlertText({
                        title: 'Carnet Incorrecto',
                        message: 'Su carnet no coincide, por favor revise e intente nuevamente.',
                        type: 'warning',
                        back: false
                    })
                } else {
                    setModal(false)
                    SendNewData()
                }
            } else {
                setShowAlert(true)
                setAlertText({
                    title: 'Error al verificar CI',
                    message: 'El carnet no puede estar vacio, revise e intente nuevamente.',
                    type: 'warning',
                    back: false
                })
            }
        } catch (error) {
            console.log('Error VerifyCIUser: ', error)
        }
    }

    const VerifyNameLastEmpty = async () => {
        if (newApellidosUser !== '' || newNameUser !== '') {
            setModal(true)
        } else {
            setShowAlert(true)
            setAlertText({
                title: 'Error al guardar datos',
                message: 'Sus datos no pueden estar vacios, revise sus datos e intente nuevamente.',
                type: 'warning',
                back: false
            })
        }
    }
                //7694315

    return (
        <>
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
                            backgroundColor={theme.transparent}
                            width={100}
                            height={32}
                            marginVertical={2}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <ImageStyled
                                source={require('../assets/profile/ProfileData.png')}
                                width={80}
                                height={32}
                                style={{
                                    resizeMode: 'contain'
                                }}
                            />
                        </ViewStyled>

                        <ViewStyled
                            backgroundColor={theme.transparent}
                            width={100}
                            height={40}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ViewStyled
                                width={90}
                                height={12}
                                style={{
                                    justifyContent: 'center',
                                }}
                                marginBottom={2.5}
                            >
                                <TextStyled
                                    color={theme.secondary}
                                    fontSize={14}
                                    fontFamily='BRFirmaBold'
                                    style={{
                                        marginBottom: '1.5%',
                                    }}
                                >
                                    Nombre/s
                                </TextStyled>
                                <TextInput
                                    value={newNameUser}
                                    onChangeText={nameUser => setNewNameUser(nameUser)}
                                    keyboardType={'default'}
                                    maxLength={15}
                                    style={{
                                        backgroundColor: '#f3f5f7cc',
                                        paddingVertical: hp(1),
                                        paddingHorizontal: hp(2),
                                        borderRadius: wp(2),
                                        height: hp(8),
                                    }}
                                />
                            </ViewStyled>

                            <ViewStyled
                                width={90}
                                height={12}
                                style={{
                                    justifyContent: 'center',
                                }}
                                marginBottom={2.5}
                            >
                                <TextStyled
                                    color={theme.secondary}
                                    fontSize={14}
                                    fontFamily='BRFirmaBold'
                                    style={{
                                        marginBottom: '1.5%',
                                    }}
                                >
                                    Apellidos/s
                                </TextStyled>
                                <TextInput
                                    value={newApellidosUser}
                                    onChangeText={apellidosUser => setNewApellidosUser(apellidosUser)}
                                    keyboardType={'default'}
                                    maxLength={40}
                                    style={{
                                        backgroundColor: '#f3f5f7cc',
                                        paddingVertical: hp(1),
                                        paddingHorizontal: hp(2),
                                        borderRadius: wp(2),
                                        height: hp(8),
                                    }}
                                />
                            </ViewStyled>

                            <ButtonNext
                                width={60}
                                height={8}
                                onPress={VerifyNameLastEmpty}
                                color={buttonDisabled ? `${theme.dark}23` : theme.secondary}
                                colorText={buttonDisabled ? `${theme.dark}70` : theme.primary}
                                text={isSubmitting ? <ActivityIndicator size={'large'} color={theme.primary} /> : 'Actualizar Datos'}
                                disabled={isSubmitting ? isSubmitting : buttonDisabled}
                            />
                        </ViewStyled>
                    </KeyboardAvoidingView>
                </ViewStyled>
            </ScrollView>

            <Modal
                visible={modal}
                animationType="fade"
                transparent={true}
            >
                {
                    showAlert
                    && (
                        <AlertStyled
                            widthModal={70}
                            heightModal={30}
                            title={alertText.title}
                            widthText={60}
                            message={alertText.message}
                            type={alertText.type}
                            showCancelButton={false}
                            showCloseButton={false}
                            onConfirmPressed={alertText.back ? handleOnCloseAlertAndGoBack : handleCloseAlert}
                        />
                    )
                }

                <ViewStyled
                    backgroundColor='#000000AA'
                    style={{
                        flex: 1,
                    }}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end'
                            }}
                        >
                            <ViewStyled
                                width={100}
                                height={40}
                                backgroundColor={theme.primary}

                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderTopRightRadius: 60,
                                    borderTopLeftRadius: 60,
                                }}
                            >
                                <TextStyled
                                    fontSize={23}
                                    textAlign='center'
                                    fontFamily='BRFirmaBold'
                                    fontWeight='bold'
                                    color={theme.secondary}
                                    style={{
                                        marginBottom: 18,
                                    }}
                                >
                                    Confirmar Actualización
                                </TextStyled>

                                <TextStyled
                                    textAlign='center'
                                    color={theme.quaternary}
                                    fontSize={16}
                                    style={{
                                        width: '90%',
                                        marginBottom: 15,
                                        // fontFamily: 'BRFirma-Regular',
                                    }}
                                >
                                    Para actualizar tus datos, por favor ingresa tu número de CI.
                                </TextStyled>

                                <TextInput
                                    placeholder={"Ingresa tu CI"}
                                    name={"CI"}
                                    labelFontSize={9}
                                    maxLength={11}
                                    width={250}
                                    height={40}
                                    keyboardType="phone-pad"

                                    value={CI_User}
                                    onChangeText={CI_User => setCI_User(CI_User)}

                                    onTouchEnd={() => console.log('Terminado')}

                                    style={{
                                        padding: 10,
                                        borderWidth: 1,
                                        borderColor: '#888cf3',
                                        borderRadius: 20
                                    }}
                                />

                                <ViewStyled
                                    backgroundColor={theme.transparent}
                                    width={100}
                                    height={7}
                                    marginTop={2}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <TouchableOpacity onPress={() => setModal(false)} disabled={isSubmitting}>
                                        <ViewStyled
                                            marginRight={3}
                                            width={35}
                                            height={6}
                                            backgroundColor={theme.danger}
                                            borderRadius={2}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <TextStyled
                                                fontSize={16}
                                                color={theme.primary}
                                                textAlign={'center'}
                                                style={{
                                                    marginBottom: 4,
                                                }}
                                            >
                                                Cancelar
                                            </TextStyled>
                                        </ViewStyled>
                                    </TouchableOpacity >

                                    <TouchableOpacity onPress={VerifyCIUser} disabled={isSubmitting}>
                                        <ViewStyled
                                            width={35}
                                            height={6}
                                            backgroundColor={theme.secondary}
                                            borderRadius={2}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <TextStyled
                                                fontSize={16}
                                                color={theme.primary}
                                                textAlign={'center'}
                                                style={{
                                                    marginBottom: 4,
                                                }}
                                            >
                                                Confirmar
                                            </TextStyled>
                                        </ViewStyled>
                                    </TouchableOpacity >
                                </ViewStyled>
                            </ViewStyled>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </ViewStyled>
            </Modal>
        </>
    )
}