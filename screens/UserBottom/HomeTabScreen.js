import UserHomeScreen from '../../Screens/UserHomeScreen/UserHomeScreen'
import UserReceiveFeedbackScreen from '../../Screens/UserReceiveFeedbackScreen/UserReceiveFeedbackScreen'
import UserDashbord from '../../Screens/UserDashbord/UserDashbord'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthNav() {
    return (
        <Stack.Navigator
            initialRouteName="UserHomeScreen"

        >
            <Stack.Screen name="UserHomeScreen" component={UserHomeScreen}
                options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: 'blue' },
                    headerTintColor: '#fff',
                }} />

            <Stack.Screen name="UserReceiveFeedbackScreen" component={UserReceiveFeedbackScreen}
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
