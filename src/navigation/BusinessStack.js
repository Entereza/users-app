import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BusinessHome from '../screens/BusinessScreen';
import SearchScreen from '../screens/SearchScreen';
import HeaderStyled from '../components/ui/HeaderStyled';
import ChangeUbicationScreen from '../screens/ChangeUbicationScreen';
import BusinessInfo from '../screens/BusinessInfo.js';
import BusinessCategoryScreen from '../screens/BusinessCategoryScreen';
import BusinessCashbacks from '../screens/BusinessCashbacks';
import BusinessRelevant from '../screens/BusinessRelevant';
import FloatingButton from '../components/Btn/FloatingButton';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
    return (
        <>
            <FloatingButton />

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    presentation: 'modal',
                    navigationBarHidden: true
                }}
                initialRouteName="BusinessHome"
            >

                <Stack.Screen
                    name="BusinessHome"
                    component={BusinessHome}
                    options={{
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                    }}
                />
                <Stack.Screen
                    name="SearchScreen"
                    component={SearchScreen}
                    options={({ navigation, route }) => ({
                        animation: "fade_from_bottom",
                        animationTypeForReplace: 'pop',
                        headerShown: true,
                        header: () => (
                            <HeaderStyled
                                title={'Buscador de Empresas'}
                                routeName={route.name}
                            />
                        )
                    })}
                />

                <Stack.Screen
                    name="ChangeUbication"
                    component={ChangeUbicationScreen}
                    options={({ navigation, route }) => ({
                        animation: "slide_from_bottom",
                        animationTypeForReplace: 'push',
                        headerShown: true,
                        header: () => (
                            <HeaderStyled
                                title={'Selecciona tu ciudad'}
                                routeName={route.name}
                            />
                        )
                    })}
                />
                <Stack.Screen
                    name="BusinessInfo"
                    component={BusinessInfo}
                    options={{
                        animation: "slide_from_right",
                        animationTypeForReplace: 'push',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="BusinessCategory"
                    component={BusinessCategoryScreen}
                    options={{
                        animation: "slide_from_right",
                        animationTypeForReplace: 'push',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="BusinessCashbacks"
                    component={BusinessCashbacks}
                    options={{
                        animation: "slide_from_right",
                        animationTypeForReplace: 'pop',
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="BusinessRelevant"
                    component={BusinessRelevant}
                    options={{
                        animation: "slide_from_right",
                        animationTypeForReplace: 'push',
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </>

    )
}