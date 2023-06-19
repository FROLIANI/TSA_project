import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingForgotScreen from '../../Screens/ForgotTab/ForgotScreens/SettingForgotScreen'

const Stack = createNativeStackNavigator();

export default function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName="SettingForgotScreen"
    >
      <Stack.Screen name="SettingForgotScreen" component={SettingForgotScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

    </Stack.Navigator>
  );
};
