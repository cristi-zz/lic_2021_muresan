import react from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';
import LoginNavigator from './LoginNavigator';
import AppNavigator from './Navigator';

const MainNavigation = createSwitchNavigator({
    Login: LoginNavigator,
    App: AppNavigator
},
{
    initialRouteName: 'App'
});


export default createAppContainer(MainNavigation);
