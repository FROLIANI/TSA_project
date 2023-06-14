import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeTabScreen from '../../Screens/VendorTab/HomeTabScreen';
import SearchTabScreen from '../../Screens/VendorTab/SearchTabScreen';
import AccountTabScreen from '../../Screens/VendorTab/AccountTabScreen';


const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
    initialRouteName="HomeTabScreen"
    screenOptions={{
      tabBarActiveTintColor: 'blue',
    }}
  >
    <Tab.Screen
      name="HomeTabScreen"
      component={HomeTabScreen}
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
        name="SearchTabScreen"
        component={SearchTabScreen}
        options={{
            headerShown: false,
          tabBarLabel: 'View',
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="application-settings" color={color} size={size} />
          ),
        }}
      />

<Tab.Screen
        name="AccountTabScreen"
        component={AccountTabScreen}
        options={{
            headerShown: false,
          tabBarLabel: 'View',
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

