import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import GalleryScreen from '../screens/GalleryScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import UploadScreen from '../screens/UploadScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6B46C1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Anime Photos' }}
      />
      <Stack.Screen 
        name="Gallery" 
        component={GalleryScreen}
        options={{ title: 'Galería' }}
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen}
        options={{ title: 'Detalle' }}
      />
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{ title: 'Favoritos' }}
      />
      <Stack.Screen 
        name="Upload" 
        component={UploadScreen}
        options={{ title: 'Subir Foto' }}
      />
    </Stack.Navigator>
  );
}