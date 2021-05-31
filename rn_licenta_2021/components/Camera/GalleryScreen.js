import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Pressable, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../HeaderButton';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';
import { Camera } from 'expo-camera';


const GalleryScreen = props => {

    return (
        <View>
            <Text> Haidaaaa</Text>
        </View>
    );
};


GalleryScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Gallery',
        headerStyle: {
            backgroundColor: '#962CA8'
        }
    };
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        backgroundColor: '#d1c8b0',
        margin: 20,
        height: 200
    },
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        //flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    cameraButton: {
        backgroundColor: '#70db9b',
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
        //flex: 1,
        padding: 15
    },
    titleText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    functionalityContainer: {
        flexDirection: 'column',
        marginTop: 30
    }
});

export default GalleryScreen;