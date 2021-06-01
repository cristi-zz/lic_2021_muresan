import React from 'react';
import { View, Text, StyleSheet, Button, Pressable, TouchableHighlight, Switch, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../HeaderButton';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import DataEntry from '../Data/DataEntry'
import GPSDataEntry from './GPSDataEntry'

let color1 = '#3F855B';
let color2 = '#7efcb1';
let color3 = '#a83a32';
let color4 = '#ab1f15';

const GPSScreen = props => {
    const onPressTurnOn = () => {
        console.log("Merge turn on!");
    };
    const onPressTurnOff = () => {
        console.log("Merge turn off!");
    };
    return (
        <View>
            <View style={styles.viewButton}>
                <Pressable onPress={onPressTurnOn} style={({ pressed }) => [{ backgroundColor: pressed ? color2 : color1 }, styles.activateButton]}>
                    <Text style={styles.text}>Turn On</Text>
                </Pressable>
                <Pressable onPress={onPressTurnOff} style={({ pressed }) => [{ backgroundColor: pressed ? color3 : color4 }, styles.activateButton]}>
                    <Text style={styles.text}>Turn Off</Text>
                </Pressable>
            </View>
            <GPSDataEntry />
        </View>
    );
};
GPSScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'GPS',
        headerStyle: {
            backgroundColor: '#962CA8'
        },
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item title="menu" iconName="ios-menu" onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    screenText: {
        flex: 1,
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    activateButton: {
        // width: 100,
        // height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        margin: 10
    },
    viewButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    dataTitle: {
        width: Dimensions.get('window').width,
        height: 50,
        backgroundColor: '#3F855B',
        marginTop: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'space-between'
    },
    dataTitleText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    clearButton: {
        justifyContent: 'center',
        marginLeft: 100,
        backgroundColor: '#962CA8',
        width: 60
    },
    dataEntry: {
        borderWidth: 3,
        margin: 1
    },
    dataEntryText: {
        marginLeft: 60
    }
});

export default GPSScreen;