import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable, TouchableHighlight, Switch, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../HeaderButton';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import DataEntry from '../Data/DataEntry'
import GPSDataEntry from './GPSDataEntry'
import RNLocation from 'react-native-location';

let color1 = '#3F855B';
let color2 = '#a83a32';

//distanceFilter - distanta minima in metrii intre vechea locatie si noua locatie pentru a se updata
RNLocation.configure({
    distanceFilter: 0
})

const GPSScreen = props => {
    const [color, setColor] = useState(color1);
    const [buttonText, setButtonText] = useState("Enable location");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    let location;
    const permissionHandler = async () => {

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
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        console.log(location);

    }

    const onPressTurnOn = () => {
        console.log("Merge turn on!");
        if (color === color1) {
            setColor(color2);
            setButtonText("Disable location");
        }
        else {
            setColor(color1);
            setButtonText("Enable location");
        }
        permissionHandler();



    };
    return (
        <View>
            <View style={styles.viewButton}>
                <Pressable onPress={onPressTurnOn} style={({ pressed }) => [{ backgroundColor: color }, styles.activateButton]}>
                    <Text style={styles.text}>{buttonText}</Text>
                    {/* //pressed ? color2 : color1 */}
                </Pressable>
            </View>
            <GPSDataEntry latitude={latitude} longitude={longitude} />
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