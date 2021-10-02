import react from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import LoginNavigator from './LoginNavigator';
import AppNavigator from './Navigator';

// navigator between login state and main functionalities
const MainNavigation = createSwitchNavigator({
    Login: LoginNavigator,
    App: AppNavigator
},
{
    initialRouteName: 'App'
});


export default createAppContainer(MainNavigation);
