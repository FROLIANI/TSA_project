import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HelpForgotScreen from '../../Screens/ForgotTab/ForgotScreens/HelpForgotScreen';
const Stack = createNativeStackNavigator();

export default function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName="HelpForgotScreen"
    >
      <Stack.Screen name="HelpForgotScreen" component={HelpForgotScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#fff',
        }} />

    </Stack.Navigator>
  );
};
