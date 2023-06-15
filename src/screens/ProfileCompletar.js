import React, { useState } from 'react'
import { ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'

import { useSelector } from 'react-redux'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch } from 'react-redux';
import { __authGetInfo } from '../redux/actions/authActions';

import ViewStyled from '../components/ui/ViewStyled'
import { theme } from '../utils/theme'
import ButtonTextStyled from '../components/ui/ButtonTextStyled'
import { fetchWithToken } from '../utils/fetchWithToken'
import { codeErrors } from '../utils/codeErrors'
import ImageStyled from '../components/ui/ImageStyled'
import AlertStyled from '../components/ui/AlertStyled'
import TextStyled from '../components/ui/TextStyled'
import Checkbox from 'expo-checkbox';

export default function ProfileCompletar({
    navigation
}) {
    const dispatch = useDispatch();

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
        navigation.navigate('ProfileOptions')
    }

    const { info } = useSelector(state => state.auth)


    const [dia, setDia] = useState('')
    const [mes, setMes] = useState('')
    const [año, setAño] = useState('')

    const [sexoUser, setSexoUser] = useState('')

    const sexNotNull = async () => {
        const sexo = await info.usuarioBean?.sexo
        setSexoUser(sexo)
    }

    React.useEffect(() => {
        if (info !== null) {
            sexNotNull()
        }
    }, [info])

    const [Masculino, setMasculino] = React.useState(false);
    const [Femenino, setFemenino] = React.useState(false);
    const [Undefined, setUndefined] = React.useState(false);

    const onRefresh = () => {
        console.log('Reloading Info Screen... ')
        dispatch(__authGetInfo())
    }

    const SendMasculino = () => {
        setMasculino(true);
        setFemenino(false);
        setUndefined(false);

        setSexoUser('M')
    };
    const SendFemenino = () => {
        setMasculino(false);
        setFemenino(true);
        setUndefined(false);

        setSexoUser('F')
    };
    const SendUndefined = () => {
        setMasculino(false);
        setFemenino(false);
        setUndefined(true);

        setSexoUser('N')
    };

    const handleOnSubmit = async () => {
        if (dia !== '' && mes !== '' && año !== '' && sexoUser !== '') {
            try {
                console.log('Info: handleOnSubmit: ', info.usuarioBean)
                let data = {
                    fechaNacimiento: año + '-' + mes + '-' + dia,
                    telefono: info.usuarioBean?.contacto,
                    sexo: sexoUser,
                    correo: info?.usuarioBean?.mail
                }
                console.log('Sin Feca: ', data)

                const res = await fetchWithToken('entereza/user_data_modal', 'POST', data)
                const {
                    codeError,
                    msgError
                } = await res.json()
                console.log(codeError, msgError)

                if (codeError === codeErrors.cod200) {
                    onRefresh()
                    setShowAlert(true)
                    setAlertText({
                        title: 'Perfil Completado',
                        message: 'Muchas gracias por completar su perfil Entereza.',
                        type: 'success',
                        back: true
                    })
                } else {
                    setShowAlert(true)
                    setAlertText({
                        title: 'Error al completar perfil.',
                        message: 'Por favor, revise sus datos e intente nuevamente.',
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
        } else {
            setShowAlert(true)
            setAlertText({
                title: 'Error al completar perfil.',
                message: 'Por favor, complete todos los campos.',
                type: 'warning',
                back: false
            })
        }
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
                <ViewStyled
                    width={90}
                    height={43}
                    marginBottom={3}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}
                >
                    <ImageStyled
                        source={require('../assets/profile/ProfileCompletar.png')}
                        width={75}
                        height={43.8}
                        style={{
                            resizeMode: 'contain',
                        }}
                    />
                </ViewStyled>
                <KeyboardAvoidingView
                    behavior="position"
                >
                    <ViewStyled
                        width={90}
                        height={52.5}
                        style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        <TextStyled
                            fontSize={15}
                            fontFamily='BRFirmaBold'
                            fontWeight='bold'
                            color='black'
                            style={{
                                display: info.usuarioBean?.fecha_nacimiento ? 'none' : 'flex',
                                width: '100%'
                            }}
                        >
                            Fecha de Nacimiento
                        </TextStyled>

                        <ViewStyled width={100} height={8} justifyContent="center" alignItems="center"
                            style={{
                                display: info.usuarioBean?.fecha_nacimiento ? 'none' : 'flex',
                            }}
                        >
                            <ViewStyled width={90} borderRadius={1} height={5} style={{ flexDirection: 'row', justifyContent: "center" }}>
                                <TextInput
                                    value={dia}
                                    placeholder="DD"
                                    onChangeText={setDia}
                                    keyboardType={'phone-pad'}
                                    maxLength={2}
                                    style={{
                                        backgroundColor: '#f3f5f7cc',
                                        height: hp(6),
                                        width: wp(20),
                                        textAlign: 'center'
                                    }}
                                />
                                <TextInput
                                    disabled
                                    value='/'
                                    editable={false}
                                    style={{
                                        backgroundColor: '#f3f5f7cc',
                                        height: hp(6),
                                    }}
                                />
                                <TextInput
                                    maxLength={2}
                                    placeholder="MM"
                                    value={mes}
                                    keyboardType={'phone-pad'}
                                    onChangeText={setMes}
                                    style={{
                                        backgroundColor: '#f3f5f7cc',
                                        height: hp(6),
                                        width: wp(25),
                                        textAlign: 'center',
                                        fontSize: 12
                                    }}
                                />
                                <TextInput
                                    style={{
                                        backgroundColor: '#f3f5f7cc',
                                        height: hp(6),
                                    }}
                                    editable={false}
                                    value="/"
                                />
                                <TextInput
                                    value={año}
                                    onChangeText={setAño}
                                    keyboardType={'phone-pad'}
                                    maxLength={4}
                                    style={{
                                        backgroundColor: '#f3f5f7cc',
                                        height: hp(6),
                                        width: wp(25),
                                        textAlign: 'center',
                                        fontSize: 12
                                    }}
                                    placeholder="YYYY"
                                />
                            </ViewStyled>
                        </ViewStyled>

                        <ViewStyled
                            width={90}
                            height={2}
                            backgroundColor={theme.transparent}
                            style={{
                                display: info.usuarioBean?.fecha_nacimiento ? 'none' : 'flex',
                            }}
                        />
                        <TextStyled
                            color={theme.quaternary}
                            fontSize={16}
                            style={{
                                width: '100%',
                                marginBottom: 10,
                                display: info.usuarioBean?.sexo ? 'none' : 'flex'
                                // fontFamily: 'BRFirma-Regular',
                            }}
                        >
                            Selecciona tu género
                        </TextStyled>

                        <ViewStyled
                            width={92}
                            height={18}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                borderTopColor: 'red',
                                display: info.usuarioBean?.sexo ? 'none' : 'flex'
                            }}
                        >
                            <ViewStyled
                                width={85}
                                height={5}
                                backgroundColor={theme.transparent}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextStyled
                                    fontSize={18}
                                    color={theme.quaternary}
                                >
                                    • Masculino
                                </TextStyled>
                                <Checkbox
                                    color={theme.secondary}
                                    style={{
                                        margin: 10,
                                        padding: 7,
                                        borderRadius: 100,
                                    }}
                                    value={Masculino} onValueChange={SendMasculino}
                                />
                            </ViewStyled>

                            <ViewStyled
                                width={85}
                                height={5}
                                backgroundColor={theme.transparent}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextStyled
                                    fontSize={18}
                                    color={theme.quaternary}
                                >
                                    • Femenino
                                </TextStyled>
                                <Checkbox
                                    color={theme.secondary}
                                    style={{
                                        margin: 10,
                                        padding: 7,
                                        borderRadius: 100,
                                    }}
                                    value={Femenino} onValueChange={SendFemenino}
                                />
                            </ViewStyled>

                            <ViewStyled
                                width={85}
                                height={5}
                                backgroundColor={theme.transparent}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <TextStyled
                                    fontSize={18}
                                    color={theme.quaternary}
                                >
                                    • No Definido
                                </TextStyled>
                                <Checkbox
                                    color={theme.secondary}
                                    style={{
                                        margin: 10,
                                        padding: 7,
                                        borderRadius: 100,
                                    }}
                                    value={Undefined} onValueChange={SendUndefined}
                                />
                            </ViewStyled>
                        </ViewStyled>

                        <ButtonTextStyled
                            onPress={handleOnSubmit}
                            backgroundColor={`${theme.secondary}23`}
                            style={{
                                position: 'relative',
                                width: '85%',
                                marginTop: 10
                            }}
                        >
                            Completar
                        </ButtonTextStyled>
                    </ViewStyled>
                </KeyboardAvoidingView>
            </ViewStyled>
        </ScrollView>
    )
}