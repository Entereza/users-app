import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert } from 'react-native';
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

const Tab = createBottomTabNavigator();

export default function PrivateNavigation() {
    const { showTabBar } = useTabBarStore();
    const { 
        setLocation, 
        setDepartment, 
        setIsSearchingLocation 
    } = useLocationStore();

    useEffect(() => {
        initializeLocation();
    }, []);

    const initializeLocation = async () => {
        try {
            setIsSearchingLocation(true);
            const hasPermission = await locationService.requestLocationPermission();

            if (!hasPermission) {
                Alert.alert(
                    "Permiso Requerido",
                    "Necesitamos acceso a tu ubicación para brindarte un mejor servicio",
                    [{ text: "OK" }]
                );
                return;
            }

            const location = await locationService.getCurrentLocation();
            setLocation(location.coords.latitude, location.coords.longitude);

            const departmentInfo = await locationService.getDepartmentFromCoords(
                location.coords.latitude,
                location.coords.longitude
            );

            if (departmentInfo) {
                setDepartment(departmentInfo.name, departmentInfo.id);
            }

            console.log('Location initialized:', {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                department: departmentInfo
            });
        } catch (error) {
            console.error('Error initializing location:', error);
            Alert.alert(
                "Error",
                "No pudimos obtener tu ubicación. Por favor, verifica que el GPS esté activado.",
                [{ text: "OK" }]
            );
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
            backgroundColor: theme_colors.white,
            borderWidth: 1,
            borderColor: theme_colors.white,
            display: showTabBar ? 'flex' : 'none',
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingBottom: 2,
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
                    headerShown: false
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
