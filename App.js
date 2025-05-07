import React from 'react';
import AppNavigation from './src/routes/AppNavigation';
import { useFonts } from 'expo-font';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated'
import 'react-native-gesture-handler'

export default function App() {
  const [fontsLoaded] = useFonts({
    // 'SFPro-Regular': require('./assets/fonts/SF-Pro-Text-Regular.otf'),
    // 'SFPro-Medium': require('./assets/fonts/SF-Pro-Text-Medium.otf'),
    // 'SFPro-SemiBold': require('./assets/fonts/SF-Pro-Text-Semibold.otf'),
    // 'SFPro-Bold': require('./assets/fonts/SF-Pro-Text-Bold.otf'),
    // 'SFPro-Italic': require('./assets/fonts/SF-Pro-Display-RegularItalic.otf'),
    // 'SFPro-Heavy': require('./assets/fonts/SF-Pro-Display-Heavy.otf'),

    'SFPro-Regular': require('./assets/fonts/poppins/Poppins-Regular.ttf'),
    'SFPro-Medium': require('./assets/fonts/poppins/Poppins-Medium.ttf'),
    'SFPro-SemiBold': require('./assets/fonts/poppins/Poppins-SemiBold.ttf'),
    'SFPro-Bold': require('./assets/fonts/poppins/Poppins-Bold.ttf'),
    'SFPro-Italic': require('./assets/fonts/poppins/Poppins-Italic.ttf'),
    'SFPro-Heavy': require('./assets/fonts/poppins/Poppins-ExtraBold.ttf'),


    'Artegra-Light': require('./assets/fonts/ArtegraSoftEx-Light.ttf'),
    'Artegra-Regular': require('./assets/fonts/ArtegraSoftEx-Regular.ttf'),
    'Artegra-Medium': require('./assets/fonts/ArtegraSoftEx-Medium.ttf'),
    'Artegra-SemiBold': require('./assets/fonts/ArtegraSoftEx-SemiBold.ttf'),
    'Artegra-Bold': require('./assets/fonts/ArtegraSoftEx-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  };

  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <AppNavigation />
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}