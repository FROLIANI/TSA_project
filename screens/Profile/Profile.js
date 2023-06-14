
import VendorListScreen from '../../Screens/VendorListScreen/VendorListScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName="VendorListScreen"
      
    >
      <Stack.Screen name="VendorListScreen" component={VendorListScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

    </Stack.Navigator>
  );
};