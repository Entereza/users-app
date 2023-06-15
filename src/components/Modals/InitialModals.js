import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { __authGetInfo } from '../../redux/actions/authActions';

//Importar componentes
import { Modal, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native'
import TextStyled from '../ui/TextStyled'
import ViewStyled from '../ui/ViewStyled';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
//Importar styles
import { FontAwesome5 } from '@expo/vector-icons';

//Importar Botones
import ButtonNext from '../Btn/ButtonNext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWithToken } from '../../utils/fetchWithToken';
import { customStyles } from '../../utils/customStyles';
import AlertStyled from '../ui/AlertStyled';
import { theme } from '../../utils/theme';
import ImageStyled from '../ui/ImageStyled';
import { useRef } from 'react';
import { codeErrors } from '../../utils/codeErrors';
import { TouchableOpacity } from 'react-native';

export default function InitialModals() {
    const dispatch = useDispatch()

    const User = useSelector(state => state.auth)

    const [NumberModal, setNumberModal] = React.useState(false)
    const [CiModal, setCiModal] = React.useState(false)

    const [CI_User, setCI_User] = React.useState('');

    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState({
        title: '',
        message: '',
        type: 'success',
        back: false
    })

    const handleCloseAlert = () => setShowAlert(false)
    const errorSendClose = () => {
        setShowAlert(false)
        setCiModal(false)
        setNumberModal(false)
    }

    const ReloadInfo = () => {
        console.log('ReloadInfo...')
        dispatch(__authGetInfo())
    }

    //NumberPhoneFunctions
    const [numberPhone, setNumberPhone] = React.useState('')

    const CheckPhone = async () => {
        const Number = await User.info.usuarioBean?.contacto
        const CI = await User.info.usuarioBean?.carnet_identidad

        if (Number !== null) {
            console.log('Tiene su número, no mostrar modal del número - ', Number)
            if (CI !== null) {
                console.log('Tiene su carnet, no mostrar modal del carnet - ', CI)
            } else {
                console.log('No tiene su carnet, mostrar modal del carnet - ', CI)
                setCiModal(true)
            }
        } else {
            console.log('No tiene su número, mostrar modal del número - ', Number)
            setNumberModal(true)
        }
    }

    const SendPhoneNumber = async () => {
        const CI = await User.info.usuarioBean?.carnet_identidad
        const codeUser = await User.info.usuarioBean?.codigo_usuario
        Keyboard.dismiss()

        if (numberPhone) {
            try {
                console.log(codeUser)
                const data = {
                    telefono: numberPhone,
                    codigoUsuario: codeUser,
                }
                console.log(data)

                const res = await fetchWithToken('entereza/add_telefono', 'POST', data)
                const {
                    codeError,
                    msgError
                } = await res.json()
                console.log('Console AddTelefono: ', codeError, msgError)

                if (codeError === codeErrors.cod200) {
                    setNumberModal(false)
                    dispatch(__authGetInfo())
                    if (CI !== null) {
                        console.log('Tiene su carnet, no mostrar modal del carnet - ', CI)
                    } else {
                        console.log('No tiene su carnet, mostrar modal del carnet - ', CI)
                        setCiModal(true)
                    }
                } else {
                    setShowAlert(true)
                    setAlertText({
                        title: 'Error al guardar su celular.',
                        message: 'Por favor, revise sus datos e intente nuevamente.',
                        type: 'error',
                        back: false
                    })
                }
            } catch (error) {
                console.log('Error Entereza Number: ', error)
                setShowAlert(true)
                setAlertText({
                    title: 'Error al guardar su celular.',
                    message: 'Por favor, intente nuevamente en un momento.',
                    type: 'error',
                })
            }
        } else {
            setShowAlert(true)
            setAlertText({
                title: 'Debes ingresar un número válido.',
                message: "Porfavor, revisa tu número e intenta de nuevo.",
                type: 'warning',
            })
        }
    }

    // CI Functions
    const [buttonClick, setbuttonClick] = React.useState(false)
    const [buttonText, setbuttonText] = React.useState('Comenzar')

    // const [isStarted, setIsStarted] = useState(false);
    const colorValue = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        Animated.parallel([
            Animated.timing(colorValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false
            }),
        ]).start();
        setTimeout(() => {
            setbuttonText('¡Bienvenido! ✔')
        }, 800);

        setTimeout(() => {
            setCiModal(false)
        }, 3000);
    };

    const backgroundColor = colorValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.secondary, theme.success]
    });

    async function CheckCiNumber() {
        Keyboard.dismiss()
        setbuttonText('Enviando...⏳')
        if (isNaN(CI_User) || CI_User === '') {
            console.log(CI_User)
            setbuttonText('Comenzar')

            setShowAlert(true)
            setAlertText({
                title: 'Ingresa un carnet válido',
                message: "Revisa tus datos e intenta nuevamente",
                type: 'warning',
            })
        } else {
            CheckCiLength()
        }
    }

    const CheckCiLength = async () => {
        try {
            if (CI_User.length > 5) {
                SendCiUser()
            } else {
                setbuttonText('Comenzar')
                setShowAlert(true)
                setAlertText({
                    title: 'Ingresa un carnet válido',
                    message: "Revisa tus datos e intenta nuevamente",
                    type: 'error',
                    back: false
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function SendCiUser() {
        try {
            const Email = await AsyncStorage.getItem('ENT-EMAIL')

            var data = {
                carnet: CI_User,
                correo: Email,
            };
            console.log(data)

            await fetchWithToken(
                "entereza/save_carnet",
                "POST",
                data
            ).then((result) => {
                result.json().then((resp) => {
                    console.log(resp)
                    if (resp.codeError === "COD200") {
                        setbuttonClick(true)
                        startAnimation()
                        ReloadInfo()
                    } else if (resp.codeError === "COD456") {
                        setbuttonText('Comenzar')
                        setShowAlert(true)
                        setAlertText({
                            title: 'Error al enviar el carnet',
                            message: "El carnet ingresado ya existe. Verifica tus datos o intenta nuevamente.",
                            type: 'error',
                        })
                    } else if (resp.codeError === "COD500") {
                        setbuttonText('Comenzar')
                        setShowAlert(true)
                        setAlertText({
                            title: 'Error al enviar el carnet',
                            message: "El carnet ingresado no es válido. Verifica tus datos o intenta nuevamente.",
                            type: 'error',
                        })
                    } else {
                        setbuttonText('Comenzar')
                        setShowAlert(true)
                        setAlertText({
                            title: 'Error al enviar el carnet',
                            message: "Intente nuevamente en unos minutos.",
                            type: 'error',
                            back: true
                        })
                    }
                });
            });
        } catch ({ message }) {
            setbuttonText('Comenzar')
            setShowAlert(true)
            setAlertText({
                title: 'Error al enviar el carnet',
                message: "Intente nuevamente al ingresar",
                type: 'error',
                back: true
            })
        }
    }


    React.useEffect(() => {
        if (User.info !== null) {
            CheckPhone()
        } else {
            console.log('Info Nula no se puede realizar comprobación.')
        }
    }, [User])

    return (
        <>
            <Modal
                visible={NumberModal}
                animationType="fade"
                transparent={true}
            >
                {
                    showAlert
                    && (
                        <AlertStyled
                            widthModal={70}
                            heightModal={30}
                            size={alertText.size}
                            title={alertText.title}
                            message={alertText.message}
                            type={alertText.type}
                            showCancelButton={false}
                            showCloseButton={false}
                            onConfirmPressed={alertText.back ? errorSendClose : handleCloseAlert}
                        />
                    )
                }
                <ViewStyled
                    backgroundColor='#000000AA'

                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={{
                                width: widthPercentageToDP(100),
                                height: heightPercentageToDP(100),
                                justifyContent: 'flex-end',
                            }}
                        >
                            <ViewStyled
                                width={100}
                                height={48}
                                backgroundColor={theme.primary}

                                style={{
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    borderTopRightRadius: 45,
                                    borderTopLeftRadius: 45,
                                }}
                            >
                                <ViewStyled
                                    width={100}
                                    height={40}
                                    backgroundColor={theme.transparent}

                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TextStyled
                                        fontSize={22}
                                        textAlign='center'
                                        fontFamily='BRFirmaBold'
                                        fontWeight='bold'
                                        color={theme.secondary}
                                        style={{
                                            marginBottom: 10,
                                        }}
                                    >
                                        Información de Contacto
                                    </TextStyled>

                                    <TextStyled
                                        textAlign='center'
                                        color={theme.tertiary}
                                        fontSize={14}
                                        style={{
                                            width: '95%',
                                            // fontFamily: 'BRFirma-Regular',
                                        }}
                                    >
                                        Para darte una experiencia personalizada y participes de promociones, eventos, sorteos y más. {`\n\n`}
                                        Por favor ingresa tu número de celular.
                                    </TextStyled>

                                    <ViewStyled
                                        marginVertical={1}
                                        width={95}
                                        height={8}
                                        backgroundColor={theme.transparent}
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <ImageStyled
                                            width={10}
                                            height={8}
                                            style={{
                                                // backgroundColor: '#f3f5f7cc',
                                                resizeMode: 'contain',
                                                borderBottomLeftRadius: wp(2),
                                                borderTopLeftRadius: wp(2),
                                            }}
                                            source={require('../../assets/profile/banderaBolivia.png')}
                                        />
                                        <TextInput
                                            style={{
                                                paddingVertical: hp(1),
                                                paddingRight: hp(2),
                                                paddingLeft: hp(1),
                                                borderBottomRightRadius: wp(2),
                                                borderTopRightRadius: wp(2),
                                                height: hp(8),
                                            }}

                                            editable={false}
                                            value="+591"
                                        />
                                        <TextInput
                                            placeholder={"Ingresa tu número"}
                                            name={"NumberPhone"}
                                            maxLength={8}
                                            width={200}
                                            height={heightPercentageToDP(6)}

                                            value={numberPhone}
                                            onChangeText={Phone => setNumberPhone(Phone)}
                                            keyboardType={'phone-pad'}

                                            style={{
                                                padding: 10,
                                                borderWidth: 1,
                                                borderColor: '#888cf3',
                                                borderRadius: 20,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                color: theme.secondary,
                                                fontSize: 16
                                            }}
                                        />
                                    </ViewStyled>

                                    <ViewStyled
                                        width={100}
                                        backgroundColor={theme.transparent}
                                        height={2}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <TextStyled
                                            style={{
                                                marginRight: 15
                                            }}
                                        >
                                            <FontAwesome5 name="check-circle" solid size={13} color="#888cf3" />
                                        </TextStyled>
                                        <TextStyled>
                                            <FontAwesome5 name="circle" size={13} color="#888cf3" />
                                        </TextStyled>
                                    </ViewStyled>

                                    <ViewStyled
                                        width={100}
                                        backgroundColor={theme.transparent}
                                        height={7}
                                        marginTop={1}
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <ButtonNext
                                            width={45}
                                            text='Continuar'
                                            onPress={SendPhoneNumber}
                                        />
                                    </ViewStyled>
                                </ViewStyled>
                            </ViewStyled>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </ViewStyled>
            </Modal>

            <Modal
                visible={CiModal}
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
                            message={alertText.message}
                            type={alertText.type}
                            showCancelButton={false}
                            showCloseButton={false}
                            onConfirmPressed={alertText.back ? errorSendClose : handleCloseAlert}
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
                                height={45}
                                backgroundColor='#ffffff'

                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderTopRightRadius: 60,
                                    borderTopLeftRadius: 60,
                                }}
                            >
                                <TextStyled
                                    fontSize={25}
                                    textAlign='center'
                                    fontFamily='BRFirmaBold'
                                    fontWeight='bold'
                                    color={theme.secondary}
                                    style={{
                                        marginBottom: 18,
                                    }}
                                >
                                    ¡Espera por favor!
                                </TextStyled>

                                <TextStyled
                                    textAlign='center'
                                    color={theme.quaternary}
                                    fontSize={16}
                                    style={{
                                        width: '80%',
                                        marginBottom: 15,
                                        // fontFamily: 'BRFirma-Regular',
                                    }}
                                >
                                    Tu número de carnet es tu código único para comprar en nuestros negocios afiliados.
                                </TextStyled>

                                <TextInput
                                    placeholder={"Ingresa tu CI"}
                                    name={"CI"}
                                    labelFontSize={9}
                                    maxLength={11}
                                    width={230}
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
                                    width={100}
                                    height={2}
                                    marginVertical={1.3}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginRight: 15
                                        }}
                                    >
                                        <FontAwesome5 name="check-circle" solid size={13} color="#888cf3" />
                                    </Text>
                                    <Text>
                                        <FontAwesome5 name="check-circle" solid size={13} color="#888cf3" />
                                    </Text>
                                </ViewStyled>

                                <ViewStyled
                                    backgroundColor={theme.transparent}
                                    width={100}
                                    height={7}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TouchableOpacity onPress={CheckCiNumber} disabled={buttonClick}>
                                        <ViewStyled
                                            width={40}
                                            height={6}
                                            backgroundColor={theme.transparent}
                                            borderRadius={2}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Animated.View
                                                style={{
                                                    backgroundColor: backgroundColor, width: '100%', height: '100%', borderRadius: 15,
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
                                                    {buttonText}
                                                </TextStyled>
                                            </Animated.View>
                                        </ViewStyled>
                                    </TouchableOpacity >
                                </ViewStyled>

                                {/* <ButtonNext
                                    color={theme.secondary}
                                    text={buttonText}
                                    onPress={buttonClick ? CheckCiNumber : null}
                                /> */}
                                {/* ¡Bienvenido! ✔ */}
                            </ViewStyled>

                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </ViewStyled>
            </Modal>


            {/* <Modal
                visible={open3}
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
                        height={38}
                        backgroundColor='#ffffff'

                        style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            borderRadius: 40,
                            paddingTop: 20
                        }}
                    >
                        <Animated.Image
                            source={require('../../../assets/img/check-circle.png')}
                            style={{
                                // backgroundColor: theme.danger,
                                width: 150,
                                height: 150,
                                resizeMode: 'contain',
                                opacity: checkAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1]
                                }),
                                transform: [
                                    {
                                        scale: checkAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0.5, 1]
                                        })
                                    },
                                    {
                                        translateY: checkAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [50, 0]
                                        })
                                    }
                                ]
                            }}
                        />
                        <TextStyled
                            color={theme.success}
                            fontSize={22}
                            fontWeight={'bold'}
                            textAlign={'center'}
                            style={{
                                width: '90%',
                                marginBottom: 10,
                                // fontFamily: 'BRFirma-Regular',
                            }}
                        >
                            ¡Bienvenid@ {nombresUser}! 
                        </TextStyled>
                        <TextStyled
                            color={theme.quaternary}
                            fontSize={17}
                            textAlign={'center'}
                            style={{
                                width: '85%',
                                marginBottom: 10,
                                // fontFamily: 'BRFirma-Regular',
                            }}
                        >
                            Ahora tus gastos suman y se vuelven más Enterezantes. 
                        </TextStyled>
                        {/* <ViewStyled
                            backgroundColor={theme.transparent}
                            width={20}
                            height={5}
                            marginBottom={1}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity onPress={startAnimation}
                                style={[
                                    customStyles.shadowStyle,
                                    {
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: theme.success,
                                        borderRadius: 20,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingBottom: 2
                                    }
                                ]}
                            >
                                <ImageStyled
                                    width={4}
                                    height={2}
                                    style={{
                                        marginRight: 8,
                                        resizeMode: 'contain',
                                    }}
                                    source={require('../../../assets/img/LogoEnterezaWhite.png')}
                                />
                                <TextStyled
                                    fontSize={12.5}
                                    color={theme.primary}
                                    style={{
                                        // fontFamily: 'Raleway',
                                    }}>
                                    start
                                </TextStyled>
                            </TouchableOpacity >
                        </ViewStyled>
                        <ViewStyled
                            backgroundColor={theme.transparent}
                            width={20}
                            height={5}
                            marginBottom={1}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity onPress={reset}
                                style={[
                                    customStyles.shadowStyle,
                                    {
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: theme.secondary,
                                        borderRadius: 20,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingBottom: 2
                                    }
                                ]}
                            >
                                <ImageStyled
                                    width={4}
                                    height={2}
                                    style={{
                                        marginRight: 8,
                                        resizeMode: 'contain',
                                    }}
                                    source={require('../../../assets/img/LogoEnterezaWhite.png')}
                                />
                                <TextStyled
                                    fontSize={12.5}
                                    color={theme.primary}
                                    style={{
                                        // fontFamily: 'Raleway',
                                    }}>
                                    reset
                                </TextStyled>
                            </TouchableOpacity >
                        </ViewStyled> 
                    </ViewStyled>
                </ViewStyled>
            </Modal> */}
        </>
    );
}