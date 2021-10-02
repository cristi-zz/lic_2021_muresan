import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useContext} from 'react';
import {AppLoading} from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import MainNavigation from './navigator/MainNavigator'
import {OverviewContext, OverviewContextSetter} from './components/Overview/Context'
import firebase, { database } from './firebase/firebase_config';
import LoginNavigator from './navigator/LoginNavigator';

export default function App() {
  const [databaseData, setDatabaseData] = useState(false);

  const Application = () => {
    // tried using context provider for keeping the login state, but is not done
    return databaseData ? <MainNavigation /> : <LoginNavigator />
  }

  return (
    <OverviewContext.Provider value={databaseData}>
      <OverviewContextSetter.Provider value={setDatabaseData}>
        <Application />
      </OverviewContextSetter.Provider>
    </OverviewContext.Provider>
  );
}

