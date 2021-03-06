import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginScreen from '../components/Login/LoginScreen';
import RegisterScreen from '../components/Login/Register';

// navigator for login/register
const LoginNavigator = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
});



export default createAppContainer(LoginNavigator);