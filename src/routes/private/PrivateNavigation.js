import React, { useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { private_name_routes } from '../../utils/route/private_name_routes';
import BilleteraStack from './BilleteraStack';
import EmpresasStack from './EmpresasStack';
import PedidosStack from './PedidosStack';
import { theme_colors } from '../../utils/theme/theme_colors';
import TabBarIcon from '../../components/TabBar/tabBarIcon';
import useTabBarStore from '../../utils/tools/interface/tabBarStore';
import ProfileStack from './ProfileStack';
import { locationService } from '../../services/location/locationService';
import useLocationStore from '../../utils/tools/interface/locationStore';
import { toastService } from '../../utils/tools/interface/toastService';
import useOrdersStore from '../../utils/tools/interface/ordersStore';
import { ordersService } from '../../services/api/orders/ordersService';
import useAuthStore from '../../utils/tools/interface/authStore';
import { notificationService } from '../../services/notifications/notificationService';
import * as Notifications from 'expo-notifications';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function PrivateNavigation() {
    const { showTabBar } = useTabBarStore();
    const { bottom } = useSafeAreaInsets();

    const { user } = useAuthStore();
    const {
        setLocation,
        setDepartment,
        setIsSearchingLocation,
        setCountry,
        setIsCountryEnabled,
        setIsDepartmentEnabled,
        setHasLocationPermissions
    } = useLocationStore();
    const {
        setOrders,
        setIsLoading,
        setError,
        setTotalPages,
        setCurrentPage,
        updateOrder
    } = useOrdersStore();

    useEffect(() => {
        initializeLocation();
        initializeOrders();
    }, []);

    useEffect(() => {
        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            const notificationData = notification.request.content.data;
            console.log('Notification received:', notificationData);

            // If notification contains order data, update that specific order
            if (notificationData?.order) {
                console.log('Updating order from notification:', {
                    notificationName: notificationData.notificationName,
                    orderId: notificationData.order.id,
                    newStatus: notificationData.order.status
                });
                updateOrder(notificationData.order);
            }
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            const notificationData = response.notification.request.content.data;
            console.log('Notification response:', notificationData);

            // If notification contains order data, update that specific order
            if (notificationData?.order) {
                console.log('Updating order from notification response:', {
                    notificationName: notificationData.notificationName,
                    orderId: notificationData.order.id,
                    newStatus: notificationData.order.status
                });
                updateOrder(notificationData.order);
            }
        });

        return () => {
            notificationListener &&
                Notifications.removeNotificationSubscription(notificationListener);
            responseListener &&
                Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    const initializeOrders = async () => {
        try {
            setIsLoading(true);
            const response = await ordersService.getClientOrders(user.id);

            if (!response?.orders || response.orders.length === 0) {
                // toastService.showWarningToast("No tienes pedidos pendientes");
                return;
            }

            setOrders(response.orders);
            setTotalPages(1);
            setCurrentPage(0);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError(error);
            toastService.showErrorToast("No pudimos cargar tus pedidos. Por favor, intenta más tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    const initializeLocation = async () => {
        try {
            setIsSearchingLocation(true);
            const hasPermission = await locationService.requestLocationPermission();

            if (!hasPermission) {
                toastService.showWarningToast("Necesitamos acceso a tu ubicación para brindarte un mejor servicio");
                return;
            }

            setHasLocationPermissions(true);

            const location = await locationService.getCurrentLocation();

            setLocation(location.coords.latitude, location.coords.longitude);

            const locationInfo = await locationService.getDepartmentFromCoords(
                location.coords.latitude,
                location.coords.longitude
            );

            if (locationInfo) {
                setCountry(locationInfo.country);

                if (!locationInfo.isBolivia) {
                    setIsCountryEnabled(false);
                    setIsDepartmentEnabled(false);
                    toastService.showWarningToast("La aplicación solo está disponible en Bolivia");
                    return;
                }

                setIsCountryEnabled(true);
                setDepartment(locationInfo.name, locationInfo.id);
                setIsDepartmentEnabled(locationInfo.isEnabled);

                if (!locationInfo.isEnabled) {
                    toastService.showWarningToast("Este departamento no está habilitado para el servicio");
                }
            }

            console.log('Location initialized:', {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                locationInfo
            });
        } catch (error) {
            console.error('Error initializing location:', error);
            toastService.showErrorToast("No pudimos obtener tu ubicación. Por favor, verifica que el GPS esté activado.");
        } finally {
            setIsSearchingLocation(false);
        }
    };

    const tabBarOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            return (
                <TabBarIcon
                    routeName={route.name}
                    focused={focused}
                    color={color}
                    size={size - 5}
                />
            )
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme_colors.primary,
        tabBarActiveTintColor: theme_colors.white,
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: true,
        tabBarStyle: {
            display: showTabBar ? 'flex' : 'none',
            position: 'absolute',
            height: heightPercentageToDP(8.5),
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
        },
    });

    return (
        <Tab.Navigator
            initialRouteName={private_name_routes.billetera.billeteraStack}
            screenOptions={tabBarOptions}
        >
            <Tab.Screen
                name={private_name_routes.billetera.billeteraStack}
                component={BilleteraStack}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen
                name={private_name_routes.empresas.empresasStack}
                component={EmpresasStack}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen
                name={private_name_routes.pedidos.pedidosStack}
                component={PedidosStack}
                options={{
                    headerShown: false,
                    tabBarItemStyle: {
                        display: 'none'
                    }
                }}
            />
            <Tab.Screen
                name={private_name_routes.profile.profileStack}
                component={ProfileStack}
                options={{
                    headerShown: false,
                    tabBarItemStyle: {
                        display: 'none'
                    }
                }}
            />
        </Tab.Navigator>
    );
}
