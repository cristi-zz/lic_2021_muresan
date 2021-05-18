import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Switch } from 'react-native';

const FunctionalityTile = props => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <TouchableOpacity style={styles.gridItem}>
            <View style={styles.tile}>
                <Text style={styles.textTitle}>{props.name}</Text>

                <View style={styles.container}>
                    <Text>OFF</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#962CA8" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    <Text>ON</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        margin: 30,
        height: 150,
        width: 100,
        // backgroundColor: '#70db9b'
    },
    tile: {
        flex: 1,
        backgroundColor: '#70db9b',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 3
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: 'row',
        
    },
    textTitle: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default FunctionalityTile;