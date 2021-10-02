import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Pressable, TouchableHighlight, Switch, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../HeaderButton';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import DataEntry from '../Data/DataEntry'
import GPSDataEntry from './GPSDataEntry'
import RNLocation, { subscribeToLocationUpdates } from 'react-native-location';
import {OverviewContext, OverviewContextSetter} from '../Overview/Context';
import Colors from '../Colors/Colors';
import * as Location from 'expo-location';
import firebase, {database} from '../../firebase/firebase_config';
import {COLORS} from '../Colors/Colors';

let color1 = COLORS.enableButton;
let color2 = COLORS.disableButton;

//distanceFilter - distanta minima in metrii intre vechea locatie si noua locatie pentru a se updata
RNLocation.configure({
    distanceFilter: 0
})

// GPS component
const GPSScreen = props => {
    const [color, setColor] = useState(color1);
    const [buttonText, setButtonText] = useState("Enable location");
    const [coords, setCoords] = useState(0);
    const state = useContext(OverviewContext);
    const setState = useContext(OverviewContextSetter);

    // useEffect hook(read more in the documentation) - used here for asking permission when this view is reached
    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                alert('Permissions not granted');
                return;
            }
            console.log('Blanaaaa');
        })().catch(err => console.log(alert(err.toString())));
    }, []); // use of "[]" means it only happens once

    let location;
    const permissionHandler = async () => {
        console.log('ajunge aici');

        let permission = await RNLocation.checkPermission({
            android: {
                detail: 'fine'
            }
        });

        console.log(permission);
        if (!permission) {
            permission = await RNLocation.requestPermission({
                android: {
                    detail: 'fine',
                    rationale: {
                        title: 'Aplicatia are nevoie de access la locatia dumneavoastra.',
                        message: 'Folosim locatia pentru afisarea coordonatelor.',
                        buttonPositive: 'OK',
                        buttonNegative: 'Cancel'
                    }
                }
            });

            console.log(permission);

        }
        
        location = RNLocation.getLatestLocation({ timeout: 100 });
        setCoords(location.coords);
        console.log('aiciiii');
        console.log(location);

    }

    
    // used to get the current location
    const onPressTurnOn = () => {
        console.log("Merge turn on!");
        // let items = {...state};
        //items.gps
        //permissionHandler();
        (async()=>{
            let location = await Location.getCurrentPositionAsync({});
            setCoords(location.coords);
            let geo = await Location.reverseGeocodeAsync(location.coords);
            console.log(geo);
        })();
    };


    return (
        <View>
            <View style={styles.viewButton}>
                <Pressable onPress={onPressTurnOn} style={styles.activateButton}>
                    <Text style={styles.text}>{buttonText}</Text>
                    {/* //pressed ? color2 : color1 */}
                </Pressable>
            </View>
            <GPSDataEntry coords={coords} />
        </View>
    );
};
GPSScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'GPS',
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
        margin: 10,
        backgroundColor: COLORS.enableButton
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
        backgroundColor: COLORS.primaryColor,
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
        backgroundColor: COLORS.disableButton,
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