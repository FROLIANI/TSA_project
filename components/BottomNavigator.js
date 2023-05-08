import React from "react";
import {  View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';







function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       

      </View>
    );
  }
  function RequestScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text>Home!</Text> */}
      </View>
    );
  }

  function ProfileScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text>Settings!</Text> */}
      </View>
    );
  }

           const Tab = createBottomTabNavigator();

              function MyTabs() {
                return (
                  <Tab.Navigator
                  >
                    <Tab.Screen name="Home"
                    component={HomeScreen}
                    options={{
                      headerShown:false,
                      tabBarLabel: 'Home',
                      tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                      ),
                    }}
                      />
                    <Tab.Screen name="Request"
                    component={RequestScreen} 
                    options={{
                      headerShown:false,
                      tabBarLabel: 'Request',
                      tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="application" color={color} size={size} />
                      ),
                    }}
                    />
                    <Tab.Screen name="Profile"
                    component={ProfileScreen}
                    options={{
                      headerShown:false,
                      tabBarLabel: 'profile',
                      tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                      ),
                    }}
                      />
                  </Tab.Navigator>
                );
              }


              export default () => {
                return (
                    <NavigationContainer>
                        <MyTabs/>
                        </NavigationContainer>
                )
              };
