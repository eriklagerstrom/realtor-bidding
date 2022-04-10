import React, {useState} from "react";
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import {useFonts} from 'expo-font';
import AppLoading from "expo-app-loading";
import { useForm, useController } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../Firebase";
import ToggleSwitch from 'toggle-switch-react-native'

{/*
Perform email validation- done?
Perform password matching- done?
Add Button to transfer to login screen- done
Register user, email click verification? Check firebase- done
transfer to login screen- done
*/}



const RegisterUser = (props) =>{

    const [switchState, setSwitch] = useState(false);

    const onSubmit = (data) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        
        if (!switchState){
            Alert.alert("Terms & use must be accepted!")
        }else{

            if (reg.test(data.email) === false){
                Alert.alert("Email formatting incorrect", data.email)
            }else{
                if (data.password === data.passwordConfirmation){
                    handleSignup(data.email, data.password);
                }else{
                    Alert.alert("Passwords do not match")
                };
            };
        }
    };

    const handleSignup = (email, password) => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            user.sendEmailVerification();
            Alert.alert(email + " registered!", "Please make sure to verify email address by clicking the link in received email.")
            navigation.navigate("Login");
        })
        .catch(error => alert(error.message))
    };

    const navigation = useNavigation();
    const {control, handleSubmit} = useForm();
    const Input = ({name, control,placeholder, secureText=false}) => {
        const {field} = useController({
            control,
            defaultValue: '',
            name,
        })
        return (
            <TextInput
                value = {field.value}
                onChangeText = {field.onChange}
                secureTextEntry = {secureText}
                style={styles.input}
                placeholder={placeholder}
                autoCorrect={false}
                autoCapitalize= 'none'
            />
        );
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
                    <Text style={styles.titleText}>User registration</Text>
                </View>

                <View style={styles.inputWrapper}>

                    {/*<Text style={styles.inputHeader} >Email</Text>*/}
                    <Input name="email" control ={control} placeholder="Email"/>

                    {/*<Text style={styles.inputHeader} >Password</Text>*/}
                    <Input name="password" control ={control} placeholder="Password" secureText={true}/>

                    {/*<Text style={styles.inputHeader} >Password confirmation</Text>*/}
                    <Input name="passwordConfirmation" control ={control} placeholder="Password" secureText={true}/>

                </View>

                <View style={styles.switchWrapper}>
                    <ToggleSwitch
                            isOn={switchState}
                            onColor="green"
                            offColor="#F39C12"
                            label="Terms & use"
                            labelStyle={{ color: "black", fontSize: 16 }}
                            size='medium'
                            onToggle={(isOn) => setSwitch(isOn)}
                    />
                </View>

                <KeyboardAvoidingView 
                behavior = {Platform.OS === "ios" ? "padding" : "height"}
                style={styles.buttonWrapper}>
                    <TouchableOpacity onPress = {handleSubmit(onSubmit)}>
                        <View style={styles.registerButtonView}>
                            <Text style={styles.registerButtonText}>Register</Text>    
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView 
                    behavior = {Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.loginButtonWrapper}>
                    {/* Login screen button */}
                    <TouchableOpacity onPress = {() => navigation.navigate("Login")} >
                        <View style={styles.loginButtonView}>
                            <Text style={styles.registerButtonText}>Login screen</Text>
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
        paddingTop: 220,
        textAlign: 'center',
        /*fontFamily: 'Roboto_Medium',*/
        fontWeight: 'bold',
        fontSize: 28

    },
    inputWrapper : {
        paddingTop: 40,
        width: '100%',
        marginLeft: '10%'
    },
    buttonWrapper: {
        alignItems: 'center',
        marginTop: '10%'
    },
    registerButtonView : {

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F39C12',
        borderRadius: 100,
        height: 45,
        width: 120,
    },
    registerButtonText : {
        fontWeight: 'bold',
        fontSize: 16
    },
    input: {
        height: 30,
        width: '80%',
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 15,
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        fontSize: 16
    },
    inputHeader: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
        paddingTop: 10
    },
    loginButtonView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#F39C12',
        borderWidth: 2,
        borderRadius: 100,
        height: 45,
        width: 120,
    },
    loginButtonWrapper: {
        alignItems: 'center',
        marginTop: '48%'
    },
    switchWrapper: {
        paddingTop: 15,
        alignItems: 'center'
    }

});

export default RegisterUser;