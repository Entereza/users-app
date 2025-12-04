import React, { useRef, useState, useEffect } from 'react'
import useOrdersStore from '../../../utils/tools/interface/ordersStore'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import useDeliveryLocationStore from '../../../utils/tools/interface/deliveryLocationStore';
import { socketService } from '../../../utils/services/socket/socketService';
import { useNavigation } from '@react-navigation/native';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Pressable, TouchableOpacity } from 'react-native';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import { FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import adjustFontSize from '../../../utils/ui/adjustText';
import { theme_textStyles } from '../../../utils/theme/theme_textStyles';
import TextStyled from '../../../utils/ui/TextStyled';
import OrderProgressBar from '../../../components/BusinessComponents/OrderProgressBar';
import LocationTracker from '../../../components/Tracking/LocationTracker';
import useLocationStore from '../../../utils/tools/interface/locationStore';
import { toastService } from '../../../utils/tools/interface/toastService';
import DetailsOrderModal from '../../../components/Modals/DetailsOrderModal';
import CancelOrderModal from '../../../components/Modals/CancelOrderModal';

export default function OrderTrackingScreen({ route }) {
    const { getOrderById } = useOrdersStore();
    const orderId = route.params?.orderId;
    const isFromBusiness = route.params?.isFromBusiness || false;
    const activeOrder = orderId ? getOrderById(orderId) : null;
    const navigation = useNavigation();

    // Store disconnectSocket function for cleanup
    const { disconnectSocket } = useDeliveryLocationStore();

    useEffect(() => {
        if (!activeOrder) {
            toastService.showInfoToast("El pedido ya fue entregado.");
            navigation.navigate(private_name_routes.empresas.empresasHome);
            toggleTabBar(true);
            return;
        } else {
            zoomToFit();
        }

        // Cleanup function when component unmounts
        return () => {
            // Ensure socket is disconnected when leaving this screen
            disconnectSocket();
        };
    }, [activeOrder]);

    const { top } = useSafeAreaInsets()
    const { getOrderStatusText, getOrderStatusSubtle } = useOrdersStore();
    const { toggleTabBar, changeColorStatusBar } = useTabBarStore();
    const [isDragging, setIsDragging] = useState(false);
    const {
        latitude,
        longitude,
        isSocketConnected,
        connectSocket
    } = useDeliveryLocationStore();

    const [showDetailsOrder, setShowDetailsOrder] = useState(false);

    // Debug socket connection
    useEffect(() => {
        const initializeSocket = async () => {
            try {
                console.log("OrderTrackingScreen: Checking socket connection");

                // Ensure socket is connected
                if (!isSocketConnected) {
                    console.log("OrderTrackingScreen: Socket not connected, connecting now");
                    await connectSocket();

                    // Verify connection status after attempting to connect
                    const connected = socketService.isConnected();
                    console.log("OrderTrackingScreen: Socket connection status after connect attempt:", connected);
                }

                // Debug - if order exists, try to manually trigger a test event
                if (activeOrder && window.DEBUG_SOCKET) {
                    console.log("OrderTrackingScreen: Creating test event for debugging");
                    const testEvent = new CustomEvent('mockSocketEvent', {
                        detail: {
                            type: 'subscribeToOrder',
                            data: {
                                orderId: activeOrder?.order?.id,
                                latitude: -17.783330 + Math.random() * 0.01,
                                longitude: -63.182126 + Math.random() * 0.01
                            }
                        }
                    });
                    document.dispatchEvent(testEvent);
                }
            } catch (error) {
                console.error("OrderTrackingScreen: Error initializing socket:", error);
            }
        };

        initializeSocket();
    }, []);

    const userLat = activeOrder?.order?.userLat || null;
    const userLng = activeOrder?.order?.userLng || null;

    const restaurantLat = activeOrder?.latEnt || null;
    const restaurantLng = activeOrder?.lngEnt || null;

    const mapRef = useRef(null);
    const [initialRegion, setInitialRegion] = useState({
        latitude: userLat || restaurantLat || latitude || 0,
        longitude: userLng || restaurantLng || longitude || 0,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
    });

    const hasLocations = () => {
        return (
            (!!latitude && !!longitude) ||
            (!!userLat && !!userLng) ||
            (!!restaurantLat && !!restaurantLng)
        );
    };
    // On render Component
    async function zoomToFit() {
        if (mapRef.current) {
            const coordinates = [];

            // Add driver location if available
            if (latitude && longitude) {
                coordinates.push({ latitude, longitude });
            }

            // Add user location if available
            if (userLat && userLng) {
                coordinates.push({ latitude: userLat, longitude: userLng });
            }

            // Add restaurant location if available
            if (restaurantLat && restaurantLng) {
                coordinates.push({ latitude: restaurantLat, longitude: restaurantLng });
            }

            if (coordinates.length >= 2) {
                mapRef.current.fitToCoordinates(coordinates, {
                    edgePadding: { top: heightPercentageToDP(35), right: 50, bottom: 20, left: 50 },
                    animated: true,
                });
            }
        }
    }

    // Markers on map
    const deliveryLocation = {
        latitude: latitude,
        longitude: longitude,
        title: "Repartidor",
        iconName: "motorcycle"
    };

    const restaurantLocation = {
        latitude: restaurantLat,
        longitude: restaurantLng,
        title: "Restaurante",
        iconName: "store"
    };

    const userLocation = {
        latitude: userLat,
        longitude: userLng,
        title: "Tu ubicación",
        iconName: "house-chimney-user"
    };

    const goBack = () => {
        toggleTabBar(true)
        changeColorStatusBar(theme_colors.white)
        if (isFromBusiness) {
            navigation.navigate(private_name_routes.empresas.empresasHome);
        } else {
            navigation.navigate(private_name_routes.billetera.billeteraHome);
        }
    };

    // Map markers memorized
    const CustomMarker = React.memo(({ coordinate, color, title, iconName, padding = 8 }) => (
        <Marker
            stopPropagation
            tracksViewChanges={false}
            coordinate={coordinate}
            centerOffset={{ y: 0.5 }}
            anchor={{ y: 0.5 }}
            title={title}
        >
            <ViewStyled
                borderRadius={'50%'}
                backgroundColor={color}
                style={{
                    width: 'auto',
                    height: 'auto',
                    padding: padding,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <FontAwesome6
                    name={iconName}
                    size={20}
                    color={theme_colors.white}
                />
            </ViewStyled>
        </Marker >
    ));

    const UserMarker = React.memo(({ coordinate, title }) => (
        <Marker
            stopPropagation
            tracksViewChanges={false}
            coordinate={coordinate}
            title={title}
        >
            <ViewStyled
                borderRadius={'50%'}
                backgroundColor={theme_colors.transparent}
                style={{
                    width: 'auto',
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <FontAwesome5
                    name={'map-pin'}
                    size={40}
                    color={theme_colors.danger}
                />
            </ViewStyled>
        </Marker >
    ));

    const [showCancelOrder, setShowCancelOrder] = useState(false);
    const handleCancelOrder = () => {
        setShowCancelOrder(true)
        changeColorStatusBar(theme_colors.backgroundModal)
    }

    return (
        <>
            <ViewStyled
                backgroundColor={theme_colors.white}
                style={{
                    width: '100%',
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    position: 'relative'
                }}
            >
                {/* Location tracker component (invisible) */}
                {
                    activeOrder?.order?.id && (
                        <LocationTracker orderId={activeOrder?.order?.id} />
                    )
                }

                {/* Mapa */}
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    mapType='standard'
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative'
                    }}
                    loadingEnabled={false}
                    liteMode
                    showsMyLocationButton={false}
                    initialRegion={initialRegion}
                    onPanDrag={() => setIsDragging(true)}
                    onRegionChangeComplete={() => setIsDragging(false)}
                >
                    {
                        latitude && longitude && (
                            <CustomMarker
                                coordinate={{
                                    latitude: deliveryLocation.latitude,
                                    longitude: deliveryLocation.longitude,
                                }}
                                color={theme_colors.primary}
                                title={deliveryLocation.title}
                                iconName={deliveryLocation.iconName}

                            />
                        )
                    }

                    {
                        userLat && userLng && (
                            <UserMarker
                                coordinate={{
                                    latitude: userLocation.latitude,
                                    longitude: userLocation.longitude,
                                }}
                                title={userLocation.title}
                                iconName={userLocation.iconName}
                            />
                        )
                    }

                    {
                        restaurantLat && restaurantLng && (
                            <CustomMarker
                                coordinate={{
                                    latitude: restaurantLocation.latitude,
                                    longitude: restaurantLocation.longitude,
                                }}
                                color={theme_colors.success}
                                title={restaurantLocation.title}
                                iconName={restaurantLocation.iconName}
                                padding={12}
                            />
                        )
                    }
                </MapView>

                {/* Zoom to fitLocations */}
                <ViewStyled
                    backgroundColor={theme_colors.white}
                    borderRadius={'50%'}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        right: 20,
                        bottom: heightPercentageToDP(8),
                        width: 'auto',
                        height: 'auto',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        elevation: 3,
                        shadowColor: theme_colors.black,
                        display: !isDragging ? 'flex' : 'none'
                    }}
                >
                    <Pressable
                        disabled={!hasLocations()}
                        onPress={zoomToFit}
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {
                            hasLocations()
                                ? <FontAwesome6
                                    name={'route'}
                                    size={adjustFontSize(theme_textStyles.large)}
                                    color={theme_colors.primary}
                                />
                                : <ActivityIndicator
                                    size="small"
                                    color={theme_colors.primary}
                                />
                        }
                    </Pressable>
                </ViewStyled>

                {
                    activeOrder?.order?.status === "created" && (
                        <ViewStyled
                            backgroundColor={theme_colors.white}
                            borderRadius={'50%'}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                left: 20,
                                bottom: heightPercentageToDP(8),
                                width: 45,
                                height: 45,
                                elevation: 3,
                                shadowColor: theme_colors.black,
                                display: !isDragging ? 'flex' : 'none',
                                borderWidth: 1,
                                borderColor: theme_colors.danger
                            }}
                        >
                            <Pressable
                                onPress={handleCancelOrder}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <MaterialCommunityIcons
                                    name={'block-helper'}
                                    size={adjustFontSize(theme_textStyles.medium)}
                                    color={theme_colors.danger}
                                />
                            </Pressable>
                        </ViewStyled>
                    )
                }

                {/* Header y Tarjeta de estado */}
                <ViewStyled
                    width={95}
                    marginTop={1.5}
                    borderRadius={2}
                    backgroundColor={theme_colors.white}
                    style={{
                        height: 'auto',
                        padding: 15,
                        shadowColor: theme_colors.black,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 3,
                        marginBottom: 15,
                        position: 'absolute',
                        top: top,
                    }}
                >
                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        style={{
                            width: '100%',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Pressable
                            onPress={goBack}
                        >
                            <ViewStyled
                                backgroundColor={theme_colors.transparent}
                                style={{
                                    width: 'auto',
                                    height: 'auto',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="close"
                                    size={adjustFontSize(theme_textStyles.large)}
                                    color={theme_colors.primary}
                                />
                            </ViewStyled>
                        </Pressable>

                        <TouchableOpacity
                            onPress={() => {
                                setShowDetailsOrder(true)
                                changeColorStatusBar(theme_colors.backgroundModal)
                            }}
                        >
                            <ViewStyled
                                width={25}
                                backgroundColor={theme_colors.semiTransparent}
                                borderRadius={2}
                                paddingVertical={0.5}
                                paddingHorizontal={2.5}
                                style={{
                                    height: 'auto',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="information"
                                    size={adjustFontSize(theme_textStyles.smedium)}
                                    color={theme_colors.primary}
                                />

                                <TextStyled
                                    fontFamily='SFPro-Regular'
                                    textAlign='center'
                                    fontSize={theme_textStyles.small}
                                    color={theme_colors.black}
                                    style={{
                                        marginTop: 3
                                    }}
                                >
                                    Detalles
                                </TextStyled>
                            </ViewStyled>
                        </TouchableOpacity>
                    </ViewStyled>

                    <ViewStyled
                        backgroundColor={theme_colors.transparent}
                        marginTop={1}
                        style={{
                            width: '100%',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}
                    >
                        <ViewStyled
                            backgroundColor={theme_colors.transparent}
                            marginBottom={1}
                            style={{
                                width: '100%',
                                height: 'auto',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            }}
                        >
                            <TextStyled
                                fontFamily='SFPro-SemiBold'
                                textAlign='left'
                                fontSize={theme_textStyles.large}
                                color={theme_colors.dark}
                                style={{
                                    marginTop: 3
                                }}
                            >
                                {getOrderStatusText(activeOrder?.order?.status || "completed")}
                            </TextStyled>

                            <TextStyled
                                fontFamily='SFPro-Regular'
                                textAlign='left'
                                fontSize={theme_textStyles.small + .5}
                                color={theme_colors.black}
                                style={{
                                    marginTop: 3
                                }}
                            >
                                {getOrderStatusSubtle(activeOrder?.order?.status || "completed")}
                            </TextStyled>
                        </ViewStyled>

                        <OrderProgressBar status={activeOrder?.order?.status || "completed"} />
                    </ViewStyled>
                </ViewStyled>
            </ViewStyled>

            <DetailsOrderModal
                order={activeOrder}
                visible={showDetailsOrder}
                onClose={() => {
                    setShowDetailsOrder(false)
                    changeColorStatusBar(theme_colors.transparent)
                }}
            />

            <CancelOrderModal
                visible={showCancelOrder}
                onClose={() => {
                    setShowCancelOrder(false)
                    changeColorStatusBar(theme_colors.transparent)
                }}
                orderId={activeOrder?.order?.id}
            />
        </>
    )
}
