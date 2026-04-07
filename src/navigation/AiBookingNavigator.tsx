import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AiBookingStackParamList } from './aiBookingTypes';
import AiCameraScreen from '../screens/ai/AiCameraScreen';
import AiProcessingScreen from '../screens/ai/AiProcessingScreen';
import AiReviewScreen from '../screens/ai/AiReviewScreen';

const Stack = createNativeStackNavigator<AiBookingStackParamList>();

export default function AiBookingNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AiCamera"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="AiCamera" component={AiCameraScreen} />
      <Stack.Screen name="AiProcessing" component={AiProcessingScreen} />
      <Stack.Screen name="AiReview" component={AiReviewScreen} />
    </Stack.Navigator>
  );
}
