import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeTabscreen from '../../Screens/ForgotTab/HomeTabscreen';
import SettingScreen from '../../Screens/ForgotTab/SettingScreen';
import HelpScreen from '../../Screens/ForgotTab/HelpScreen';


const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTabscreen"
      screenOptions={{
        tabBarActiveTintColor: 'blue',
      }}
    >
      <Tab.Screen
        name="HomeTabscreen"
        component={HomeTabscreen}
        options={{
            headerShown: false,
          tabBarLabel: 'Home',
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
            headerShown: false,
          tabBarLabel: 'Settings',
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="application-settings" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{
            headerShown: false,
          tabBarLabel: 'Help',
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="help-rhombus-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

