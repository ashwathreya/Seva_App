import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from './types';
import HomeStackNavigator from './HomeStackNavigator';
import AiBookingNavigator from './AiBookingNavigator';
import ProWorkspaceScreen from '../screens/pro/ProWorkspaceScreen';
import AdminWorkspaceScreen from '../screens/admin/AdminWorkspaceScreen';
import { theme } from '../theme/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.brandGold,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginBottom: 2,
        },
        tabBarStyle: {
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 12,
          height: 66,
          borderRadius: 18,
          paddingTop: 6,
          paddingBottom: 8,
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          backgroundColor: theme.colors.surfaceSubtle,
          shadowColor: '#000',
          shadowOpacity: 0.35,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 14 }}>●</Text>,
        }}
      />
      <Tab.Screen
        name="AiTab"
        component={AiBookingNavigator}
        options={{
          title: 'AI Scan',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 14 }}>◉</Text>,
        }}
      />
      <Tab.Screen
        name="ProTab"
        component={ProWorkspaceScreen}
        options={{
          title: 'Pro',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 14 }}>◆</Text>,
        }}
      />
      <Tab.Screen
        name="AdminTab"
        component={AdminWorkspaceScreen}
        options={{
          title: 'Admin',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 14 }}>■</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
