import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Switch } from 'react-native';

const FunctionalityTile = props => {
    const color1 = '#3F855B';
    const color2 = '#a83a32';
    const [isEnabled, setIsEnabled] = useState(false);
    const [active, setActive] = useState("Active");
    const [color, setColor] = useState(color1);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const onPressColor = () => {
        if (active === "Active") {
            setActive("Not active");
            setColor(color2);
        }
        else {
            setActive("Active");
            setColor(color1);
        }
    };
    return (
        <TouchableOpacity style={styles.gridItem} onPress={onPressColor}>
            <View style={[styles.tile, {backgroundColor: color}]}>
                <Text style={styles.textTitle}>{props.name}</Text>

                <View style={styles.container}>
                    <Text style={styles.activeText}>{active}</Text>
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
        backgroundColor: 'green',
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
        fontWeight: 'bold',
        color: 'white'
    },
    activeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
});

export default FunctionalityTile;