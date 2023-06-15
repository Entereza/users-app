// REACT
import React from "react";

// CUSTOM
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ModalHowSale from "../components/Modals/ModalHowSale";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import LoginEnterezaScreen from "../screens/LoginEnterezaScreen";
import RegisterEnterezaScreen from "../screens/RegisterEnterezaScreen";
import ModalExplications from "../components/Modals/ModalExplications";
import { theme } from "../utils/theme";

const Stack = createNativeStackNavigator();

export default function PublicNavigation() {

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: theme.primary
        }}
        initialRouteName="ModalExplications"
      >
        <Stack.Screen
          name="AuthenticationScreen"
          component={AuthenticationScreen}
          options={{
            animation: 'slide_from_right', // Animación personalizada para la pantalla AuthenticationScreen
          }}
        />
        <Stack.Screen
          name="LoginEnterezaScreen"
          component={LoginEnterezaScreen}
          options={{
            animation: 'slide_from_right', // Animación personalizada para la pantalla LoginEnterezaScreen
          }}
        />
        <Stack.Screen
          name="RegisterEnterezaScreen"
          component={RegisterEnterezaScreen}
          options={{
            animation: 'slide_from_left', // Animación personalizada para la pantalla RegisterEnterezaScreen
          }}
        />

        <Stack.Screen
          name="ModalExplications"
          component={ModalExplications}
          options={{
            animation: 'fade',
            navigationBarColor: theme.dark
          }}
        />
      </Stack.Navigator>
    </>
  );
}
