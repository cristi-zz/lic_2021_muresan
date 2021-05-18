import React from 'react';
import { View, Text, StyleSheet, Button, FlatList} from 'react-native';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../HeaderButton';
import NFCScreen from '../NFC/NFCScreen';
import FunctionalityTile from './FunctionalityTile'

const data = [
    {
      name: 'NFC',
      id: 1
    },
    {
      name: 'Camera',
      id: 2
    },
{
    name: 'GPS',
    id: 3
},
{
    name: 'Gyroscope',
    id: 4
}];


const renderGridItem = itemData => {
    return (
        <FunctionalityTile name={itemData.item.name}/>
    );
};
const Overview = props => {
    return (
        // <View>
        // <Text style={styles.screenText}>OverviewScreen</Text>
        <FlatList  keyExtractor={(item, index) => item.id}
        data={data}
        renderItem={renderGridItem}
        numColumns={2} />
        //</View>
    );
};


Overview.navigationOptions = (navData) => {
    return {
    headerTitle: 'Overview functionalities',
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
        //flex: 1,
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center'
    }
});
export default Overview;