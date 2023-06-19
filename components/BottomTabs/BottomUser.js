import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeTabScreen from '../../Screens/UserBottom/HomeTabScreen';
import DetailsTabScreen from '../../Screens/UserBottom/DetailsTabScreen';
import ProfileTabScreen from '../../Screens/UserBottom/ProfileTabScreen';


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
        name="DetailsTabScreen"
        component={DetailsTabScreen}
        options={{
            headerShown: false,
          tabBarLabel: 'Details',
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="application-settings" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTabScreen"
        component={ProfileTabScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Account',
          headerTitle: 'TSA',
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

