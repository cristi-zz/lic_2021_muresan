import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Switch } from 'react-native';
import {COLORS} from '../Colors/Colors';


const FunctionalityTile = props => {

    const onPressColor = () => {
        console.log("Am apasat!")
    };

    return (
        <TouchableOpacity style={styles.gridItem} onPress={onPressColor}>
            <View style={styles.tile}>
                <Text style={styles.textTitle}>{props.name}</Text>

                <View style={styles.container}>
                    <Text style={styles.activeText}>{props.value}</Text>
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
        backgroundColor: COLORS.enableButton,
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