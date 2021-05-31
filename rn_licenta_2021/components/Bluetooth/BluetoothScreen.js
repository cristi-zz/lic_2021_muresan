import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Dimensions, ScrollView} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../HeaderButton';
import { TouchableOpacity } from 'react-native-gesture-handler';


let color1 = '#3F855B';
let color2 = '#7efcb1';
let color3 = '#a83a32';
let color4 = '#ab1f15';

const BluetoothScreen = props => {
    const onPressTurnOn = () => {
        console.log("Merge turn on!");
    };

    const onPressTurnOff = () => {
        console.log("Merge turn off!");
    };
    const [blueDevices, setBlueDevice] = useState([]);

    const addBlueDevice = () => {
        setBlueDevice(currentDevices => [...currentDevices, "blana"]);
    }
    const clearBlueDevices = () => {
        setBlueDevice(currentDevices => []);
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
            <TouchableOpacity onPress={addBlueDevice} style={styles.bluetoothContainer}>
                <Text style={styles.bluetoothDevicesText}>Find nearby devices</Text>
                <Pressable onPress={clearBlueDevices} style={styles.clearButton}>
                    <Text style={styles.bluetoothDevicesText} >Clear</Text>
                </Pressable>
            </TouchableOpacity>
            <ScrollView>
                {blueDevices.map((blueDevice) => {return (<View style={styles.bluetoothDeviceEntry}><Text>{blueDevice}</Text></View>);})}
            </ScrollView>
        </View>
    );
};

BluetoothScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Bluetooth',
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
    bluetoothContainer: {
        backgroundColor: '#70db9b',
        width: Dimensions.get('window').width,
        height: 50,
        marginTop: 70,
        elevation: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'space-between'
    },
    bluetoothDevicesText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    bluetoothDeviceEntry: {
        backgroundColor: '#d1c8b0',
        padding: 10
    },
    clearButton: {
        justifyContent: 'center',
        marginLeft: 100,
        backgroundColor: '#962CA8',
        width: 60
    },
});

export default BluetoothScreen;