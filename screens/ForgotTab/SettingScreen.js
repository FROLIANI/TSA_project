
import { NavigationContainer } from '@react-navigation/native';
import ResetPasswordScreen from '../../Screens/ResetPasswordScreen/ResetPasswordScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator(); 

export default function AuthNav() {
  return (
      <Stack.Navigator
        initialRouteName="ResetPasswordScreen"
      >
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: 'blue' },
            headerTintColor: '#fff',
          }} />

      </Stack.Navigator>
  );
};
