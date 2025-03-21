import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { public_name_routes } from '../../utils/route/public_name_routes';
import AuthScreen from '../../screens/public/AuthScreen';
import { theme_colors } from '../../utils/theme/theme_colors';
import LoginScreen from '../../screens/public/LoginScreen';
import RegisterScreen from '../../screens/public/RegisterScreen';
import AccountRecoveryScreen from '../../screens/public/AccountRecoveryScreen';

const Stack = createNativeStackNavigator();

export default function PublicNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                navigationBarHidden: true,
                navigationBarColor: theme_colors.transparent,
                animationEnabled: true,
                animationTypeForReplace: 'push',
            }}
            initialRouteName={public_name_routes.auth.authScreen}
        >
            <Stack.Screen name={public_name_routes.auth.authScreen} component={AuthScreen} />
            <Stack.Screen name={public_name_routes.auth.signIn} component={LoginScreen} />
            <Stack.Screen name={public_name_routes.auth.signUp} component={RegisterScreen} />
            <Stack.Screen name={public_name_routes.auth.accountRecovery} component={AccountRecoveryScreen} />
        </Stack.Navigator>
    )
}