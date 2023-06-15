import React, { useState } from 'react'

import { Alert, ScrollView } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Formik } from 'formik'
import { useDispatch } from 'react-redux'

import TextStyled from '../components/ui/TextStyled'
import ViewStyled from '../components/ui/ViewStyled'
import { theme } from '../utils/theme'
import { schemaLogin } from '../utils/schemas'
// import EnterezaButton from '../components/Btn/ButtonEntereza';
import ImageStyled from '../components/ui/ImageStyled'
import { _authLogin } from '../redux/actions/authActions'
import { fetchWithoutToken } from '../utils/fetchWithoutToken'
import { codeErrors } from '../utils/codeErrors'
import { Modal, ActivityIndicator } from 'react-native';
import AlertStyled from '../components/ui/AlertStyled';
import ForgotPassword from '../components/Modals/ForgotPassword';
import TextInputStyledLogin from '../components/ui/TextInputStyledLogin';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }) {
    const [Loading, setLoading] = useState(false)
    const [text, setText] = useState('')

    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState({
        title: '',
        message: '',
        type: 'success',
    })
    const handleCloseAlert = () => setShowAlert(false)

    const dispatch = useDispatch()

    function goBack() {
        navigation.navigate("AuthenticationScreen");
    }

    const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
        setShowAlert(false)
        setSubmitting(true)
        try {
            setText('Iniciando Sesión con Entereza...')
            setLoading(true)
            let data = {
                mail: values.email,
                password: values.password,
                code: values.code,
                vrf: values.vrf
            }
            console.log(values)


            const res = await fetchWithoutToken('entereza/login_user', "POST", data)
            const {
                entereza,
                codigoEntidad,
                jwt,
                rol,
                mail,
                ...rest
            } = await res.json()
            // console.log(jwt)

            if (entereza.codeError === codeErrors.cod105 || entereza.codeError === codeErrors.cod95) {
                await Promise.all([
                    AsyncStorage.setItem('ENT-EMAIL', mail),
                    AsyncStorage.setItem('ENT-CODUSR', codigoEntidad),
                    AsyncStorage.setItem('ENT-TKN', jwt),
                ])

                dispatch(_authLogin(data))
                resetForm()

            } else {
                console.log("Respuesta ", entereza)
                setShowAlert(true)
                setAlertText({
                    title: 'Error al Iniciar Sesión con Entereza',
                    message: 'Porfavor revise sus datos intente nuevamente.',
                    type: 'error',
                })
            }
            setLoading(false)
            setSubmitting(false)
        } catch (err) {
            Alert.alert('Error al iniciar Sesión con Entereza', 'Credenciales incorrectas!')
            setLoading(false)
            setSubmitting(false)
            console.log(err)
        }
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: theme.dark }}>
                <ViewStyled
                    backgroundColor={theme.transparent}
                    width={100}
                    height={100}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            backgroundColor: theme.transparent,
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
                                    title={alertText.title}
                                    message={alertText.message}
                                    type={alertText.type}
                                    showCancelButton={false}
                                    onConfirmPressed={handleCloseAlert}
                                    showCloseButton={false}
                                />
                            )
                        }
                        <ViewStyled
                            height={28}
                            width={100}
                            marginLeftAuto
                            marginRightAuto
                            backgroundColor={theme.transparent}
                            marginTop={7}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ImageStyled
                                source={require('../../assets/img/EnterezaLogoColors.png')}
                                width={60}
                                height={20}
                                style={{
                                    resizeMode: 'contain',
                                }}

                            />
                            <TextStyled
                                fontSize={24}
                                fontWeight="600"
                                color={theme.secondary}
                                style={{
                                    marginTop: 5,
                                }}
                            >
                                Bienvenido a Entereza
                            </TextStyled>
                        </ViewStyled>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                vrf: "",
                                code: "USER",
                            }}
                            validationSchema={schemaLogin}
                            onSubmit={handleOnSubmit}
                        >
                            {
                                ({
                                    handleSubmit,
                                    isSubmitting
                                }) => (
                                    <ViewStyled
                                        width={100}
                                        height={50}
                                        backgroundColor={theme.transparent}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TextInputStyledLogin
                                            label={'Correo Electrónico'}
                                            name={'email'}
                                            labelFontSize={14}
                                            width={80}
                                            heightInput={8}
                                            maxLength={50}
                                            type={'email-address'}
                                            disabled={isSubmitting}
                                            placeholder={'tucorreo@gmail.com'}
                                        />
                                        <ViewStyled
                                            height={1}
                                            backgroundColor={theme.transparent}
                                        />
                                        <TextInputStyledLogin
                                            label={'Contraseña'}
                                            name={'password'}
                                            labelFontSize={14}
                                            heightInput={8}
                                            width={80}
                                            isSecure={true}
                                            type={'default'}
                                            disabled={isSubmitting}
                                            placeholder={'********'}
                                            maxLength={20}
                                        />
                                        <ForgotPassword />
                                        <ViewStyled
                                            height={12}
                                            backgroundColor={theme.transparent}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <TextStyled
                                                color='gray'
                                                fontSize={16}
                                                fontWeight='600'
                                                style={{
                                                    textDecorationLine: 'underline',
                                                    marginTop: 10
                                                    // fontFamily: 'Raleway',
                                                }}
                                                onPress={goBack}
                                            >
                                                Crear Cuenta
                                            </TextStyled>
                                        </ViewStyled>
                                    </ViewStyled>
                                )
                            }
                        </Formik>
                        <ViewStyled height={30} backgroundColor={theme.transparent} />
                    </ScrollView>
                </ViewStyled>
            </SafeAreaView>

            <Modal
                visible={Loading}
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
                            fontSize={15}
                            textAlign='center'
                            color='#888cf3'
                            style={{
                                marginBottom: 20,
                                width: '90%'
                            }}
                        >
                            {text}
                        </TextStyled>
                        <ActivityIndicator size="large" color={theme.secondary} />
                    </ViewStyled>
                </ViewStyled>
            </Modal>
        </>

    )
}