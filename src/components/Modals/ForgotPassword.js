import React from 'react'
import { Modal, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Pressable, Alert } from 'react-native'
import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled'
import TextInputStyled from '../ui/TextInputStyled'
import { theme } from '../../utils/theme'
import adjustFontSize from '../../utils/adjustText'
import { MaterialIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import { fetchWithoutToken } from '../../utils/fetchWithoutToken'
import { schemaRecoverPassword } from '../../utils/schemas'
import AlertStyled from '../ui/AlertStyled'

export default function ForgotPassword() {
    const [modal, setModal] = React.useState(false);
    const handleOnModal = () => setModal(prev => !prev);
    const [passwordSending, setPasswordSending] = React.useState(false)

    const [showAlert, setShowAlert] = React.useState(false)
    const [alertText, setAlertText] = React.useState({
        title: '',
        message: '',
        type: 'success',
    })
    const handleCloseAlert = () => setShowAlert(false)

    const SendEmail = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        try {
            var data = {
                mail: values.email,
                carnet: values.carnet_identidad
            }
            console.log(data)
            setPasswordSending(true)

            setPasswordSending(false)
            const res = await fetchWithoutToken(`entereza/forgot_password?email=${data.mail}&carnet=${data.carnet}`, "GET")

            const { codeError, msgError } = await res.json()

            console.log('Entereza Res Forgot Password: ', codeError, msgError)
            if (codeError === "COD200") {
                setModal(false)
                setShowAlert(true)
                setAlertText({
                    title: 'Contraseña Enviada',
                    message: 'Revisa tu correo y encontráras un mensaje de Entereza con tus nuevas credenciales.',
                    type: 'success',
                })
            } else if (codeError === "COD737") {
                setShowAlert(true)
                setAlertText({
                    title: 'Error al recuperar contraseña',
                    message: 'Límite de cambios por mes alcanzado.',
                    type: 'error',
                })
            } else {
                console.log('Msg Error Forgot Password: ', resp.msgError)
                setShowAlert(true)
                setAlertText({
                    title: 'Error al recuperar contraseña',
                    message: 'Las credenciales que ingresaste no son correctas. Verifica e intenta nuevamente.',
                    type: 'warning',
                })
            }

        } catch (err) {
            console.log('Error Entereza Forgot Password: ', err)
            Alert.alert('Algo salió mal...', 'Porfavor intenta nuevamente en unos minutos. Si el problema persiste contáctanos: enterezabol@gmail.com')
            // setShowAlert(true)
            // setAlertText({
            //     title: 'Algo salió mal...',
            //     message: 'Porfavor intenta nuevamente en unos minutos.',
            //     type: 'error',
            // })
        }
    }

    return (
        <>
            {
                showAlert
                    ?
                    <AlertStyled
                        widthModal={80}
                        heightModal={32}
                        widthText={70}
                        heightText={22}
                        title={alertText.title}
                        message={alertText.message}
                        type={alertText.type}
                        showCancelButton={false}
                        onConfirmPressed={handleCloseAlert}
                        showCloseButton={false}
                    />
                    : null
            }
            <ViewStyled
                backgroundColor={theme.transparent}
                width={100}
                paddingLeft={7}
                height={4}
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}
            >
                <Pressable onPress={handleOnModal}>
                    <TextStyled
                        fontWeight='700'
                        textAlign='center'
                        fontSize={15}
                        color={theme.secondary}
                        style={{
                            textDecorationLine: 'underline'
                        }}
                    >
                        ¿Olvidaste tu contraseña?
                    </TextStyled>
                </Pressable>
            </ViewStyled>

            <Modal
                visible={modal}
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
                    <KeyboardAvoidingView
                        behavior="position"
                    >

                        <ViewStyled
                            width={90}
                            height={58}
                            backgroundColor={theme.primary}
                            borderRadius={2}

                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ViewStyled
                                width={90}
                                height={11}
                                backgroundColor={theme.transparent}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <MaterialIcons
                                    name="info"
                                    size={adjustFontSize(30)}
                                    color={theme.secondary}
                                />
                                <TextStyled
                                    fontSize={18}
                                    textAlign='center'
                                    color={theme.quaternary}
                                    style={{
                                        marginTop: 5
                                    }}
                                >
                                    ¿Olvidaste tu contraseña?
                                </TextStyled>
                            </ViewStyled>

                            <Formik
                                initialValues={{
                                    email: '',
                                    carnet_identidad: ''
                                }}
                                onSubmit={SendEmail}
                                validationSchema={schemaRecoverPassword}
                            >
                                {
                                    ({
                                        handleSubmit,
                                        isSubmitting
                                    }) => (
                                        <ViewStyled
                                            width={90}
                                            height={42}
                                            backgroundColor={theme.transparent}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <TextInputStyled
                                                label="Email"
                                                name={"email"}
                                                placeholder="tucorreo@gmail.com"
                                                labelFontSize={14}
                                                maxLength={50}
                                                width={80}
                                                type={"default"}
                                                disabled={isSubmitting}
                                            />
                                            <ViewStyled
                                                width={90}
                                                height={1}
                                                backgroundColor={theme.transparent}
                                            />
                                            <TextInputStyled
                                                label="Nro. Carnet de Identidad"
                                                name={"carnet_identidad"}
                                                placeholder="1234567"
                                                labelFontSize={14}
                                                maxLength={9}
                                                width={80}
                                                type={"phone-pad"}
                                                disabled={isSubmitting}
                                            />

                                            <ViewStyled
                                                width={90}
                                                height={6}
                                                marginTop={2}
                                                backgroundColor={theme.transparent}
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <TouchableOpacity onPress={handleOnModal} style={{ marginRight: 10 }}>
                                                    <ViewStyled
                                                        width={35}
                                                        height={5}
                                                        backgroundColor={theme.danger}
                                                        borderRadius={2}
                                                        style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <TextStyled
                                                            fontSize={15}
                                                            color={theme.primary}
                                                            style={{
                                                                marginBottom: 4,
                                                                // fontFamily: 'Raleway',
                                                            }}>
                                                            Cancelar
                                                        </TextStyled>
                                                    </ViewStyled>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={handleSubmit}>
                                                    <ViewStyled
                                                        width={38}
                                                        height={5}
                                                        backgroundColor='#888cf3'
                                                        borderRadius={2}
                                                        style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <TextStyled
                                                            fontSize={15}
                                                            color={theme.primary}
                                                            textAlign={'center'}
                                                            style={{
                                                                marginBottom: 4,
                                                                width: '90%',
                                                                // fontFamily: 'Raleway',
                                                            }}>
                                                            Enviar
                                                        </TextStyled>
                                                    </ViewStyled>
                                                </TouchableOpacity>
                                            </ViewStyled>
                                        </ViewStyled>
                                    )
                                }
                            </Formik>
                        </ViewStyled>
                    </KeyboardAvoidingView>
                </ViewStyled>
            </Modal>

            <Modal
                visible={passwordSending}
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
                        width={75}
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
                            Enviando contraseña a tu correo...
                        </TextStyled>
                        <ActivityIndicator size="large" color={theme.secondary} />
                    </ViewStyled>
                </ViewStyled>
            </Modal>
        </>
    )
}
