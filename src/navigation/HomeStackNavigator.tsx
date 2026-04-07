import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from './homeStackTypes';
import HomeScreen from '../screens/customer/HomeScreen';
import ProProfileScreen from '../screens/customer/ProProfileScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ProProfile" component={ProProfileScreen} />
    </Stack.Navigator>
  );
}
