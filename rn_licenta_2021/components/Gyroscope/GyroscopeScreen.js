import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, Pressable, TouchableHighlight, Switch, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../HeaderButton';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import DataEntry from '../Data/DataEntry';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { Gyroscope } from 'expo-sensors';
import {OverviewContext, OverviewContextSetter} from '../Overview/Context';

let color1 = '#3F855B';
let color2 = '#a83a32';



const GyroscopeScreen = props => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const state = useContext(OverviewContext);
    const setState = useContext(OverviewContextSetter);

    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
      });
      const [subscription, setSubscription] = useState(null);
    
      const _slow = () => {
        Gyroscope.setUpdateInterval(1000);
      };
    
      const _fast = () => {
        Gyroscope.setUpdateInterval(400);
      };
    
      const _subscribe = () => {
        setSubscription(
          Gyroscope.addListener(gyroscopeData => {
            setData(gyroscopeData);
          })
        );
      };
    
      const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
      };

      const { x, y, z } = data;

    const onPressTurnOn = () => {
        console.log("Merge turn on!");
        toggleSwitch();
        let items = {...state};
        _fast;
        // subscription ? _unsubscribe : _subscribe;
        // console.log(subscription);
        if(isEnabled){
            _subscribe();
            items.gyroscope = true;
            setState(items);
        }
        else{
            _unsubscribe();
            Gyroscope.removeAllListeners();
            items.gyroscope = false;
            setState(items);
        }


    };
    return (
        <View>
            <View style={styles.viewButton}>
                <Pressable onPress={onPressTurnOn} style={({ pressed }) => [{ backgroundColor: subscription ? color2 : color1 }, styles.activateButton]}>
                    <Text style={styles.text}>{subscription ? 'Stop reading values' : 'Read sensor values'}</Text>
                    {/* //pressed ? color2 : color1 */}
                </Pressable>
            </View>
            <View style={styles.axisContainer}>
                <View style={styles.axisTile}>
                    <Text style={styles.dataTitleText}>X - Axis</Text>
                    <Text style={styles.axisValue}> {x} </Text>
                </View>
                <View style={styles.axisTile}>
                    <Text style={styles.dataTitleText}>Y - Axis</Text>
                    <Text style={styles.axisValue}> {y} </Text>
                </View>
                <View style={styles.axisTile}>
                    <Text style={styles.dataTitleText}>Z - Axis</Text>
                    <Text style={styles.axisValue}> {z}</Text>
                </View>
            </View>
        </View>
    );
};

GyroscopeScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Gyroscope',
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
    },
    axisTile: {
        backgroundColor: '#70db9b',
        margin: 20,
        height: 100,
        marginTop: 70,
        flex: 1,
        borderRadius: 20,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowRadius: 10,
        elevation: 10
    },
    axisContainer: {
        flexDirection: 'row'
    },
    axisValue: {
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 10
    }
});

export default GyroscopeScreen;