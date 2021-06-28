import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Pressable, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../HeaderButton';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
import {COLORS} from '../Colors/Colors';


const GalleryScreen = props => {
    let uri = props.uri;

    return (
        <View style={styles.imageContainer}>
            <Image source={{uri: uri}} style={styles.image} />
        </View>
    );
};


GalleryScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Gallery',
        headerStyle: {
            backgroundColor: COLORS.enableButton
        }
    };
};

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        flex: 1,
        alignSelf: 'center'
    },
    imageContainer: {
        margin: 15,
        borderWidth: 2,
        flex: 0.6,
        justifyContent: 'center',
        //alignItems: 'center'
        //padding: 15
    },
    photoOption: {
        flexDirection: 'row',
        backgroundColor: '#3F855B'
    },
    deleteButton: {
        fontSize: 24
    }
});

export default GalleryScreen;