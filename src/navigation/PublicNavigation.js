// REACT
import React from "react";

// CUSTOM
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthenticationScreen from "../screens/AuthenticationScreen";
import ModalExplications from "../components/Modals/ModalExplications";
import { theme } from "../utils/theme";

const Stack = createNativeStackNavigator();

export default function PublicNavigation() {

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarHidden: false,
          navigationBarColor: theme.dark
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
          name="ModalExplications"
          component={ModalExplications}
          options={{
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </>
  );
}
