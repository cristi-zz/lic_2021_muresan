import React from 'react';
import { View, Text, StyleSheet, Button, Pressable, TouchableHighlight, Switch, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import {Header} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButton } from 'react-navigation-header-buttons';

const GPSDataEntry = props => {
    return (
        <View style={styles.dataEntry}>
            <Text>Hai sa o facem si pe asta</Text>
            <Text> Longitudine: {props.longitude}</Text>
            <Text> Latitudine: {props.latitude}</Text>
        </View>
    );

};

const styles = StyleSheet.create ({
    dataEntry:{
        margin: 15,
        backgroundColor: '#70db9b',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 3,
        borderWidth: 2,
    }
});
export default GPSDataEntry;