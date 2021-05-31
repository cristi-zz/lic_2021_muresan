import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../HeaderButton';

const DataEntry = props => {
    let date = new Date().getDate(); //To get the Current Date
    let month = new Date().getMonth() + 1; //To get the Current Month
    let year = new Date().getFullYear(); //To get the Current Year
    let hours = new Date().getHours(); //To get the Current Hours
    let min = new Date().getMinutes(); //To get the Current Minutes
    let dateTime = hours + ':' + min + '  ' + date + '/' + month + '/' + year;
    // return (
    //     //{props.nfcReadings.map((nfc) => {return (<Text>{nfc} {dateTime}</Text>);})}
    //         /* <Text style={styles.screenText} >NFCScreen </Text> */
    // );
};


const styles = StyleSheet.create({
    screenText: {
        flex: 1,
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center'
    }
});

export default DataEntry;