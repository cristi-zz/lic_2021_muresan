import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Button, Pressable, TouchableHighlight, Switch, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../HeaderButton';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import DataEntry from '../Data/DataEntry';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { Gyroscope, Accelerometer } from 'expo-sensors';
import {OverviewContext, OverviewContextSetter} from '../Overview/Context';
import {COLORS} from '../Colors/Colors';

let color1 = COLORS.enableButton;
let color2 = COLORS.disableButton;



const GyroscopeScreen = props => {
    const [isEnabled, setIsEnabled] = useState(false);
    const state = useContext(OverviewContext);
    const setState = useContext(OverviewContextSetter);

    const [dataGyro, setDataGyro] = useState({
        x: 0,
        y: 0,
        z: 0,
      });

      const [dataAcc, setDataAcc] = useState({
        x: 0,
        y: 0,
        z: 0,
      });
      const [subscription, setSubscription] = useState(null);
      const [subscriptionAcc, setSubscriptionAcc] = useState(null);
    
      const _slow = () => {
        Gyroscope.setUpdateInterval(1000);
      };
    
      const _fast = () => {
        Gyroscope.setUpdateInterval(400);
        Accelerometer.setUpdateInterval(400);
      };
    
      const _subscribe = () => {
          console.log('blanaaa');
        setSubscription(
          Gyroscope.addListener(gyroscopeData => {
            setDataGyro(gyroscopeData);
          })
        );
        setSubscriptionAcc(Accelerometer.addListener(accData => {
            setDataAcc(accData);
        }));
      };
    
      const _unsubscribe = () => {
        subscription && subscription.remove();
        subscriptionAcc && subscriptionAcc.remove();
        setSubscriptionAcc(null);
        setSubscription(null);
      };

      const { xGyro, yGyro, zGyro } = dataGyro;
      const { xAcc, yAcc, zAcc } = dataAcc;

    useEffect(()=> {
        if(isEnabled){
                
            _subscribe();
        }
        else{
            console.log('else ' + isEnabled);
            _unsubscribe();
            Gyroscope.removeAllListeners();
            Accelerometer.removeAllListeners();
        }
    },[isEnabled]);
    const onPressTurnOn = () => {
        console.log("Merge turn on!");
        _fast;
        setIsEnabled(previousState => !previousState);
    };
    return (
        <View>
            <View style={styles.viewButton}>
                <Pressable onPress={onPressTurnOn} style={[{backgroundColor: isEnabled?color2:color1},styles.activateButton]}>
                    <Text style={styles.text}>{isEnabled ? 'Stop reading values' : 'Read sensor values'}</Text>
                    {/* //pressed ? color2 : color1 */}
                </Pressable>
            </View>
            <View style={{margin: 10}}>
            <Text style={styles.titleAcc}>Accelerometer</Text>
            <View style={styles.axisContainer}>
                <View style={styles.axisTile}>
                    <Text style={styles.dataTitleText}>X</Text>
                    <Text style={styles.axisValue}> {(dataAcc.x * 9.81).toFixed(3)} </Text>
                </View>
                <View style={styles.axisTile}>
                    <Text style={styles.dataTitleText}>Y</Text>
                    <Text style={styles.axisValue}> {(dataAcc.y * 9.81).toFixed(3)} </Text>
                </View>
                <View style={styles.axisTile}>
                    <Text style={styles.dataTitleText}>Z</Text>
                    <Text style={styles.axisValue}> {(dataAcc.z * 9.81).toFixed(3)}</Text>
                </View>
            </View>
            <Text style={styles.titleAcc}>Gyroscope</Text>
            <View style={styles.axisContainer}>
                <View style={styles.axisTile}>
                    <Text style={styles.dataTitleText}>X</Text>
                    <Text style={styles.axisValue}> {(dataGyro.x).toFixed(3)} </Text>
                </View>
                <View style={styles.axisTile}>
                    <Text style={styles.dataTitleText}>Y</Text>
                    <Text style={styles.axisValue}> {(dataGyro.y).toFixed(3)} </Text>
                </View>
                <View style={styles.axisTile}>
                    <Text style={styles.dataTitleText}>Z</Text>
                    <Text style={styles.axisValue}> {(dataGyro.z).toFixed(3)}</Text>
                </View>
            </View>
            </View>
        </View>
    );
};

GyroscopeScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Gyroscope',
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
        //backgroundColor: global.enableButton
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
        backgroundColor: COLORS.enableButton,
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
        backgroundColor: COLORS.secondaryColor,
        // margin: 20,
        height: 100,
        //marginTop: 70,
        flex: 1,
       // borderRadius: 20,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowRadius: 10,
        elevation: 10,
        borderWidth: 1
    },
    axisContainer: {
        flexDirection: 'row'
    },
    axisValue: {
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 10,
        flex: 1
    },
    titleAcc:{
        width: '100%',
        height: '10%',
        fontSize: 20,
        backgroundColor:COLORS.primaryColor,
        textAlign: 'center',
        marginTop: 30,
        color: 'white'
    }
});

export default GyroscopeScreen;