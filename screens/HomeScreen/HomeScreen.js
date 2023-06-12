
import { NavigationContainer } from '@react-navigation/native';
import OwnerHomeScreen from '../../Screens/OwnerHomeScreen/OwnerHomeScreen'
import OwnerRegVendorScreen from '../../Screens/OwnerRegVendorScreen/OwnerRegVendorScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName="OwnerHomeScreen"
      
    >
      <Stack.Screen name="OwnerHomeScreen" component={OwnerHomeScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

      <Stack.Screen name="OwnerRegVendorScreen" component={OwnerRegVendorScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

    </Stack.Navigator>
  );
};
