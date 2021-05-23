import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../HeaderButton';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import firebase from '../../firebase/firebase_config';


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
            backgroundColor: '#962CA8'
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
        backgroundColor: '#3F855B',
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