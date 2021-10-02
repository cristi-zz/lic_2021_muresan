import React, { useState, useEffect } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../components/HeaderButton';

import Overview from '../components/Overview/Overview';
import NFCScreen from '../components/NFC/NFCScreen';
import GPSScreen from '../components/GPS/GPSScreen';
import CameraScreen from '../components/Camera/CameraScreen';
import GyroscopeScreen from '../components/Gyroscope/GyroscopeScreen';
import BluetoothScreen from '../components/Bluetooth/BluetoothScreen';
import GalleryScreen from '../components/Camera/GalleryScreen';


const OverviewNavigator = createStackNavigator({
    Overview: Overview
});

const NFCNavigator = createStackNavigator({
    NFC: NFCScreen
});

const GPSNavigator = createStackNavigator({
    GPS: GPSScreen
});

const CameraNavigator = createStackNavigator({
    Camera: CameraScreen,
    Gallery: GalleryScreen
},
{
    initialRouteName: 'Camera'
});

const GyroscopeNavigator = createStackNavigator({
    Gyroscope: GyroscopeScreen
});


const BluetoothNavigator = createStackNavigator({
    Bluetooth: BluetoothScreen
});

// navigator between functionalities(drawer navigator)
const AppNavigator = createDrawerNavigator({
    Overview: OverviewNavigator,
    NFC: NFCNavigator,
    GPS: GPSNavigator,
    Camera: CameraNavigator,
    Gyroscope: GyroscopeNavigator,
    Bluetooth: BluetoothNavigator
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
        }
        
    });

export default createAppContainer(AppNavigator);