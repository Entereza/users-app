import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import ProfileScreen from '../screens/ProfileScreen';
import ProfilePassword from '../screens/ProfilePassword';
import ProfileCompletar from '../screens/ProfileCompletar';
import HeaderStyledWalletProfile from '../components/ui/HeaderStyledWalletProfile';
import DeleteAccount from '../screens/DeleteAccountScreen'
import PersonalInfo from '../screens/PersonalInfo';
import ProfileName from '../screens/ProfileName';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: 'modal',
                navigationBarHidden: true
            }}
            initialRouteName="ProfileOptions"
        >
            <Stack.Screen
                name="ProfileOptions"
                component={ProfileScreen}
            />
            <Stack.Screen
                name='PersonalInfo'
                component={PersonalInfo}
                options={{
                    animation: "slide_from_right",
                    animationTypeForReplace: 'pop',
                    headerShown: true,
                    header: () => (
                        <HeaderStyledWalletProfile
                            title={'Información Personal'}
                        />
                    )
                }}
            />
            <Stack.Screen
                name='ProfilePassword'
                component={ProfilePassword}
                options={{
                    animation: "slide_from_right",
                    animationTypeForReplace: 'pop',
                    headerShown: true,
                    header: () => (
                        <HeaderStyledWalletProfile
                            title={'Cambiar contraseña'}
                        />
                    )
                }}
            />
            <Stack.Screen
                name='ProfileName'
                component={ProfileName}
                options={{
                    animation: "slide_from_right",
                    animationTypeForReplace: 'pop',
                    headerShown: true,
                    header: () => (
                        <HeaderStyledWalletProfile
                            title={'Actualizar Datos'}
                        />
                    )
                }}
            />
            {/* <Stack.Screen
                name='CompletePerfil'
                component={ProfileCompletar}
                options={{
                    animation: "slide_from_right",
                    animationTypeForReplace: 'pop',
                    headerShown: true,
                    header: () => (
                        <HeaderStyledWalletProfile
                            title={'Completa tu perfil de Entereza'}
                        />
                    )
                }}
            /> */}
            <Stack.Screen
                name='DeleteAccount'
                component={DeleteAccount}
                options={{
                    animation: "slide_from_right",
                    animationTypeForReplace: 'pop',
                    headerShown: true,
                    header: () => (
                        <HeaderStyledWalletProfile
                            title={'Eliminar Cuenta'}
                        />
                    )
                }}
            />
        </Stack.Navigator>

    )
}