import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from '../screens/WalletScreen';
import CodeEnterezaPage from '../screens/CodeEnterezaPage';
import HeaderStyledWalletProfile from '../components/ui/HeaderStyledWalletProfile';
import WalletSalesScreen from '../components/wallet/WalletSalesScreen';
import { theme } from '../utils/theme';
import FloatingButton from '../components/Btn/FloatingButton';

const Stack = createNativeStackNavigator();

export default function WalletStack() {
    return (
        <>            
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    presentation: 'modal',
                    navigationBarHidden: true
                }}
                initialRouteName="WalletScreen"
            >

                <Stack.Screen
                    name="WalletScreen"
                    component={WalletScreen}
                    options={{
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                    }}
                />
                <Stack.Screen
                    name="CodeEntereza"
                    component={CodeEnterezaPage}
                    options={{
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: true,
                        header: () => (
                            <HeaderStyledWalletProfile
                                title={'Código Entereza'}
                            />
                        )
                    }}
                />
                <Stack.Screen
                    name="WalletTransactions"
                    component={WalletSalesScreen}
                    options={{
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: true,
                        header: () => (
                            <HeaderStyledWalletProfile
                                title={'Transacciones'}
                            />
                        )
                    }}
                />
            </Stack.Navigator>
        </>

    )
}