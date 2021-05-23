import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import Overview from '../components/Overview/Overview';
import NFCScreen from '../components/NFC/NFCScreen';
import GPSScreen from '../components/GPS/GPSScreen';
import CameraScreen from '../components/Camera/CameraScreen';
import GyroscopeScreen from '../components/Gyroscope/GyroscopeScreen';
import LoginScreen from '../components/Login/LoginScreen';
import RegisterScreen from '../components/Login/Register';


const LoginNavigator = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
});



export default createAppContainer(LoginNavigator);