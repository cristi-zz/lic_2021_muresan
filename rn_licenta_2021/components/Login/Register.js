import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import firebase from '../../firebase/firebase_config';
import {COLORS} from '../Colors/Colors';


const RegisterScreen = props => {
    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const onRegisterPress = () => {
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => props.navigation.navigate('Login'))
        .catch(error => console.log(error))
        ToastAndroid.showWithGravityAndOffset(
            "Account created succesfully!",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
          );
    };


    return (
        <View style={styles.screen}>
            <View >
                <TextInput onChangeText={onChangeEmail} value={email} style={styles.textinput} placeholder={"E-mail"} />
                <TextInput onChangeText={onChangePassword} value={password} style={styles.textinput} placeholder={"Password"} />
                <TouchableOpacity onPress={onRegisterPress} style={styles.button}>
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


RegisterScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Register',
        headerStyle: {
            backgroundColor: COLORS.appBar
        }
    };
};

const styles = StyleSheet.create({
    screenText: {
        flex: 1,
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textinput: {
        width: 200,
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        margin: 5

    }, button: {
        backgroundColor: COLORS.enableButton,
        marginTop: 20,
        height: 48,
        width: 200,
        margin: 5,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    }
});

export default RegisterScreen;