import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Dimensions, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../HeaderButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BleManager } from 'react-native-ble-plx';
import {OverviewContext, OverviewContextSetter} from '../Overview/Context';


let color1 = '#3F855B';
let color2 = '#a83a32';

export const manager = new BleManager();

const BluetoothScreen = props => {
    const [color, setColor] = useState(color1);
    const [buttonText, setButtonText] = useState("Enable bluetooth")
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [blueDevices, setBlueDevice] = useState([]);
    const state = useContext(OverviewContext);
    const setState = useContext(OverviewContextSetter);

    const onPressTurnOn = () => {

        console.log("Merge turn on!");
        let items = {...state};
        if (color === color1) {
            setColor(color2);
            setButtonText("Disable bluetooth");
            items.bluetooth = true;
            setState(items);
        }
        else {
            setColor(color1);
            setButtonText("Enable bluetooth");
            items.bluetooth = false;
            setState(items);
        }
        if (color === color2) {
            manager.stopDeviceScan();
        }
        else {
            manager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    // Handle error (scanning will be stopped automatically)
                    console.log(error);
                    return
                }
                console.log(device);
                // Check if it is a device you are looking for based on advertisement data
                // or other criteria.
                if (device) {
                    setBlueDevice(currentDevices => [...currentDevices, device.name])
                }
                else {
                    // Stop scanning as it's not necessary if you are scanning for one device.
                    console.log("Nu gasim nimic");
                    manager.stopDeviceScan();
                    console.log("Nu gasim nimic");

                    // Proceed with connection.
                }
            });
        }
    };


    const addBlueDevice = () => {
        setBlueDevice(currentDevices => [...currentDevices, "blana"]);
    }
    const clearBlueDevices = () => {
        setBlueDevice(currentDevices => []);
    };

    return (
        <View>
            <View style={styles.viewButton}>
                <Pressable onPress={onPressTurnOn} style={({ pressed }) => [{ backgroundColor: color }, styles.activateButton]}>
                    <Text style={styles.text}>{buttonText}</Text>
                    {/* //pressed ? color2 : color1 */}
                </Pressable>
            </View>
            <TouchableOpacity onPress={addBlueDevice} style={styles.bluetoothContainer}>
                <Text style={styles.bluetoothDevicesText}>Find nearby devices</Text>
                <Pressable onPress={clearBlueDevices} style={styles.clearButton}>
                    <Text style={styles.bluetoothDevicesText} >Clear</Text>
                </Pressable>
            </TouchableOpacity>
            <ScrollView>
                {blueDevices.map((blueDevice) => { return (<View style={styles.bluetoothDeviceEntry}><Text>{blueDevice}</Text></View>); })}
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