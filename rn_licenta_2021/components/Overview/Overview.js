import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../HeaderButton';
import FunctionalityTile from './FunctionalityTile';
import firebase, { database } from '../../firebase/firebase_config';
import { OverviewContext, OverviewContextSetter } from '../Overview/Context';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
import {COLORS} from '../Colors/Colors';


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

    useEffect(()=> {
        // if(context.nfc){
        //     setColorNFC(color1);
        // }else{
        //     setColorNFC(color2);
        // }
    }, [context]);


    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <FunctionalityTile name={'NFC'} state={context.nfc} />
                <FunctionalityTile name={"Bluetooth"} state={context.bluetooth} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <FunctionalityTile name={"Gyroscope"} state={context.gyroscope} />
                <FunctionalityTile name={"GPS"} state={context.gps}/>
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
            backgroundColor: COLORS.appBar
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