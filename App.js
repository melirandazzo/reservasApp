import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Header from './src/components/Header';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import { useState,useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [categorySelected, setCategorySelected] = useState(null)
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
    <>
      <StatusBar style="light" />
      {
        categorySelected
          ?
          <>
            <Header subtitle="Productos" />
            <ProductsScreen category={categorySelected} />
          </>
          :
          <>
            <Header subtitle="Categorías" />
            <CategoriesScreen setCategorySelected={setCategorySelected} />
          </>
      }

    </>
  );
}

const styles = StyleSheet.create({
});
