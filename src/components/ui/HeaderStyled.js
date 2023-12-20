import React from 'react'
import { Linking, Platform, AppState, ActivityIndicator, Modal, Pressable } from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import TextStyled from './TextStyled'
import ViewStyled from './ViewStyled'
import adjustFontSize from '../../utils/adjustText';
import { theme } from '../../utils/theme';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import AlertStyled from './AlertStyled';
import * as Location from 'expo-location'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _authSetLocation, __authGetInfo, _authGetInfo } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { _uiSetPermission, _uiSetPermissionGps } from '../../redux/actions/uiActions';
import ButtonNext from '../Btn/ButtonNext';
import ImageStyled from './ImageStyled';

export default function HeaderStyled({
    title,
    back = true,
    routeName,
    reloadEmp
}) {
    console.log('NeimFirst: ', routeName)
    const dispatch = useDispatch()

    const [showButton, setShowButton] = React.useState(false)
    const [loadingModal, setLoadingModal] = React.useState(false)

    const [adjustOpen, setAdjustOpen] = React.useState(false)
    const [modalPermissions, setModalPermissions] = React.useState(false)
    const [notFirstTime, setNotFirstTime] = React.useState(false)

    const [showAlert, setShowAlert] = React.useState(false)
    const [alertText, setAlertText] = React.useState({
        size: 0,
        title: '',
        message: '',
        type: 'success',
        cancelText: '',
        confirmText: '',
        adjust: false
    })

    AppState.addEventListener('change', (nextAppState) => {
        console.log('Status App Has Change', nextAppState)
        if (nextAppState === 'active') { // Si el usuario vuelve a la app
            console.log('Permissions Open Settings App: ', adjustOpen)
            if (adjustOpen === true) {
                // Verifica los permisos inmediatamente
                AppStateRequestPermissions()
            }
        }
    });

    const AppStateRequestPermissions = async () => {
        try {
            const { status } = await Location.getBackgroundPermissionsAsync();

            if (status === 'granted') {
                UbicationConPermisos()
                console.log('Permisos de Ubicación (AppStateRequestPermissions) Permitidos: ', status)
            } else {
                console.log('Permisos de Ubicación (AppStateRequestPermissions) Denegados: ', status)
            }
        } catch (error) {
            console.error('Error obteniendo permisos: ', error);
        }
    }

    const handleCloseModal = async () => {
        const ModalFirstShow = await AsyncStorage.getItem('PERMISSIONS')

        console.log('ModalFirst: ', ModalFirstShow)
        if (ModalFirstShow !== 'NoMostrar') {
            await Promise.all([
                AsyncStorage.setItem('PERMISSIONS', 'NoMostrar')
            ])
        }
        setModalPermissions(false)
    }

    const handleCloseAlert = async () => {
        setShowAlert(false)
    }

    const handleIconUbication = async () => {
        setNotFirstTime(true)
        setModalPermissions(true)
        console.log('handleIconUbication')
        // setShowAlert(true)
        // setAlertText({
        //     title: 'Encuentra empresas cercanas',
        //     message: `Necesitamos tu ubicación para mostrarte las empresas cercanas.`,
        //     type: 'maps',
        //     cancelText: 'Cancelar',
        //     confirmText: 'Permitir'
        // })

    }

    const openAdjusts = async() => {
        setAdjustOpen(true)
        try {
            if (Platform.OS === 'ios') {
                console.log('ios')
                await Linking.openURL('app-settings:');
            } else {
                console.log('android')
                await Linking.openSettings();
            }
            handleCloseAlert()

        } catch (e) {
            console.error('Failed to open app settings.', e);
        }
    };

    const UbicationConPermisos = async () => {
        setLoadingModal(true)
        try {
            if (routeName === 'BusinessCategory' || routeName === 'BusinessCashbacks' || routeName === 'BusinessRelevant') {
                reloadEmp()
            }
            console.log("Starts Searching UbicationConPermisos Android / IOs")
            const { coords } = await Location.getCurrentPositionAsync()
            console.log('CurrentRoute: ', coords, routeName);

            let res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&addressdetails=1&format=json`, {
                method: 'GET'
            })
            setShowButton(false)

            const json = await res.json();
            console.log("Ubicacion Obtenida Android / IOs (Con Permisos): ", coords, '- ', json.address)

            dispatch(_authSetLocation({ address: json.address, coords: coords }))

            setTimeout(() => {
                if (routeName !== 'ChangeUbication') {
                    if (routeName !== 'SearchScreen') {
                        if (routeName === 'BusinessCategory' || routeName === 'BusinessCashbacks' || routeName === 'BusinessRelevant') {
                            console.log(`Reseting ${routeName}...`)
                        } else {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: routeName }]
                            })
                        }
                    } else {
                        navigation.goBack()
                    }
                } else {
                    navigation.navigate('BusinessHome')
                }
            }, 500);

            dispatch(_uiSetPermission(true))
            dispatch(_uiSetPermissionGps(true))
        } catch (err) {
            console.log("Error Location (UbicationConPermisos): ", err)
            if (err.code === 'E_LOCATION_SETTINGS_UNSATISFIED') {
                setShowAlert(true)
                setAlertText({
                    title: 'Fallo al mostrarte empresas',
                    message: 'Para mejorar tu experiencia activa tu ubicación.',
                    type: 'error',
                })
                console.log("Code Error Location Off")
                dispatch(_uiSetPermission(false))
                dispatch(_uiSetPermissionGps(false))
            }
        }
        setLoadingModal(false)
    }

    const PermissionsStatusUbication = async () => {
        const ModalFirstShow = await AsyncStorage.getItem('PERMISSIONS')

        if (ModalFirstShow !== 'NoMostrar') {
            await Promise.all([
                AsyncStorage.setItem('PERMISSIONS', 'NoMostrar')
            ])
        }

        handleCloseAlert()
        const { status } = await Location.requestForegroundPermissionsAsync();

        setModalPermissions(false)
        if (status === 'granted') {
            console.log('Permisos de Ubicación (PermissionsStatusUbication) Permitidos: ', status)
            setShowButton(false)
            UbicationConPermisos()
        } else {
            console.log('Permisos de Ubicación (PermissionsStatusUbication) Denegados: ', status)

            setShowAlert(true)
            setAlertText({
                title: 'Permisos Denegados',
                message: `Puedes conceder los permisos desde los ajustes de la aplicación.`,
                type: 'error',
                cancelText: 'Cancelar',
                confirmText: 'Ir a Ajustes',
                adjust: true
            })
        }
    }

    const getPermissionsStatus = async () => {
        const { status } = await Location.getForegroundPermissionsAsync();

        if (status === 'granted') {
            console.log('Permisos de Ubicación (getPermissionsStatus) Permitidos: ', status)
        } else {
            setShowButton(true)
            console.log('Permisos de Ubicación (getPermissionsStatus) Denegados: ', status)

            const ModalFirstShow = await AsyncStorage.getItem('PERMISSIONS')

            if (ModalFirstShow !== 'NoMostrar') {
                setModalPermissions(true)
                // setShowAlert(true)
                // setAlertText({
                //     size: 80,
                //     title: 'Encuentra las empresas cercanas',
                //     message: `Necesitamos tu ubicación para mostrarte las empresas cercanas.\n\nPuedes dar permiso luego con el icono ubicado en la parte superior.`,
                //     type: 'maps',
                //     cancelText: 'Omitir',
                //     confirmText: 'Permitir'
                // })
            }
        }
    }

    React.useEffect(() => {
        getPermissionsStatus()
    }, [])

    const navigation = useNavigation()

    return (
        <>
            <SafeAreaView edges={['top']} style={{ backgroundColor: theme.background }} >
                <ViewStyled
                    backgroundColor={theme.primary}
                    paddingHorizontal={4}
                    height={7}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {
                        back
                            ? <Ionicons
                                name="arrow-back-outline"
                                size={adjustFontSize(28)}
                                color={theme.quaternary}
                                style={{
                                    marginRight: 'auto',
                                }}
                                onPress={() => navigation.goBack()}
                            />
                            : <></>
                    }

                    <TextStyled
                        textAlign={back ? 'left' : 'center'}
                        fontSize={18}
                        style={{
                            marginRight:
                                back
                                    ? showButton
                                        ? -24
                                        : 'auto'
                                    : -16,
                            marginLeft: back ? -20 : 0,
                        }}
                        fontWeight='500'
                        color={theme.quaternary}
                    >
                        {
                            title
                        }
                    </TextStyled>

                    {
                        showButton
                            ?
                            <MaterialCommunityIcons
                                name={"google-maps"}
                                size={adjustFontSize(30)}
                                color={theme.secondary}
                                style={{
                                    marginLeft: 'auto',
                                }}
                                onPress={handleIconUbication}
                            />
                            : <></>
                    }
                </ViewStyled>
                <ViewStyled
                    height={0.5}
                    style={{
                        borderBottomColor: theme.tertiaryGradient,
                        borderBottomWidth: 1,
                    }}
                />
            </SafeAreaView>

            {
                showAlert
                && (
                    <AlertStyled
                        widthModal={83}
                        heightModal={30}
                        widthText={alertText.size}
                        title={alertText.title}
                        message={alertText.message}
                        type={alertText.type}
                        textCancelButton={alertText.cancelText}
                        textConfirmButton={alertText.confirmText}

                        showCloseButton={false}

                        showCancelButton={true}
                        onCancelPressed={() => { handleCloseAlert() }}
                        onConfirmPressed={alertText.adjust ? () => { openAdjusts() } : () => { PermissionsStatusUbication() }}
                    />
                )
            }

            <Modal
                visible={loadingModal}
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
                            Buscando las empresas más cercanas...
                        </TextStyled>
                        <ActivityIndicator size="large" color={theme.secondary} />
                    </ViewStyled>
                </ViewStyled>
            </Modal>

            <Modal
                visible={modalPermissions}
                animationType="fade"
                transparent={false}
            >
                <ViewStyled
                    width={100}
                    height={100}
                    backgroundColor={theme.primary}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextStyled
                        textAlign='center'
                        fontFamily='BRFirmaBold'
                        color={theme.secondary}
                        fontSize={25}
                        style={{
                            width: '90%',
                            marginBottom: 30
                        }}
                    >
                        {
                            notFirstTime
                                ? 'Encuentra las empresas cercanas'
                                : 'Permisos de ubicación'
                        }
                    </TextStyled>

                    <ViewStyled
                        backgroundColor={theme.transparent}
                        width={70}
                        height={35}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ImageStyled
                            style={{
                                resizeMode: 'cover',
                                width: '100%',
                                height: '100%',

                            }}
                            source={require('../../assets/business/ubication2.gif')}
                        />
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme.transparent}
                        width={95}
                        height={13}
                        marginTop={1}
                        marginBottom={notFirstTime ? 8 : 4}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {
                            notFirstTime
                                ? <TextStyled
                                    textAlign='center'
                                    color={theme.dark}
                                    fontSize={19}
                                    style={{
                                        width: '90%',
                                    }}
                                >
                                    Necesitamos acceso a tu ubicación para mostrarte las empresas cercanas.
                                </TextStyled>
                                : <TextStyled
                                    textAlign='center'
                                    color={theme.dark}
                                    fontSize={19}
                                    style={{
                                        width: '90%',
                                    }}
                                >
                                    {`Para brindarte las `}
                                    <TextStyled
                                        textAlign='center'
                                        color={theme.secondary}
                                        fontSize={19}
                                        style={{
                                            width: '90%',
                                        }}
                                    >
                                        {`mejores ofertas y precios en delivery`}
                                    </TextStyled>
                                    {`, necesitamos tu permiso para conocer tu ubicación`}
                                </TextStyled>
                        }
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme.transparent}
                        width={65}
                        height={10}
                        style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {/* //Omitir como linea y boton permitir */}


                        <ButtonNext
                            fontSize={20}
                            width={80}
                            text='Permitir'
                            onPress={() => { PermissionsStatusUbication() }}
                        />

                        <Pressable onPress={() => handleCloseModal()}>
                            <TextStyled
                                textAlign='center'
                                color={theme.tertiary}
                                fontSize={15}
                                style={{
                                    width: '100%',
                                    textDecorationLine: 'underline',
                                    marginTop: 10
                                }}
                            >
                                {
                                    notFirstTime
                                        ? `Cancelar`
                                        : `Omitir`
                                }
                            </TextStyled>
                        </Pressable>
                    </ViewStyled>
                </ViewStyled>
            </Modal >
        </>

    )
}