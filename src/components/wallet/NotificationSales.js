// REACT    
import React, { useState } from 'react'
import { Animated, Modal, Pressable, ScrollView, StyleSheet } from 'react-native'

// LIBRARIES 
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
//import PDFReader from 'rn-pdf-reader-js'

// CUSTOM 
import { customStyles } from '../../utils/customStyles'
import { theme } from '../../utils/theme'
import ImageStyled from '../ui/ImageStyled'
import TextStyled from '../ui/TextStyled'
import ViewStyled from '../ui/ViewStyled'
import adjustFontSize from '../../utils/adjustText'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { useSelector } from 'react-redux'
import ButtonNext from '../Btn/ButtonNext'
import { TouchableOpacity } from 'react-native'
import AlertStyled from '../ui/AlertStyled'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchWithToken } from '../../utils/fetchWithToken'

export default function NotificationSales({ promocionInicial, horas, numeroUsuarios, refresh }) {
    const { info } = useSelector(state => state.auth)

    const [showAlert, setShowAlert] = React.useState(false)
    const [alertText, setAlertText] = React.useState({
        title: '',
        message: '',
        type: 'success',
    })
    const handleCloseAlert = () => setShowAlert(false)

    console.log('NotificationSales: ', promocionInicial, horas, numeroUsuarios)

    const [caducado, setCaducado] = React.useState(false)

    const [disabled, setDisabled] = React.useState(false)
    const [nameUser, setNameUser] = React.useState('')
    const [horasRestantes, setHorasRestantes] = React.useState(null)

    const [activate, setActivate] = React.useState(false)

    const setNames = () => {
        setNameUser(info.usuarioBean?.nombres)
        setHorasRestantes(horas)
    }

    React.useEffect(() => {
        if (info !== null) {
            setNames()
        }
    }, [info])


    const OpenModal = () => {
        setActivate(true)
    }

    const CloseModal = () => {
        setActivate(false)
    }

    const ActivateDelivery = async () => {
        setDisabled(true);
        try {
            const codUser = await AsyncStorage.getItem('ENT-CODUSR');

            const res = await fetchWithToken(`entereza/add_promocion_inicial?codigoUsuario=${codUser}`, 'GET');

            const {
                codeError,
                msgError,
            } = await res.json();

            if (codeError === 'COD200') {
                console.log('ActivateDelivery', msgError)
                refresh()
            } else {
                setShowAlert(true)
                setAlertText({
                    title: 'Error al Activar Delivery Gratis',
                    message: `${msgError}`,
                    type: 'error',
                })
            }
        } catch (error) {
            console.log('ActivateDelivery: ', error);
        }
        setDisabled(false);
    };

    const getHorasRestantes = async () => {
        if (horas <= 0) {
            setCaducado(true);
        } else {
            setHorasRestantes(horas);
        }
    };

    React.useEffect(() => {
        if (horas !== null) {
            getHorasRestantes()
        }
    }, [horas])


    return (
        <>
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

            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: theme.transparent,
                    height: heightPercentageToDP(53)
                }}
                showsVerticalScrollIndicator={false}
                scrollToOverflowEnabled={false}
            >
                <ViewStyled
                    marginBottom={1}

                    width={90}
                    height={10}
                    borderRadius={2}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'relative',
                        zIndex: 1,

                    }}
                    paddingHorizontal={1}
                    marginLeftAuto
                    marginRightAuto
                >
                    <ViewStyled
                        width={15}
                        height={15 / 2}
                        marginLeft={2}
                        backgroundColor={theme.transparent}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ImageStyled
                            borderRadius={2}
                            source={require('../../assets/wallet/hand.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'stretch',
                            }}
                        />
                        {/* <MaterialCommunityIcons
                            name="hand-wave-outline"
                            size={adjustFontSize(26)}
                            color={theme.secondary}
                        /> */}
                    </ViewStyled>

                    <ViewStyled
                        height={9}
                        width={70}
                        marginLeft={2}
                        style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}
                        backgroundColor={theme.transparent}
                    >
                        <ViewStyled
                            height={9}
                            width={65}
                            style={{
                                justifyContent: 'center',
                            }}
                            backgroundColor={theme.transparent}
                            marginRightAuto
                        >
                            <TextStyled
                                fontFamily='ArtegraBold'
                                fontSize={14}
                                color={theme.quaternary}
                                style={{
                                    marginBottom: 3
                                }}
                            >
                                {
                                    `¡En hora buena ${nameUser}!`
                                }
                            </TextStyled>
                            <TextStyled
                                fontSize={11}
                                color={theme.tertiary}
                                style={{
                                    width: '100%'
                                }}
                            >
                                {`¡Ya eres parte de la comunidad de los `}
                                <TextStyled
                                    fontFamily='BRFirmaBold'
                                    fontSize={10}
                                    color={theme.secondary}
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    {`${numeroUsuarios} `}
                                </TextStyled>
                                {'compradores inteligentes!'}
                            </TextStyled>
                        </ViewStyled>
                    </ViewStyled>
                </ViewStyled>

                {
                    !caducado
                        ? <ViewStyled
                            marginBottom={1}

                            width={90}
                            height={10}
                            borderRadius={2}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                zIndex: 1,

                            }}
                            backgroundColor={theme.primary}
                            paddingLeft={1}
                            marginLeftAuto
                            marginRightAuto
                        >
                            <ViewStyled
                                width={15}
                                height={15 / 2}
                                marginLeft={2}
                                backgroundColor={theme.transparent}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <ImageStyled
                                    borderRadius={2}
                                    source={promocionInicial ? require('../../assets/wallet/delivery.png') : require('../../assets/wallet/motoActive.png')}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        resizeMode: 'cover',
                                    }}
                                />
                            </ViewStyled>

                            <ViewStyled
                                height={10}
                                width={70}
                                marginLeft={2}
                                style={{
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}
                                backgroundColor={theme.transparent}
                            >
                                <ViewStyled
                                    height={10}
                                    width={promocionInicial ? 54 : 70}
                                    style={{
                                        justifyContent: 'center',
                                    }}
                                    backgroundColor={theme.transparent}
                                    marginRightAuto
                                >
                                    <TextStyled
                                        fontFamily='ArtegraBold'
                                        fontSize={13}
                                        color={theme.quaternary}
                                        style={{
                                            marginBottom: 3
                                        }}
                                    >
                                        {
                                            promocionInicial
                                                ? `¡Delivery Gratis!`
                                                : `¡Delivery Activado!`
                                        }
                                    </TextStyled>

                                    {
                                        promocionInicial
                                            ?
                                            <TextStyled
                                                fontSize={10}
                                                color={theme.tertiary}
                                                style={{
                                                    width: '100%'
                                                }}
                                            >
                                                {`Tu Primer Delivery lo paga Entereza, `}
                                                <TextStyled
                                                    fontFamily='BRFirmaBold'
                                                    fontSize={10}
                                                    color={theme.secondary}
                                                    style={{
                                                        width: '100%'
                                                    }}
                                                >
                                                    {`48 horas `}
                                                </TextStyled>
                                                {'tienes  para utilizarlo'}
                                            </TextStyled>
                                            :
                                            <TextStyled
                                                fontSize={10}
                                                color={theme.tertiary}
                                                style={{
                                                    width: '95%'
                                                }}
                                            >
                                                {`Tu Delivery Gratis ha sido activado, tienes `}
                                                <TextStyled
                                                    fontFamily='BRFirmaBold'
                                                    fontSize={10}
                                                    color={theme.secondary}
                                                    style={{
                                                        width: '100%'
                                                    }}
                                                >
                                                    {`${horasRestantes} horas`}
                                                </TextStyled>
                                                {' para utilizarlo.'}
                                            </TextStyled>
                                    }
                                </ViewStyled>
                                {
                                    promocionInicial
                                        ? <ViewStyled
                                            height={10}
                                            width={15}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            backgroundColor={theme.transparent}
                                        >
                                            <ViewStyled
                                                backgroundColor={theme.secondary}
                                                height={10}
                                                width={15}
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderTopRightRadius: heightPercentageToDP(2),
                                                    borderBottomRightRadius: heightPercentageToDP(2),
                                                }}
                                            >
                                                <TouchableOpacity
                                                    onPress={OpenModal}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                    disabled={disabled}
                                                >
                                                    <ViewStyled
                                                        backgroundColor={theme.transparent}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <TextStyled
                                                            fontSize={10}
                                                            color={theme.primary}
                                                            fontFamily='BRFirmaBold'
                                                        >
                                                            ACTIVAR
                                                        </TextStyled>
                                                    </ViewStyled>
                                                </TouchableOpacity >
                                            </ViewStyled>
                                        </ViewStyled>
                                        : <></>
                                }
                            </ViewStyled>
                        </ViewStyled>
                        : <></>
                }
            </ScrollView>

            <Modal
                visible={activate}
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
                                name="warning"
                                size={adjustFontSize(30)}
                                color={theme.warning}
                            />
                            <TextStyled
                                fontSize={17}
                                textAlign='center'
                                color={theme.quaternary}
                                style={{
                                    marginTop: 5
                                }}
                            >
                                ¿Estás seguro de que quieres activar tu Delivery Gratis?
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
                            <TouchableOpacity onPress={CloseModal} style={{ marginRight: 10 }}>
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
                            <TouchableOpacity onPress={ActivateDelivery}>
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
                                        Activar
                                    </TextStyled>
                                </ViewStyled>
                            </TouchableOpacity>
                        </ViewStyled>
                    </ViewStyled>
                </ViewStyled>
            </Modal>
        </>
    )
}