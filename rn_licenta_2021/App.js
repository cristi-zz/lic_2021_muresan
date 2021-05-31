import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {AppLoading} from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import MainNavigation from './navigator/MainNavigator'

export default function App() {
  return (
      <MainNavigation />
  );
}

