import React, { useState, useEffect } from 'react'
import { theme_colors } from '../../../utils/theme/theme_colors'
import ViewStyled from '../../../utils/ui/ViewStyled'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import adjustFontSize from '../../../utils/ui/adjustText'
import { theme_textStyles } from '../../../utils/theme/theme_textStyles'
import { ActivityIndicator, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import * as Tracking from 'expo-tracking-transparency'
import ButtonWithIcon from '../../../components/Buttons/ButtonWithIcon'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore'
import AddInfoAddressModal from '../../../components/Modals/AddInfoAddressModal'
import Toast from 'react-native-root-toast'

export default function AddAddressScreen() {
    const navigation = useNavigation()
    const { top } = useSafeAreaInsets()
    const { changeColorStatusBar } = useTabBarStore()

    const goBack = () => {
        changeColorStatusBar(theme_colors.white);
        navigation.goBack()
    }

    const mapRef = React.useRef();
    const [isSearchingDataLocation, setIsSearchingDataLocation] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [userLocation, setUserLocation] = useState({
        latitude: 0,
        longitude: 0,
        currentPosition: false
    })
    const [initialRegion, setInitialRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
    })

    let errorLocation = {
        latitude: -17.393805874555195,
        longitude: -66.15696355531529,
    }

    let deltaLocation = {
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
    }

    const goToInitialLocation = () => {
        setIsDragging(true)
        mapRef.current.animateToRegion({
            ...initialRegion,
            animated: true,
        },)
    }

    const handleErrorLocation = () => {
        setUserLocation({
            ...errorLocation,
            currentPosition: false
        })
        setInitialRegion({
            ...errorLocation,
            ...deltaLocation
        })
    }

    const getLocationUser = async () => {
        try {
            setIsSearchingDataLocation(true)
            // Solicitar permisos de tracking
            const trackingStatus = await Tracking.requestTrackingPermissionsAsync();
            if (trackingStatus.status !== 'granted') {
                console.log('El usuario no dio acceso al tracking.');
                throw new Error('El usuario no dio acceso al tracking.');
            }

            // Solicitar permisos de ubicación
            const { status } = await Location.requestForegroundPermissionsAsync();

            console.log('Status: ', status)

            if (status !== 'granted') {
                console.log('El usuario no dio acceso a su ubicación.')
                throw new Error('El usuario no dio acceso a su ubicación.');
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced
            });

            const { coords } = location;

            let dataLocation = {
                latitude: parseFloat(coords.latitude),
                longitude: parseFloat(coords.longitude),
            };

            setInitialRegion({
                ...dataLocation,
                ...deltaLocation
            })

            setUserLocation({
                ...dataLocation,
                currentPosition: true
            })

            mapRef.current.animateToRegion({
                ...dataLocation,
                ...deltaLocation,
                animated: true,
            },)
        } catch (error) {
            console.log('Error getting location: ', error)
            handleErrorLocation()
        } finally {
            setIsSearchingDataLocation(false)
        }
    }

    const onRegionChangeComplete = async (region) => {
        setIsDragging(false)
        setUserLocation({
            latitude: region.latitude,
            longitude: region.longitude,
            currentPosition: true
        })
    };

    const onPanDrag = () => {
        setIsDragging(true)
    }

    useEffect(() => {
        getLocationUser()
    }, [])

    //
    const [openModal, setOpenModal] = useState(false)

    const handleCloseModal = () => {
        setOpenModal(false)
        changeColorStatusBar(theme_colors.transparent)
    }

    const handleMessage = (message, position = Toast.positions.CENTER, textColor = theme_colors.white, backgroundColor = theme_colors.primary, duration = Toast.durations.SHORT) => {
        Toast.show(message, {
            duration: duration,
            position: position,
            backgroundColor: backgroundColor,
            textColor: textColor,
            shadow: true,
            shadowColor: theme_colors.black,
            opacity: 1,
            containerStyle: {
                width: "auto",
                height: "auto",
                paddingVertical: 15,
                paddingHorizontal: 18,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
            },
            textStyle: {
                fontFamily: "SFPro-SemiBold",
                fontSize: adjustFontSize(theme_textStyles.smaller + .5),
            },
        });
    };


    return (
        <>
            <ViewStyled
                backgroundColor={theme_colors.transparent}
                style={{
                    height: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    position: 'relative'
                }}
            >
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    mapType='standard'
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative'
                    }}
                    loadingEnabled={true}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    initialRegion={initialRegion}
                    onPanDrag={onPanDrag}
                    onRegionChangeComplete={onRegionChangeComplete}
                />

                <ViewStyled
                    width={50}
                    height={13.5}
                    backgroundColor={theme_colors.transparent}
                    style={{
                        top: '37.8%',
                        left: '25.1%',
                        position: 'absolute',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    pointerEvents="none"
                >
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{
                            width: 'auto',
                            height: 'auto',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <MaterialIcons
                            name={'location-pin'}
                            size={adjustFontSize(16)}
                            color={theme_colors.primary}
                        />
                    </ViewStyled>
                </ViewStyled>

                {!isDragging && (
                    <>
                        <Pressable
                            onPress={goBack}
                            style={{
                                top: top,
                                left: 10,
                                position: 'absolute',
                                zIndex: 2
                            }}
                        >
                            <ViewStyled
                                width={11}
                                height={5.5}
                                borderRadius={1.5}
                                backgroundColor={theme_colors.white}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: theme_colors.primary
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="arrow-left"
                                    size={adjustFontSize(theme_textStyles.xlarge)}
                                    color={theme_colors.primary}
                                />
                            </ViewStyled>
                        </Pressable>

                        <ViewStyled
                            backgroundColor={theme_colors.primary}
                            borderRadius={'50%'}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                right: 20,
                                bottom: 90,
                                maxWidth: 40,
                                maxHeight: 40,
                                elevation: 3,
                                shadowColor: theme_colors.black
                            }}
                        >
                            <Pressable
                                disabled={!userLocation.currentPosition}
                                onPress={goToInitialLocation}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    padding: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {
                                    userLocation.currentPosition
                                        ? <MaterialCommunityIcons
                                            name={'crosshairs-gps'}
                                            size={adjustFontSize(theme_textStyles.medium)}
                                            color={theme_colors.white}
                                        />
                                        : <ActivityIndicator
                                            size="small"
                                            color={theme_colors.white}
                                        />
                                }
                            </Pressable>
                        </ViewStyled>

                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            width={100}
                            height={8}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                bottom: 10,
                            }}
                        >
                            <ButtonWithIcon
                                disabled={isSearchingDataLocation || !userLocation.latitude || !userLocation.longitude}
                                textButton={'Elegir Ubicación'}
                                borderRadius={1.5}
                                backgroundColor={isSearchingDataLocation || !userLocation.latitude || !userLocation.longitude ? `${theme_colors.grey}22` : theme_colors.primary}
                                fontSize={theme_textStyles.medium}
                                width={80}
                                height={6}
                                borderWidth={0}
                                colorText={theme_colors.white}
                                onPress={() => {
                                    changeColorStatusBar(theme_colors.backgroundModal)
                                    setOpenModal(true)
                                }}
                                withIcon={false}
                                fontFamily='SFPro-Bold'
                                styleText={{
                                    marginBottom: 2
                                }}
                            />
                        </ViewStyled>
                    </>
                )}

            </ViewStyled>

            <AddInfoAddressModal
                open={openModal}
                handleCloseModal={handleCloseModal}
                goBackNavigation={goBack}
                dataLocation={userLocation}
                handleMessage={handleMessage}
            />
        </>
    )
}