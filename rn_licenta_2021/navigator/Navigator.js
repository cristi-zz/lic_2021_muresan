import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

import Overview from '../components/Overview/Overview';
import NFCScreen from '../components/NFC/NFCScreen';
import GPSScreen from '../components/GPS/GPSScreen';
import CameraScreen from '../components/Camera/CameraScreen';
import GyroscopeScreen from '../components/Gyroscope/GyroscopeScreen';

const OverviewNavigator = createStackNavigator({
    Overview: Overview
});

const NFCNavigator = createStackNavigator({
    NFC: NFCScreen
});

const MainNavigator = createDrawerNavigator({
  Overview: OverviewNavigator,
  NFC: NFCNavigator,
  GPS: GPSScreen,
  Camera: CameraScreen,
  Gyroscope: GyroscopeScreen
},
{
    contentOptions: {
        activeTintColor: '#3F855B',
        itemStyle: { marginVertical: 15,
        marginTop: 40}

        }
    });

export default createAppContainer(MainNavigator);