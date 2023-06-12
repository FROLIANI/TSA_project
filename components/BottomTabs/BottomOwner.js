import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../../Screens/HomeScreen/HomeScreen';
import NotificationScreen from '../../Screens/NotificationScreen/NotificationScreen';
import Profile from '../../Screens/Profile/Profile';


const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      tabBarActiveTintColor: 'blue',
    }}
  >
    <Tab.Screen
      name="HomeScreen"
      component={HomeScreen}
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
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
            headerShown: false,
          tabBarLabel: 'Updates',
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="application-settings" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
            headerShown: false,
          tabBarLabel: 'Profile',
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

