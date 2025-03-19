import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { private_name_routes } from '../../utils/route/private_name_routes';
import ProfileHomeScreen from '../../screens/private/Perfil/ProfileHomeScreen';
import PersonalDataScreen from '../../screens/private/Perfil/PersonalDataScreen';
import ChangePasswordScreen from '../../screens/private/Perfil/ChangePasswordScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                navigationBarHidden: true,
                animation: "slide_from_right",
                animationTypeForReplace: 'pop',
                gestureEnabled: true,
                gestureDirection: 'horizontal',
            }}
            initialRouteName={private_name_routes.profile.profileHome}
        >
            <Stack.Screen
                name={private_name_routes.profile.profileHome}
                component={ProfileHomeScreen}
                options={{
                    animation: "slide_from_right",
                    animationTypeForReplace: 'push',
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                }}
            />

            <Stack.Screen
                name={private_name_routes.profile.editProfile}
                component={PersonalDataScreen}
                options={{
                    navigationBarHidden: true,
                    animation: "slide_from_right",
                    animationTypeForReplace: 'pop',
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                }}
            />

            <Stack.Screen
                name={private_name_routes.profile.changePassword}
                component={ChangePasswordScreen}
                options={{
                    navigationBarHidden: true,
                    animation: "slide_from_right",
                    animationTypeForReplace: 'pop',
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                }}
            />
        </Stack.Navigator>
    )
}