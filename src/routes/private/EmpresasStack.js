import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { private_name_routes } from '../../utils/route/private_name_routes';
import EmpresasHomeScreen from '../../screens/private/Empresas/EmpresasHomeScreen';
import EmpresaDetails from '../../screens/private/Empresas/EmpresaDetails';
import EmpresaProducto from '../../screens/private/Empresas/EmpresaProducto';
import EmpresasCategory from '../../screens/private/Empresas/EmpresasCategory';
import HeaderDefaultScreen from '../../components/Header/HeaderDefaultScreen';
import CarritoHomeScreen from '../../screens/private/Pedidos/CarritoHomeScreen';
import ConfirmOrderScreen from '../../screens/private/Pedidos/ConfirmOrderScreen';
import ConfirmationScreen from '../../screens/private/Pedidos/ConfirmationScreen';
import MethodScreen from '../../screens/private/Pedidos/MethodScreen';
import AddressSelectionScreen from '../../screens/private/Pedidos/AddressSelectionScreen';
import CashbackScreen from '../../screens/private/Pedidos/CashbackScreen';
import FacturacionScreen from '../../screens/private/Pedidos/FacturacionScreen';
import ProfileHomeScreen from '../../screens/private/Perfil/ProfileHomeScreen';
import PersonalDataScreen from '../../screens/private/Perfil/PersonalDataScreen';
import ChangePassword from '../../screens/private/Perfil/ChangePassword';
import FollowOrder from '../../screens/private/Pedidos/FollowOrder';
import NewAddressMap from '../../screens/private/Pedidos/NewAddressMap';
import SaveAddressScreen from '../../screens/private/Pedidos/SaveAddressScreen';

const Stack = createNativeStackNavigator();

export default function EmpresasStack() {

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    navigationBarHidden: true
                }}
                initialRouteName={private_name_routes.empresas.empresasStack}
            >
                <Stack.Screen
                    name={private_name_routes.empresas.empresasHome}
                    component={EmpresasHomeScreen}
                    options={{
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.empresas.empresasDetails}
                    component={EmpresaDetails}
                    options={{
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.empresas.empresaProducto}
                    component={EmpresaProducto}
                    options={{
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.empresas.empresaCategory}
                    component={EmpresasCategory}
                    options={{
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.empresas.carritoHome}
                    component={CarritoHomeScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: true,
                        header: () => (
                            <HeaderDefaultScreen title={"Carrito"} />
                        )
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.empresas.confirmOrder}
                    component={ConfirmOrderScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: true,
                        header: () => (
                            <HeaderDefaultScreen title={"Confirmar pedido"} />
                        )
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.empresas.empresasFinalConfirmation}
                    component={ConfirmationScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.empresas.methodScreen}
                    component={MethodScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: true,
                        header: () => (
                            <HeaderDefaultScreen title={"Método de pago"} />
                        )
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.empresas.addressScreen}
                    component={AddressSelectionScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.empresas.cashbackScreen}
                    component={CashbackScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: true,
                        header: () => (
                            <HeaderDefaultScreen title={"Cashback"} />
                        )
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.empresas.facturacionScreen}
                    component={FacturacionScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: true,
                        header: () => (
                            <HeaderDefaultScreen title={"Facturacion"} />
                        )
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.empresas.followOrder}
                    component={FollowOrder}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.empresas.newAddressMap}
                    component={NewAddressMap}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                    }}
                />
                <Stack.Screen
                    name={private_name_routes.empresas.saveAddress}
                    component={SaveAddressScreen}
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