import VendorAssignTaskScreen from '../../Screens/VendorAssignTaskScreen/VendorAssignTaskScreen'
import VendorReceiveRequestScreen from '../../Screens/VendorReceiveRequestScreen/VendorReceiveRequestScreen'
import VendorUpdateTaskScreen from '../../Screens/VendorUpdateTaskScreen/VendorUpdateTaskScreen'


import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName="VendorReceiveRequestScreen"
      
    >
      <Stack.Screen name="VendorReceiveRequestScreen" component={VendorReceiveRequestScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

      <Stack.Screen name="VendorAssignTaskScreen" component={VendorAssignTaskScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

<Stack.Screen name="VendorUpdateTaskScreen" component={VendorUpdateTaskScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

    </Stack.Navigator>
  );
};
