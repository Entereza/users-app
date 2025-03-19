import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { private_name_routes } from '../../utils/route/private_name_routes';
import PedidosHomeScreen from '../../screens/private/Pedidos/PedidosHomeScreen';
import HeaderDefaultScreen from '../../components/Header/HeaderDefaultScreen';
import EmpresaDetails from '../../screens/private/Empresas/EmpresaDetails';
import OrderDetails from '../../screens/private/Pedidos/OrderDetails';
import FollowOrder from '../../screens/private/Pedidos/FollowOrder';
import OrderTrackingScreen from '../../screens/private/Pedidos/OrderTrackingScreen';

const Stack = createNativeStackNavigator();

export default function PedidosStack() {
    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={private_name_routes.pedidos.pedidosStack}
            >
                <Stack.Screen
                    name={private_name_routes.pedidos.pedidosHome}
                    component={PedidosHomeScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.pedidos.empresasDetails}
                    component={EmpresaDetails}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.pedidos.orderDetails}
                    component={OrderDetails}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.pedidos.orderTracking}
                    component={OrderTrackingScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                    }}
                />
            </Stack.Navigator>
        </>
    )
}