import React, { useState, useEffect, useContext, useReducer } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Dimensions, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../HeaderButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BleManager, Device } from 'react-native-ble-plx';
import {OverviewContext, OverviewContextSetter} from '../Overview/Context';
import {COLORS} from '../Colors/Colors';

// colors used for the activation button, depending on state
let color1 = COLORS.enableButton;
let color2 = COLORS.disableButton;

export const manager = new BleManager();

// Bluetooth functionality
const BluetoothScreen = props => {
    const [color, setColor] = useState(color1);
    const [buttonText, setButtonText] = useState("Enable bluetooth")
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [blueDevices, setBlueDevice] = useState([]);


    // reducer - add (checks if device was already added, if not add it) and clearall (cleans the list of devices)
    const reducer = ( state, action ) => {
        switch(action.type){
            case 'add': 
                const device = action.device;
                if(device && !state.find((dev) => dev.id === device.id)) {
                    return [...state, device];
                }
                return state;
            case 'clearAll':
                return [];
            default:
                return state;
        }
    };
    const [scannedDevices, dispatch] = useReducer(reducer, []);

    // used for scanning the devices, for more info check the used library (react-native-ble-plx)
    const scanDevices = () => {
        manager.startDeviceScan(null, null, (error, scannedDevice) => {
            if(error){
                alert(error.reason.toString());
            }

            if(scannedDevice){
                if(scannedDevice.name !== null){
                    dispatch({type: 'add', device: scannedDevice});
                    //console.log(scannedDevice);
                }
                
            }

        });
        setTimeout(() => {
            manager.stopDeviceScan();
            setColor(color1);
            setButtonText("Enable bluetooth");
        }, 5000);
    }
    const onPressTurnOn = () => {

        console.log("Merge turn on!");
        if (color === color1) {
            setColor(color2);
            setButtonText("Disable bluetooth");
            scanDevices();
        }
        else {
            setColor(color1);
            setButtonText("Enable bluetooth");
            manager.stopDeviceScan();
        }
    };


    const addBlueDevice = () => {
        setBlueDevice(currentDevices => [...currentDevices, "test"]);
    }
    const clearBlueDevices = () => {
        dispatch({type: 'clearAll'});
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
            <View style={styles.bluetoothTitle}>
                <Text style={styles.bluetoothTitleText}>Device name</Text>
                <Text style={styles.bluetoothTitleText}>RSSI</Text>
            </View>
            <ScrollView>
                {scannedDevices.map((blueDevice) => { return (<View style={styles.bluetoothDeviceEntry}>
                    <Text>{blueDevice.name}</Text>
                    <Text>{blueDevice.rssi}</Text></View>); })}
            </ScrollView>
        </View>
    );
};

// check navigation options in the documentation for more info
BluetoothScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Bluetooth',
        headerStyle: {
            backgroundColor: COLORS.appBar
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
        backgroundColor: COLORS.secondaryColor,
        width: Dimensions.get('window').width,
        height: 50,
        marginTop: 70,
        elevation: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'space-between'
    },
    bluetoothTitle: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth: 2,
        borderBottomColor: 'gray'
    },
    bluetoothTitleText: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 14,
    },
    bluetoothDevicesText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    bluetoothDeviceEntry: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    clearButton: {
        justifyContent: 'center',
        marginLeft: 100,
        backgroundColor: COLORS.enableButton,
        width: 60
    },
});

export default BluetoothScreen;