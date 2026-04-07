import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

import SplashScreen from '../../screens/SplashScreen';
import WelcomeScreen from '../../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import PhoneAuthScreen from '../screens/PhoneAuthScreen';
import AiBookingNavigator from './AiBookingNavigator';
import MainTabsNavigator from './MainTabsNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
      <Stack.Screen name="Home" component={MainTabsNavigator} />
      <Stack.Screen name="AiBooking" component={AiBookingNavigator} />
    </Stack.Navigator>
  );
}
