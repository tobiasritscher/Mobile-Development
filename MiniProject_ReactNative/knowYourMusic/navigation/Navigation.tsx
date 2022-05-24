import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import DetailsScreen from '../screens/DetailsScreen'
import ResultsScreen from '../screens/ResultsScreen'
import SearchScreen from '../screens/SearchScreen'


const Stack = createStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SearchScreen">
                <Stack.Screen name="SearchScreen" component={SearchScreen} />
                <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
                <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;

