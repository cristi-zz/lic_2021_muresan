import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable, TouchableHighlight, Switch, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Header } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButton } from 'react-navigation-header-buttons';
import Colors from '../Colors/Colors';
import { database } from '../../firebase/firebase_config';
import * as Location from 'expo-location';
import {COLORS} from '../Colors/Colors';

// component for the gps functionality
const GPSDataEntry = props => {
    const [locations, setLocations] = useState([]);

    //useEffect - used here to get the saved locations from the database
    useEffect(() => {
        (async () => {
            let location = await database.collection('location').get().then((val) => {
                setLocations(val.docs);
                console.log(locations);

            })
            //console.log(location);
        })();
    }, []);

    // used to save the location into database
    const saveButtonHandler = () => {
        (async () => {
            let geo = await Location.reverseGeocodeAsync(props.coords);
            await database.collection('location').add({
                country: "" + geo[0].country,
                city: "" + geo[0].city,
                street: "" + geo[0].street
            }).then(() => {
                alert('Location added succesfully!');
            })

            let location = await database.collection('location').get().then((val) => {
                setLocations(val.docs);
                console.log(locations);

            })

        })();
    }

    //deletes every location from the database
    const clearAllHandler = () => {
        try{
                database.collection('location'). get().then(snapshot => {
            snapshot.docs.forEach(element => {
                console.log(element.id);
                database.collection('location').doc("" + element.id).delete();
            });
        });
        setLocations([]);
    }catch(e){
        alert(e.toString());
    }
    }
    return (
        <View>
            <ScrollView>
            <View style={styles.dataEntry}>
                <View style={styles.title}>
                    <Ionicons name='location-outline' size={32} color="white" />
                    <Text style={styles.titleText}>Current location</Text>
                </View>
                <View style={styles.content}>
                    <Text> Longitudine: {props.coords.longitude}</Text>
                    <Text> Latitudine: {props.coords.latitude}</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={saveButtonHandler} style={styles.button}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={clearAllHandler} style={styles.button}>
                        <Text>Clear all</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.tableHeader}>
                <Text> Country </Text>
                <Text> City </Text>
                <Text> Street </Text>
            </View>
            
            <View>
                {locations.map((location) => {
                    return (
                        <View style={styles.tableElement}>
                            <Text>{location.data().country}</Text>
                            <Text>{location.data().city}</Text>
                            <Text>{location.data().street}</Text>
                        </View>);
                })}
                </View>
            </ScrollView>

        </View>
    );

};

const styles = StyleSheet.create({
    dataEntry: {
        margin: 15,
        backgroundColor: COLORS.secondaryColor,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 3,
        borderWidth: 2
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 15
    },
    content: {
        justifyContent: 'space-evenly',
        height: 80,
        //flexDirection:'column',
        margin: 10
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    button: {
        elevation: 3,
        borderRadius: 10,
        padding: 15,
        backgroundColor: COLORS.enableButton
    },
    tableHeader: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    tableElement: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderTopWidth: 1,
        borderTopColor: 'gray',
        margin: 10

    }
});
export default GPSDataEntry;