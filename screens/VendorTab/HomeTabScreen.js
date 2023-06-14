
import { NavigationContainer } from '@react-navigation/native';
import VendorHomeScreen from '../../Screens/VendorHomeScreen/VendorHomeScreen'
import VendorRegUserScreen from '../../Screens/VendorRegUserScreen/VendorRegUserScreen'
import updateUserScreen from '../../Screens/updateUserScreen/updateUserScreen'


import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName="VendorHomeScreen"
      
    >
      <Stack.Screen name="VendorHomeScreen" component={VendorHomeScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

      <Stack.Screen name="VendorRegUserScreen" component={VendorRegUserScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

<Stack.Screen name="updateUserScreen" component={updateUserScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

    </Stack.Navigator>
  );
};
