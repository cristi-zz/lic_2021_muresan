import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../HeaderButton';
import FunctionalityTile from './FunctionalityTile';
import firebase, { database } from '../../firebase/firebase_config';
import { OverviewContext, OverviewContextSetter } from '../Overview/Context';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';


const Overview = props => {
    const [databaseData, setDatabaseData] = useState({
        nfc: false,
        bluetooth: false,
        gps: false,
        gyroscope: false
    });

    const color1 = '#3F855B';
    const color2 = '#a83a32';

    const [activeText, setActiveText] = useState("Not active");

    let context = useContext(OverviewContext);
    const secondContext = useContext(OverviewContextSetter);
    const [colorNFC, setColorNFC] = useState(color2);
    const [colorBluetooth, setColorBlue] = useState(color2);
    const [colorGPS, setColorGPS] = useState(color2);
    const [colorGyroscope, setColorGyroscope] = useState(color2);

    useEffect(()=> {
        if(context.nfc){
            setColorNFC(color1);
        }else{
            setColorNFC(color2);
        }

        if(context.bluetooth){
            setColorBlue(color1);
        }else{
            setColorBlue(color2);
        }

        if(context.gps){
            setColorGPS(color1);
        }else{
            setColorGPS(color2);
        }

        if(context.gyroscope){
            setColorGyroscope(color1);
        }else{
            setColorGyroscope(color2);
        }

    }, [context]);


    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <FunctionalityTile name={'NFC'} state={context.nfc} color={colorNFC} />
                <FunctionalityTile name={"Bluetooth"} state={context.bluetooth} color={colorBluetooth} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <FunctionalityTile name={"Gyroscope"} state={context.gyroscope} color={colorGyroscope} />
                <FunctionalityTile name={"GPS"} state={context.gps} color={colorGPS} />
            </View>
        </View>
    );
};



Overview.navigationOptions = (navData) => {
    const onPressSignOut = () => {
        navData.navigation.navigate({ routeName: "Login" });
    };

    return {
        headerTitle: 'Overview functionalities',
        headerStyle: {
            backgroundColor: '#962CA8'
        },
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item title="menu" iconName="ios-menu" onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item title="signOut" iconName="log-out-outline" onPress={onPressSignOut} />
        </HeaderButtons>

    };
};
const styles = StyleSheet.create({
    screenText: {
        //flex: 1,
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center'
    }
});
export default Overview;