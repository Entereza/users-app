import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { private_name_routes } from '../../utils/route/private_name_routes';
import HomeScreen from '../../screens/private/Billetera/HomeScreen';
import ProfileHomeScreen from '../../screens/private/Perfil/ProfileHomeScreen';
import CodeEnterezaScreen from '../../screens/private/Billetera/CodeEnterezaScreen';
import CashbackInfoScreen from '../../screens/private/Billetera/CashbackInfoScreen';
import TransferScreen from '../../screens/private/Billetera/TransferScreen';
import KeyboardModal from '../../components/Modals/KeyboardModal';
import FinalConfirmScreen from '../../screens/private/Billetera/FinalConfirmScreen';
import RechargeMoneyScreen from '../../screens/private/Billetera/RechargeMoneyScreen';
import AllOrdersScreen from '../../screens/private/Billetera/AllOrdersScreen';
import TransferConfirmedScreen from '../../screens/private/Billetera/TransferConfirmedScreen';
import useTabBarStore from '../../utils/tools/interface/tabBarStore';

const Stack = createNativeStackNavigator();

export default function BilleteraStack() {
    const { screenAnimationType } = useTabBarStore()

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    navigationBarHidden: true
                }}
                initialRouteName={private_name_routes.billetera.billeteraStack}
            >
                <Stack.Screen
                    name={private_name_routes.billetera.billeteraHome}
                    component={HomeScreen}
                    options={{
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.billetera.codeScreen}
                    component={CodeEnterezaScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.billetera.cashbackInfoScreen}
                    component={CashbackInfoScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.billetera.transferScreen}
                    component={TransferScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.billetera.transferConfirmedScreen}
                    component={TransferConfirmedScreen}
                    options={{
                        presentation: 'modal',
                        navigationBarHidden: true,
                        animation: screenAnimationType,
                        animationTypeForReplace: 'pop',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.billetera.cashbackKeyboardModal}
                    component={KeyboardModal}
                    options={{
                        presentation: 'containedTransparentModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.billetera.billeteraFinalConfirmation}
                    component={FinalConfirmScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.billetera.recargarScreen}
                    component={RechargeMoneyScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={private_name_routes.billetera.allOrdersScreen}
                    component={AllOrdersScreen}
                    options={{
                        presentation: 'fullScreenModal',
                        navigationBarHidden: true,
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </>
    )
}