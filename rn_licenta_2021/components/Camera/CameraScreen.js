import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Pressable, Image, Modal, Alert, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../HeaderButton';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';
import { NavigationActions } from 'react-navigation';
import { RNCamera } from 'react-native-camera';
import { v4 as uuidv4 } from 'uuid';
import GalleryScreen from './GalleryScreen';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-ionicons';
import {COLORS} from '../Colors/Colors';


// Camera functionality
const CameraScreen = props => {
    // useState - state hook - check ReactNative documentation
    const [cameraMode, setCameraMode] = useState(false);
    const [galleryMode, setGalleryMode] = useState(false);
    const [imageArray, setImageArray] = useState([]);

    // used to add photos to the array for printing purposes
    const addPhoto = (data) => {
        setImageArray(currentImages => [...currentImages, { key: uuidv4(), value: data.uri }])
    }

    let camera;

    // used to take a picture for the camera functionality
    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync();
            alert('Success!');
            addPhoto(data);
            console.log(imageArray);
        }
    };


    return (
        <View>
            <View style={styles.functionalityContainer}>
                <Pressable style={styles.cameraButton} onPress={() => { setCameraMode(true) }} >
                    <Text style={styles.titleText}>Open camera</Text>
                </Pressable>

                <Pressable style={styles.cameraButton} onPress={() => { setGalleryMode(true) }} >
                    <Text style={styles.titleText}>Open gallery</Text>
                </Pressable>
            </View>
            <Modal visible={cameraMode}>
                <View style={styles.containerCamera}>
                    <RNCamera ref={(ref) => { camera = ref; }}
                        style={{ flex: 1, alignItems: 'center' }}
                    />
                    <Button style={styles.test} title="Take photo" color={COLORS.enableButton} onPress={takePicture} />
                    <Button title="Close" color= {COLORS.disableButton} onPress={() => { setCameraMode(false) }} />
                </View>
            </Modal>
            <Modal visible={galleryMode}>
                <Button color={COLORS.enableButton} title={"Go back"} onPress={() => setGalleryMode(false)} />
                <ScrollView>
                    {imageArray.map((image) => {
                        return (
                            <View>
                                <GalleryScreen uri={image.value} key={image.key} />
                                <Button raised={true} title={"Delete"} color={COLORS.disableButton} onPress={() => {
                                    const newArray = imageArray.filter((item) => item.key !== image.key);
                                    setImageArray(newArray);
                                    var path = image.value.split("///").pop();
                                    RNFetchBlob.fs
                                        .unlink(path)
                                        .then(() => { alert("Image deleted!")})
                                        .catch(err => {
                                            alert(err);
                                        });
                                }} />
                            </View>);
                    })}
                </ScrollView>

            </Modal>
        </View>
    );
};

// check navigation options in the documentation for more info
CameraScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Camera',
        headerStyle: {
            backgroundColor: COLORS.appBar
        },
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
            <Item title="menu" iconName="ios-menu" onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>
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
        backgroundColor: COLORS.enableButton,
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
    },
    containerCamera: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    test: {
        position:'absolute',
        alignContent: 'center',
        alignSelf: 'center'
    }
});

export default CameraScreen;