import React, { useState, useEffect, useContext, useReducer } from 'react';
import { View, Text, StyleSheet, Button, Pressable, Dimensions, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../HeaderButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BleManager, Device } from 'react-native-ble-plx';
import {OverviewContext, OverviewContextSetter} from '../Overview/Context';
import {COLORS} from '../Colors/Colors';

let color1 = COLORS.enableButton;
let color2 = COLORS.disableButton;

export const manager = new BleManager();

const BluetoothScreen = props => {
    const [color, setColor] = useState(color1);
    const [buttonText, setButtonText] = useState("Enable bluetooth")
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [blueDevices, setBlueDevice] = useState([]);
    const state = useContext(OverviewContext);
    const setState = useContext(OverviewContextSetter);
    const [scannedDevices, dispatch] = useReducer(reducer, []);

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

    const scanDevices = () => {
        manager.startDeviceScan(null, null, (error, scannedDevice) => {
            if(error){
                alert(error.reason.toString());
            }

            if(scannedDevice){
                dispatch({type: 'add', device: scannedDevice});
            }

        });
        setTimeout(() => {
            manager.stopDeviceScan();
        }, 5000);
    }
    const onPressTurnOn = () => {

        console.log("Merge turn on!");
        let items = {...state};
        if (color === color1) {
            setColor(color2);
            setButtonText("Disable bluetooth");
            items.bluetooth = true;
            setState(items);
            scanDevices();
        }
        else {
            setColor(color1);
            setButtonText("Enable bluetooth");
            items.bluetooth = false;
            setState(items);
            manager.stopDeviceScan();
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
                {scannedDevices.map((blueDevice) => { return (<View style={styles.bluetoothDeviceEntry}><Text>{scannedDevices.name}</Text></View>); })}
            </ScrollView>
        </View>
    );
};

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
        backgroundColor: COLORS.enableButton,
        width: 60
    },
});

export default BluetoothScreen;