// LIBRARIES 
import React from 'react';
import { Provider } from 'react-redux';

import { useFonts } from 'expo-font';

// CUSTOM
import AppNavigation from './src/navigation/AppNavigation';
import { store } from './src/redux/store';

export default function App() {
  const [fontsLoaded] = useFonts({
    BRFirma: require('./assets/fonts/BRFirma-Regular.otf'),
    BRFirmaBold: require('./assets/fonts/BRFirma-Bold.otf'),

    Gemunu: require('./assets/fonts/GemunuLibre-VariableFont_wght.ttf'),

    Artegra: require('./assets/fonts/ArtegraSoftEx-ExtraLight.ttf'),
    ArtegraBold: require('./assets/fonts/ArtegraSoftEx-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return (
      null
    )
  };

  return (
    <Provider
      store={store}
    >
      <AppNavigation />
    </Provider>
  );
}

