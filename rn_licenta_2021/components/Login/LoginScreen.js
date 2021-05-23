import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import firebase from '../../firebase/firebase_config';



const LoginScreen = props => {
    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    
    const onLoginPress = () => {
        firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => props.navigation.navigate({routeName: 'App'}))
        .catch(error => console.log(error))
        ToastAndroid.showWithGravityAndOffset(
            "Welcome!",
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
                <TextInput onChangeText={onChangePassword} secureTextEntry={true} value={password} style={styles.textinput} placeholder={"Password"} />
                <TouchableOpacity onPress={onLoginPress} style={styles.button}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <View style={styles.signUpSection}>
                    <Text>You don't have an account?
                        <Text style={styles.signUp}
                            onPress={() => { props.navigation.navigate({ routeName: 'Register' }) }}> Sign Up.</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};


LoginScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Login',
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
    },
    signUpSection: {
        marginTop: 5
    },
    signUp: {
        fontSize: 16,
        color: '#3F855B'
    }
});

export default LoginScreen;