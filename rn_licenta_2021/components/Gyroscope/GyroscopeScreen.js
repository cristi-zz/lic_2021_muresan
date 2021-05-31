import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable, TouchableHighlight, Switch, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../HeaderButton';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import DataEntry from '../Data/DataEntry'


let color1 = '#3F855B';
let color2 = '#7efcb1';
let color3 = '#a83a32';
let color4 = '#ab1f15';


const GyroscopeScreen = props => {
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
            <View style={styles.axisContainer}>
                <View style={styles.axisTile}>
                    <Text style={styles.dataTitleText}>X - Axis</Text>
                    <Text style={styles.axisValue}> 451461741 </Text>
                </View>
                <View style={styles.axisTile}>
                    <Text style={styles.dataTitleText}>Y - Axis</Text>
                    <Text style={styles.axisValue}> 451461741 </Text>
                </View>
                <View style={styles.axisTile}>
                    <Text style={styles.dataTitleText}>Z - Axis</Text>
                    <Text style={styles.axisValue}> 451461741 </Text>
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