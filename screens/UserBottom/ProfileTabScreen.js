import UserGetTaskScreen from '../../Screens/UserGetTaskScreen/UserGetTaskScreen'
import UserDashbord from '../../Screens/UserDashbord/UserDashbord'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthNav() {
    return (
        <Stack.Navigator
            initialRouteName="UserGetTaskScreen"
        >
            <Stack.Screen name="UserGetTaskScreen" component={UserGetTaskScreen}
                options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: 'blue' },
                    headerTintColor: '#fff',
                }} />

            <Stack.Screen name="UserDashbord" component={UserDashbord}
                options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: 'blue' },
                    headerTintColor: '#fff',
                }} />

        </Stack.Navigator>
    );
};
