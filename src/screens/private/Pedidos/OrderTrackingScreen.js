import React, { useRef, useState } from 'react'
import useOrdersStore from '../../../utils/tools/interface/ordersStore'
import useTabBarStore from '../../../utils/tools/interface/tabBarStore';
import { useNavigation } from '@react-navigation/native';
import { theme_colors } from '../../../utils/theme/theme_colors';
import ViewStyled from '../../../utils/ui/ViewStyled';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { private_name_routes } from '../../../utils/route/private_name_routes';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import adjustFontSize from '../../../utils/ui/adjustText';
import { theme_textStyles } from '../../../utils/theme/theme_textStyles';
import TextStyled from '../../../utils/ui/TextStyled';
import OrderProgressBar from '../../../components/BusinessComponents/OrderProgressBar';

export default function OrderTrackingScreen({ route }) {
    const { top } = useSafeAreaInsets()
    const { order } = route.params;
    const { getOrderStatusText, getOrderStatusSubtle } = useOrdersStore();
    const { toggleTabBar } = useTabBarStore();
    const navigation = useNavigation();

    const statusOrders = {
        created: "created",
        accepted: "accepted",
        pickup: "pickup",
        store: "store",
        taken: "taken",
        delivering: "delivering",
        arrived: "arrived",
        completed: "completed"
    }

    const status = order.status;
    // const status = statusOrders.arrived;

    const mapRef = useRef(null);
    const [initialRegion, setInitialRegion] = useState({
        latitude: -17.783330,
        longitude: -63.182126,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
    });

    const restaurantLocation = {
        latitude: -17.785335478650975,
        longitude: -63.17709196897813,
        title: "Restaurante",
        iconName: "building"
    };

    const deliveryLocation = {
        latitude: -17.784834691861114,
        longitude: -63.18148193725959,
        title: "Repartidor",
        iconName: "motorcycle"
    };

    const userLocation = {
        latitude: -17.787613192247054,
        longitude: -63.185369675104724,
        title: "Tu ubicación",
        iconName: "house-chimney-user"
    }

    const goBack = () => {
        toggleTabBar(true)
        navigation.navigate(private_name_routes.empresas.empresasHome);
    };

    // Map markers memorized
    const CustomMarker = React.memo(({ coordinate, color, title, iconName }) => (
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
                    padding: 8,
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

    return (
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
                loadingEnabled={true}
                showsUserLocation={true}
                showsMyLocationButton={false}
                initialRegion={initialRegion}
            >
                <CustomMarker
                    coordinate={{
                        latitude: restaurantLocation.latitude,
                        longitude: restaurantLocation.longitude,
                    }}
                    color={theme_colors.secondary}
                    title={restaurantLocation.title}
                    iconName={restaurantLocation.iconName}
                />
                <CustomMarker
                    coordinate={{
                        latitude: deliveryLocation.latitude,
                        longitude: deliveryLocation.longitude,
                    }}
                    color={theme_colors.success}
                    title={deliveryLocation.title}
                    iconName={deliveryLocation.iconName}
                />
                <CustomMarker
                    coordinate={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                    }}
                    color={theme_colors.info}
                    title={userLocation.title}
                    iconName={userLocation.iconName}
                />
                <Polyline
                    coordinates={[
                        {
                            latitude: restaurantLocation.latitude,
                            longitude: restaurantLocation.longitude,
                        },
                        {
                            latitude: deliveryLocation.latitude,
                            longitude: deliveryLocation.longitude,
                        }
                    ]}
                    strokeColor={theme_colors.primary}
                    strokeWidth={3}
                />
                <Polyline
                    coordinates={[
                        {
                            latitude: deliveryLocation.latitude,
                            longitude: deliveryLocation.longitude,
                        },
                        {
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                        }
                    ]}
                    strokeColor={theme_colors.green}
                    strokeWidth={3}
                />
            </MapView>

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
                                size={adjustFontSize(theme_textStyles.xlarge)}
                                color={theme_colors.primary}
                            />
                        </ViewStyled>
                    </Pressable>

                    <ViewStyled
                        width={30}
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
                            size={adjustFontSize(theme_textStyles.xlarge)}
                            color={theme_colors.primary}
                        />

                        <TextStyled
                            fontFamily='SFPro-Regular'
                            textAlign='center'
                            fontSize={theme_textStyles.smedium}
                            color={theme_colors.black}
                            style={{
                                marginTop: 3
                            }}
                        >
                            Detalles
                        </TextStyled>
                    </ViewStyled>
                </ViewStyled>

                <ViewStyled
                    backgroundColor={theme_colors.transparent}
                    marginTop={2}
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
                            fontSize={theme_textStyles.large + .5}
                            color={theme_colors.dark}
                            style={{
                                marginTop: 3
                            }}
                        >
                            {getOrderStatusText(status)}
                        </TextStyled>

                        <TextStyled
                            fontFamily='SFPro-Regular'
                            textAlign='left'
                            fontSize={theme_textStyles.smedium}
                            color={theme_colors.black}
                            style={{
                                marginTop: 3
                            }}
                        >
                            {getOrderStatusSubtle(status)}
                        </TextStyled>
                    </ViewStyled>

                    <OrderProgressBar status={status} />
                </ViewStyled>
            </ViewStyled>
        </ViewStyled>
    )
}
