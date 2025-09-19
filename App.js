import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react'
import MainNavigator from './src/navigation/MainNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'LibertinusSans-Bold': require('./assets/fonts/LibertinusSans-Bold.ttf'),
    'LibertinusSans-Italic': require('./assets/fonts/LibertinusSans-Italic.ttf'),
    'LibertinusSans-Regular': require('./assets/fonts/LibertinusSans-Regular.ttf'),
    'MPLUSRounded1c-Bold': require('./assets/fonts/MPLUSRounded1c-Bold.ttf'),
    'MPLUSRounded1c-Regular': require('./assets/fonts/MPLUSRounded1c-Regular.ttf'),
    'PlaywriteAUQLD-Regular': require('./assets/fonts/PlaywriteAUQLD-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar style="light" />
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
});
