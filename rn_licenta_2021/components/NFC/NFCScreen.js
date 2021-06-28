import React, { useState, useContext, useCallback, useRef, useMemo } from 'react';
import { View, Image, Text, StyleSheet, Button, Pressable, TouchableHighlight, Switch, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../HeaderButton';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import DataEntry from '../Data/DataEntry'
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import firebase from '../../firebase/firebase_config';
import { OverviewContext, OverviewContextSetter } from '../Overview/Context';
import Modal from 'react-native-modal';
import {COLORS} from '../Colors/Colors';
// import {CirclesLoader, PulseLoader, TextLoader, ColorDotsLoader} from 'react-native-indicator';


let color1 = COLORS.enableButton;
let color2 = COLORS.disableButton;



const NFCScreen = props => {
    const [nfcReadings, setNFCReading] = useState([]);
    const [color, setColor] = useState(color1);
    const [test, setTest] = useState("");
    const [buttonText, setButtonText] = useState("Enable NFC")
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const overview = firebase.firestore().collection('overview');

    const state = useContext(OverviewContext);
    const setNFCState = useContext(OverviewContextSetter);
    const nfc = new Nfc();
    const onPressTurnOn = () => {
        let items = { ...state };
        console.log("Merge turn on!");
        if (color === color1) {
            setColor(color2);
            setButtonText("Disable NFC");
            items.nfc = true;
            setNFCState(items);
            console.log('IS ENABLED??? Answer: ' + nfc.checkEnabled());
            setVisible(true);
            
            nfc.initNfc().catch(err => {
                //setVisible(false);
                alert('Init ' + err.toString());
            })


            nfc.readNdef().then(tag => {
                addNFCReading(tag.toString());
            }).catch(err => {
               // alert(err.toString());
            })

        }
        else {
            setColor(color1);
            setButtonText("Enable NFC");
            items.nfc = false;
            setNFCState(items);
        }
       
    };


    let date = new Date().getDate(); //To get the Current Date
    let month = new Date().getMonth() + 1; //To get the Current Month
    let year = new Date().getFullYear(); //To get the Current Year
    let hours = new Date().getHours(); //To get the Current Hours
    let min = new Date().getMinutes(); //To get the Current Minutes
    let dateTime = hours + ':' + min.toString().padStart(2, '0') + '  ' + date + '/' + month + '/' + year;

    const addNFCReading = (val) => {
        setNFCReading(currentReadings => [...currentReadings, val + '   ' + dateTime.toString()]);
    }
    const clearNFCReadings = () => {
        setNFCReading(currentReadings => []);
    };

    const [visible, setVisible] = useState(false);

    return (

        <View>
            <View style={styles.viewButton}>
                <Pressable onPress={onPressTurnOn} style={styles.activateButton}>
                    <Text style={styles.text}>{buttonText}</Text>
                    {/* //pressed ? color2 : color1 */}
                </Pressable>
            </View>
            <Modal isVisible={visible}>
                <View style={styles.modal}>
                    <Image style={styles.nfcImage} source={require('./nfc-icon.png')} />
                    <Text>Scanning in progress...</Text>
                    {/* <ColorDotsLoader /> */}
                    <Button style={styles.cancelButton} onPress={() => { setVisible(false) }} title='Cancel' />
                </View>
            </Modal>
            <TouchableOpacity onPress={addNFCReading} style={styles.dataTitle}>
                <Text style={styles.dataTitleText}> NFC Readings</Text>
                <Pressable onPress={clearNFCReadings} style={styles.clearButton}>
                    <Text style={styles.dataTitleText}>Clear</Text>
                </Pressable>
            </TouchableOpacity>
            <ScrollView>
                {nfcReadings.map((nfc) => { return (<View style={styles.dataEntry}><Text style={styles.dataEntryText}>{nfc}</Text></View>); })}
            </ScrollView>
            <Text>{test}</Text>
        </View>




    );
};

NFCScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'NFC',
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

class Nfc {
    async initNfc() {
        try {
            await NfcManager.start();
        } catch (e) {
            throw e;
        }

    }

    async checkEnabled() {
        await NfcManager.isEnabled();
    }

    readNdef() {
        const cleanUp = () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
            NfcManager.setEventListener(NfcEvents.SessionClosed, null);
        }

        return new Promise((resolve) => {
            let tagFound = null;

            NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
                tagFound = tag;
                resolve(tagFound);
                NfcManager.setAlertMessage('Ndef tag found ' + tagFound.name);
                NfcManager.unregisterTagEvent().catch(() => 0);
            });

            NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
                cleanUp();
                if (!tagFound) {
                    resolve();
                } else {
                    console.log(tagFound.toString());
                }
            });

            NfcManager.registerTagEvent();
        });
    }
}

const styles = StyleSheet.create({
    screenText: {
        flex: 1,
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    activateButton: {
        // width: 100,
        // height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        margin: 10,
        backgroundColor: COLORS.enableButton
    },
    viewButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    dataTitle: {
        width: Dimensions.get('window').width,
        height: 50,
        backgroundColor: COLORS.secondaryColor,
        marginTop: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'space-between'
    },
    dataTitleText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    clearButton: {
        justifyContent: 'center',
        marginLeft: 100,
        backgroundColor: COLORS.enableButton,
        width: 60
    },
    dataEntry: {
        borderWidth: 3,
        margin: 1
    },
    dataEntryText: {
        marginLeft: 60
    },
    modal: {
        height: '30%',
        width: '70%',
        backgroundColor: 'white',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        padding: 20
    },
    nfcImage: {
        height: '40%',
        width: '40%'
    },
    cancelButton: {
        backgroundColor: COLORS.disableButton
    }
});

export default NFCScreen;