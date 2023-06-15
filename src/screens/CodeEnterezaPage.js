import React, { useState, useRef, useEffect } from 'react'
import { ScrollView, RefreshControl } from 'react-native'

import ViewStyled from '../components/ui/ViewStyled'
import { theme } from '../utils/theme'
import { fetchWithToken } from '../utils/fetchWithToken'
import AlertStyled from '../components/ui/AlertStyled'
import TextStyled from '../components/ui/TextStyled'

// REACT  
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Center, NativeBaseProvider } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { __authGetInfo } from '../redux/actions/authActions';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function CodeEnterezaPage() {

    //variable util para re-Animar, pausar y play de barra progreso circular
    const progressRef = useRef(null)

    const navigation = useNavigation()

    const [refreshing, setRefreshing] = React.useState(false);

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

    const [CodeEntereza, setCodeEntereza] = useState('');

    const getCodigoEntereza = async () => {
        try {
            // setCounter(120)
            //re-Animar barra de progreso circular
            const codigoEntidad = await AsyncStorage.getItem('ENT-CODUSR')
            console.log('Obteniendo Codigo... ')
            const res = await fetchWithToken(`entereza/code_transactions?codigo_usuario=${codigoEntidad}`, 'GET')

            const { entereza, codigo } = await res.json()
            console.log(entereza, ' - ', codigo)

            if (entereza.codeError === 'COD200') {
                progressRef.current.reAnimate()
                setCodeEntereza(codigo)
            } else {
                setShowAlert(true)
                setAlertText({
                    title: 'Error al obtener nuevo código',
                    message: 'Porfavor, intente nuevamente en un momento.',
                    type: 'error',
                    back: true
                })
            }
        } catch (error) {
            console.log('Error Code Entereza: ', error)
            setShowAlert(true)
            setAlertText({
                title: 'Error al obtener Código',
                message: 'Porfavor, intente nuevamente en un par de minutos.',
                type: 'error',
                back: true
            })
        }
        setRefreshing(false) 
    }

    useEffect(() => {
        getCodigoEntereza()
    }, [])

    const redirectWallet = () => {
        navigation.goBack()
    }

    const ButtonClose = () => {
        return (
            <NativeBaseProvider>
                <Center w="100%" backgroundColor={theme.transparent} h="20">
                    <Button size="sm" rounded={'lg'} variant="outline" borderColor={theme.secondary} onPress={redirectWallet}>
                        <TextStyled
                            color={theme.secondary}
                            fontSize={14}
                        >
                            ¡Sigamos Ahorrando!
                        </TextStyled>
                    </Button>
                </Center>
            </NativeBaseProvider>
        )
    }

    const onRefresh = () => {
        setRefreshing(true)
        getCodigoEntereza()
        console.log('Reloading Page Wallet Screen... ')
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
            scrollToOverflowEnabled={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
                    justifyContent: 'flex-start',
                }}
            >
                <ViewStyled
                    width={90}
                    height={35}
                    backgroundColor={theme.transparent}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CircularProgress
                        startInPausedState={false}
                        initialValue={120}
                        value={0}
                        maxValue={120}
                        radius={100}
                        inActiveStrokeOpacity={0.1}
                        activeStrokeWidth={20}
                        inActiveStrokeWidth={20}
                        progressValueStyle={{ display: 'none' }}
                        activeStrokeColor={'#c6fbfe'}
                        activeStrokeSecondaryColor={'#888cf3'}
                        duration={120000}
                        title={CodeEntereza ? CodeEntereza : '....'}
                        titleColor={theme.secondary}
                        titleFontSize={40}
                        onAnimationComplete={() => { getCodigoEntereza() }}
                        ref={progressRef}
                    />
                    <TextStyled
                        textAlign='center'
                        fontSize={18}
                        fontWeight='700'
                        numberOfLines={1}
                        color={theme.tertiary}
                        style={{
                            width: "90%",
                            marginTop: 15,
                        }}
                    >
                        {
                            'Duración del código: '
                        }
                        <TextStyled
                            textAlign='center'
                            fontSize={18}
                            fontWeight='700'
                            numberOfLines={1}
                            color={theme.secondary}
                            style={{
                                width: "90%",
                            }}
                        >
                            {
                                '2 min.'
                            }
                        </TextStyled>
                    </TextStyled>
                </ViewStyled>
                <ViewStyled
                    width={90}
                    height={40}
                    marginTop={0.5}
                    backgroundColor={theme.transparent}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <TextStyled
                        fontSize={20}
                        fontWeight='700'
                        color={theme.quaternary}
                        textAlign='center'
                        style={{
                            width: "90%"
                        }}
                    >
                        ¿Qué es el código de pago Entereza?
                    </TextStyled>
                    <TextStyled
                        fontSize={16}
                        textAlign="center"
                        color={theme.tertiary}
                        style={{
                            marginTop: 10,
                            width: "95%"
                        }}
                    >
                        Este es tu código secreto con el cuál podrás realizar pagos utilizando los ahorros que tienes en tu cuenta Entereza,
                        solo debes dictárselo al cajero de la empresa afiliada para confirmar la transferencia.
                        {`\n\n`}
                        <TextStyled
                            textAlign='center'
                            fontSize={17}
                            color={theme.secondary}
                            style={{
                                marginTop: 10,
                                width: "95%"
                            }}
                        >
                            OJO
                        </TextStyled>
                        {`\n\n`}
                        • Solo podrás realizar pagos con los ahorros de tu cuenta si tu saldo es igual o mayor al total de la compra.
                    </TextStyled>
                </ViewStyled>
            </ViewStyled>
        </ScrollView >
    )
}