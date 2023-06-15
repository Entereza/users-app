import React from 'react'
import { Modal } from 'react-native'


import { theme } from '../../utils/theme';
import TextStyled from '../ui/TextStyled'
import ViewStyled from '../ui/ViewStyled';
import { Center, NativeBaseProvider, Button } from "native-base";
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import ImageStyled from '../ui/ImageStyled';
import { useSelector } from 'react-redux';
import LoaderScreen from '../../screens/LoaderScreen';
import { __authGetInfo } from '../../redux/actions/authActions';

export default function WalletCongrats({ show, onShow, messageNotification = '' }) {
    const { info } = useSelector(state => state.auth)

    console.log('Message Notification WalletCongrats: ', messageNotification, '- ', show)

    const message = {
        "ahorro": "0.085",
        "codigoEmpresa": "ENT-f0436a44",
        "comision": "0.015000001",
        "fecha": "Apr 21, 2023, 7:19:39 PM",
        "metodoPago": "Efectivo",
        "nombreEmpresa": "Empresa Demo",
        "ticketNo": "566b38cb-3d50-4607-a69d-aa99793bfefe",
        "total": "1"
    }

    const ButtonClose = () => {
        return (
            <NativeBaseProvider>
                <Center w="100%" backgroundColor={theme.transparent}>
                    <Button w={widthPercentageToDP(80)} h={heightPercentageToDP(8)} rounded={'xl'} variant="solid" backgroundColor={theme.green2} borderColor={theme.green2} onPress={onShow}>
                        <TextStyled
                            fontFamily='ArtegraBold'
                            fontSize={20}
                            color={theme.dark}
                            textAlign='center'
                            style={{
                                width: '100%'
                            }}
                        >
                            Recoger Cashback
                        </TextStyled>
                    </Button>
                </Center>
            </NativeBaseProvider>
        )
    }

    return (
        <>
            <Modal
                visible={messageNotification !== '' ? true : false}
                animationType="fade"
                transparent={true}
            >
                {
                    info !== null
                        ? <ViewStyled
                            backgroundColor={theme.dark}
                            width={100}
                            height={100}
                            style={{
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}
                        >
                            <ViewStyled
                                backgroundColor={theme.transparent}
                                marginTop={6}
                                width={50}
                                height={30}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <ImageStyled
                                    source={require('../../../assets/img/WalletCongrats.png')}
                                    style={{
                                        resizeMode: 'contain',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                            </ViewStyled>
                            <ViewStyled
                                width={95}
                                height={50}
                                marginTop={0.5}
                                backgroundColor={theme.transparent}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <TextStyled
                                    fontSize={25}
                                    fontFamily='Artegra'
                                    color={theme.primary}
                                    textAlign='center'
                                    style={{
                                        width: '95%'
                                    }}
                                >
                                    {`¡Felicidades `}
                                    <TextStyled
                                        fontFamily='ArtegraBold'
                                        fontSize={25}
                                        color={theme.green2}
                                        textAlign='center'
                                        style={{
                                            width: '95%'
                                        }}
                                    >
                                        {
                                            `${info?.usuarioBean
                                                ? info.usuarioBean?.nombres
                                                : ''
                                            }`
                                        }
                                    </TextStyled>
                                    {`!`}
                                </TextStyled>
                                <ViewStyled
                                    borderRadius={2}
                                    marginVertical={5}
                                    backgroundColor={theme.transparent}
                                    width={80}
                                    height={25}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderColor: theme.green2
                                    }}
                                >
                                    <TextStyled
                                        fontFamily='ArtegraBold'
                                        fontSize={22}
                                        textAlign="center"
                                        color={theme.primary}
                                        style={{
                                            width: "90%"
                                        }}
                                    >
                                        {`Ganaste \n\n`}
                                        <TextStyled
                                            fontFamily='ArtegraBold'
                                            fontSize={35}
                                            color={theme.green2}
                                            textAlign='center'
                                            style={{
                                                width: '90%'
                                            }}
                                        >
                                            {
                                                messageNotification
                                                    ? `+ Bs ` + Number(messageNotification.ahorro).toFixed(1)
                                                    : '...'
                                            }
                                        </TextStyled>
                                        {`\n\n en `}
                                        <TextStyled
                                            fontFamily='ArtegraBold'
                                            fontSize={22}
                                            color={theme.green2}
                                            textAlign='center'
                                            style={{
                                                width: '90%'
                                            }}
                                        >
                                            {
                                                messageNotification
                                                    ? messageNotification.nombreEmpresa
                                                    : '...'
                                            }
                                        </TextStyled>
                                    </TextStyled>
                                </ViewStyled>

                                <ButtonClose />
                            </ViewStyled>
                        </ViewStyled>
                        : <LoaderScreen />

                }

            </Modal>
        </>
    )
}