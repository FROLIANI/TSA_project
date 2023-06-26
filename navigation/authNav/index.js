import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from './SignIn/SignInScreen'
import BottomOwner from '../../components/BottomTabs/BottomOwner'
import BottomUser from '../../components/BottomTabs/BottomUser'
import BottomVendor from '../../components/BottomTabs/BottomVendor'
import ForgotTab from '../../components/BottomTabs/ForgotTab'
import FirstScreenopen from '../../Screens/FirstScreen/FirstScreenopen'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function AuthNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="FirstScreenopen"
      >

        <Stack.Screen name="FirstScreenopen" component={FirstScreenopen}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: 'blue' },
            headerTintColor: '#fff',
          }} />

        <Stack.Screen name="SignInScreen" component={SignInScreen}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: 'blue' },
            headerTintColor: '#fff',
          }} />

        <Stack.Screen name="BottomOwner" component={BottomOwner}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'blue',
              textAlign: 'center'
            },
            headerTintColor: '#fff',
          }} />

        <Stack.Screen name="BottomVendor" component={BottomVendor}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'blue',
              textAlign: 'center'
            },
            headerTintColor: '#fff',
          }} />

        <Stack.Screen name="BottomUser" component={BottomUser}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'blue',
              textAlign: 'center'
            },
            headerTintColor: '#fff',
          }} />

        <Stack.Screen name="ForgotTab" component={ForgotTab}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: 'blue',
              textAlign: 'center'
            },
            headerTintColor: '#fff',
          }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
