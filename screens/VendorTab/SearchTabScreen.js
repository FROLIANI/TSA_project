
import { NavigationContainer } from '@react-navigation/native';
import VendowPrevewTaskAssign from '../../Screens/VendowPrevewTaskAssign/VendowPrevewTaskAssign'
import VendorManageTaskScreen from '../../Screens/VendorManageTaskScreen/VendorManageTaskScreen'
import VendorViewUserDetails from '../../Screens/VendorViewUserDetails/VendorViewUserDetails'


import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName="VendowPrevewTaskAssign"
      
    >
      <Stack.Screen name="VendowPrevewTaskAssign" component={VendowPrevewTaskAssign}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

      <Stack.Screen name="VendorManageTaskScreen" component={VendorManageTaskScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

<Stack.Screen name="VendorViewUserDetails" component={VendorViewUserDetails}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

    </Stack.Navigator>
  );
};
