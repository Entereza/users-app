import React from 'react'
import { Modal, Platform, Linking } from 'react-native'
import ViewStyled from '../ui/ViewStyled'
import TextStyled from '../ui/TextStyled'
import { theme } from '../../utils/theme'
import { fetchWithToken } from '../../utils/fetchWithToken'
import ImageStyled from '../ui/ImageStyled'
import ButtonNext from '../Btn/ButtonNext'
import * as Aplication from 'expo-application'
import { fetchWithoutToken } from '../../utils/fetchWithoutToken'

export default function ModalUpdates() {
    const BuildNro = Aplication.nativeBuildVersion

    const [modal, setModal] = React.useState(false);

    const [os, setOs] = React.useState('');

    const CheckOS = () => {
        if (Platform.OS === 'ios') {
            setOs('IOS')
        } else if (Platform.OS === 'android') {
            setOs('ANDROID')
        }
    }

    const CheckUpdates = async () => {
        const res = await fetchWithoutToken(`entereza/version_get?os=${os}`, "GET")

        const {
            version,
            entereza,
            build
        } = await res.json()

        // console.log('Build Nro: ', BuildNro)
        console.log('Buildnro: ', BuildNro, ' - BuildBack: ', build)
        if (entereza.codeError === 'COD200') {
            if (build === BuildNro) {
                console.log('App de ', os, ' está actualizada.')
            } else {
                console.log('App de ', os, ' está desactualizada, actualiza a la última version de la app.')
                setModal(true)
            }
        } else {
            console.log('Version No Encontrada: ', entereza.msgError)
        }
    }

    const UpdateApp = async () => {
        if (os === 'ANDROID') {
            Linking.openURL('https://play.google.com/store/apps/details?id=com.entereza.client')
            setModal(false)
            CheckUpdates()
        } else if (os === 'IOS') {
            Linking.openURL('https://apps.apple.com/us/app/entereza/id6443708697')
            setModal(false)
            CheckUpdates()
        }
    }

    React.useEffect(() => {
        CheckOS()
    }, [])

    React.useEffect(() => {
        if (os !== '') {
            CheckUpdates()
        }
    }, [os])


    return (
        <>
            <Modal
                visible={modal}
                animationType="fade"
                transparent={false}
            >
                <ViewStyled
                    backgroundColor={'#000000'}

                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ImageStyled
                        width={90}
                        height={45}
                        style={{
                            resizeMode: 'contain',
                            // borderColor: 'red',
                            // borderWidth: 1
                        }}
                        source={require('../../../assets/img/UpdateEntereza.png')}
                    />
                    <TextStyled
                        textAlign='center'
                        fontFamily='BRFirmaBold'
                        fontWeight='bold'
                        color={theme.secondary}
                        fontSize={20}
                        style={{
                            width: '90%',
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                    >
                        Nueva Versión Disponible
                    </TextStyled>
                    <TextStyled
                        textAlign='center'
                        color={theme.primary}
                        fontSize={16}
                        style={{
                            width: '90%',
                            marginBottom: 30,
                        }}
                    >
                        ¡Actualiza para disfrutar de nuevas características y mejoras de Entereza!
                    </TextStyled>
                    <ButtonNext
                        width={40}
                        text='Descargar'
                        onPress={UpdateApp}
                    />
                </ViewStyled>
            </Modal>
        </>
    )
}