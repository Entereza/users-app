import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { private_name_routes } from '../../utils/route/private_name_routes';
import BilleteraStack from './BilleteraStack';
import EmpresasStack from './EmpresasStack';
import PedidosStack from './PedidosStack';
import { theme_colors } from '../../utils/theme/theme_colors';
import TabBarIcon from '../../components/TabBar/tabBarIcon';
import useTabBarStore from '../../utils/tools/interface/tabBarStore';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

export default function PrivateNavigation() {
    const { showTabBar } = useTabBarStore();

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
