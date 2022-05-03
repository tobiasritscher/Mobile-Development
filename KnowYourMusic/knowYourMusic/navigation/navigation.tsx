import { createStackNavigator } from '@react-navigation/stack';

import DetailsScreen from '../screens/DetailsScreen'
import ResultsScreen from '../screens/ResultsScreen'
import SearchScreen from '../screens/SearchScreen'


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    );
}
