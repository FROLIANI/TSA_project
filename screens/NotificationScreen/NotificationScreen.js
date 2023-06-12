
import { NavigationContainer } from '@react-navigation/native';
import OwnerCheckVerification from '../../Screens/OwnerCheckVerification/OwnerCheckVerification'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName="OwnerCheckVerification"
      
    >
      <Stack.Screen name="OwnerCheckVerification" component={OwnerCheckVerification}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

    </Stack.Navigator>
  );
};
