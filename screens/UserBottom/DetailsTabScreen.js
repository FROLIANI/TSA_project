import UserSendRequestScreen from '../../Screens/UserSendRequestScreen/UserSendRequestScreen'
import UserViewRegDetailScreen from '../../Screens/UserViewRegDetailScreen/UserViewRegDetailScreen'
import UserViewRequestScreen from '../../Screens/UserViewRequestScreen/UserViewRequestScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthNav() {
    return (
        <Stack.Navigator
            initialRouteName="UserViewRequestScreen"

        >
            <Stack.Screen name="UserViewRegDetailScreen" component={UserViewRegDetailScreen}
                options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: 'blue' },
                    headerTintColor: '#fff',
                }} />

            <Stack.Screen name="UserSendRequestScreen" component={UserSendRequestScreen}
                options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: 'blue' },
                    headerTintColor: '#fff',
                }} />

        <Stack.Screen name="UserViewRequestScreen" component={UserViewRequestScreen}
                options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: 'blue' },
                    headerTintColor: '#fff',
                }} />

        </Stack.Navigator>
    );
};
