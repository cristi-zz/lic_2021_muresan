import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {AppLoading} from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import MainNavigation from './navigator/MainNavigator'
import {OverviewContext, OverviewContextSetter} from './components/Overview/Context'
import firebase, { database } from './firebase/firebase_config';

export default function App() {
  const [databaseData, setDatabaseData] = useState({nfc: false, bluetooth: false, gps: false, gyroscope: false});

  return (
    <OverviewContext.Provider value={databaseData}>
      <OverviewContextSetter.Provider value={setDatabaseData}>
      <MainNavigation />
      </OverviewContextSetter.Provider>
    </OverviewContext.Provider>
  );
}

