import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../HeaderButton';

const NFCScreen = props => {
    return (
        <Text style={styles.screenText} >NFCScreen</Text>
    );
};

NFCScreen.navigationOptions = (navData) => {
    return {
    headerTitle: 'NFC',
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
    }
});

export default NFCScreen;