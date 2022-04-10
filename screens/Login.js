import React, {useState} from "react";
import { View, Image, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert} from "react-native";
import {useFonts} from 'expo-font';
import AppLoading from "expo-app-loading";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../Firebase"


const Login = (props) =>{

    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    const navigation = useNavigation();

    const loginUser = (email, password) => {
        console.log("logging in", email)

        auth
        .signInWithEmailAndPassword(email, password)
        .then(authUser => {
            //console.log(authUser);

            if (authUser.user.emailVerified){
                console.log("Login successful, navigating to Home");
                navigation.replace("LoggedInApp", {user: authUser.user, userName: email, reRender: true})
            }else{
                Alert.alert("Login error", email + " is not yet verified")
            };

        })
        .catch( error => {
            Alert.alert("Login not successful", String(error))
        });

    };

    const registerNewUser = () => {
        navigation.navigate('RegisterUser')
    };

    const [fontsLoaded] = useFonts({
        Roboto_Regular: require('../assets/Fonts/Roboto-Regular.ttf'),
        Roboto_Thin: require('../assets/Fonts/Roboto-Thin.ttf'),
        Roboto_Medium: require('../assets/Fonts/Roboto-Medium.ttf')
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    }else{

        return (

            <View style={styles.loginWrapper}>

                <View style={styles.imageView}>
                    <Image
                        style={styles.image}
                        source={require('../assets/images/cloud-solid.png')}/>
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.titleText}>HittaMäklare</Text>
                </View>

                { /* Input wrapper */ }
                <KeyboardAvoidingView 
                    behavior = {Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.inputWrapper}>

                    {/* email input */}
                    <TextInput style={styles.emailInput} autoCapitalize='none' autoCorrect={false} placeholder={'Email'} value={email} onChangeText ={(text) => setemail(text)}/>

                    {/* Password input */}
                    <TextInput secureTextEntry={true} autoCapitalize='none' autoCorrect={false} style={styles.passwordInput} placeholder={'Password'} value={password} onChangeText={(text) => setPassword(text)}/>

                    {/* Login button */}
                    <TouchableOpacity onPress = {() => loginUser(email, password)}>
                        <View style={styles.loginButtonView}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView 
                    behavior = {Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.newUserButtonWrapper}>
                    {/* New user button */}
                    <TouchableOpacity onPress = {() => registerNewUser()} >
                        <View style={styles.newUserButtonView}>
                            <Text style={styles.newUserButtonText}>New user?</Text>
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>


            </View>
        );
    }
}

const styles = StyleSheet.create({

    loginWrapper: {
        paddingTop: 80,
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: '#FEF5E7',
    },
    image: {
        opacity: 0.9,
        width: 150,
        height: 150,
        resizeMode: 'contain',
        position: 'absolute',
        right: 0,
        top: 0,
        tintColor: '#F39C12',
        transform: [{rotate: '15deg'}],

    },
    titleText: {
        paddingTop: '60%',
        //paddingTop: 220,
        textAlign: 'center',
        /*fontFamily: 'Roboto_Medium',*/
        fontWeight: 'bold',
        fontSize: 28

    },
    inputWrapper : {
        paddingTop: 40,
        alignItems: 'center',
        width: '100%',
    },
    loginButtonWrapper: {
        alignItems: 'center'
    },
    newUserButtonWrapper: {
        alignItems: 'center',
        marginTop: '60%'
    },
    emailInput : {
        height: 30,
        width: '80%',
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 15,
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        fontSize: 16,
        paddingLeft: 10
    },
    passwordInput : {
        marginBottom: 40,
        height: 30,
        width: '80%',
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 15,
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        fontSize: 16,
        paddingLeft: 10
    },

    loginButtonView : {

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F39C12',
        borderRadius: 100,
        height: 45,
        width: 120
    },
    loginButtonText : {
        fontWeight: 'bold',
        fontSize: 16
    },
    newUserButtonView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#F39C12',
        borderWidth: 2,
        borderRadius: 100,
        height: 45,
        width: 120,
    },
    newUserButtonText: {
        fontWeight: 'bold',
        fontSize: 16
    },

});

export default Login;