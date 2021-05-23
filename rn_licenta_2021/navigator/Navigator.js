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
import App from '../App';

const OverviewNavigator = createStackNavigator({
    Overview: Overview
});

const NFCNavigator = createStackNavigator({
    NFC: NFCScreen
});



const AppNavigator = createDrawerNavigator({
    Overview: OverviewNavigator,
    NFC: NFCNavigator,
    GPS: GPSScreen,
    Camera: CameraScreen,
    Gyroscope: GyroscopeScreen
},
    {
        contentOptions: {
            activeTintColor: '#3F855B',
            itemStyle: {
                marginVertical: 5
                //marginTop: 40
            },
            itemsContainerStyle: {
                marginTop: 50
            }
        },
        
    });

export default createAppContainer(AppNavigator);