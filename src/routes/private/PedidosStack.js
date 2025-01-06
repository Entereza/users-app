import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { private_name_routes } from '../../utils/route/private_name_routes';
import PedidosHomeScreen from '../../screens/private/Pedidos/PedidosHomeScreen';
import HeaderDefaultScreen from '../../components/Header/HeaderDefaultScreen';
import EmpresaDetails from '../../screens/private/Empresas/EmpresaDetails';

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
                        headerShown: true,
                        header: () => (
                            <HeaderDefaultScreen title={"Mis pedidos"}/>
                        )
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
            </Stack.Navigator>
        </>
    )
}