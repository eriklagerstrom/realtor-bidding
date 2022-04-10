import React from "react";
import { View, StyleSheet, Alert} from "react-native";
import {useFonts} from 'expo-font';
import { auth, db } from "../Firebase";

const LogOut = (props) =>{

    function LogOutUser() {
        console.log(props);
        auth
        .signOut()
        .then(() =>{
            console.log("Signing out");
            props.navigation.replace("Login");
        })
    }

    const [fontsLoaded] = useFonts({
        Roboto_Regular: require('../assets/Fonts/Roboto-Regular.ttf'),
        Roboto_Thin: require('../assets/Fonts/Roboto-Thin.ttf'),
        Roboto_Medium: require('../assets/Fonts/Roboto-Medium.ttf')
    });

    if (!fontsLoaded) {
        return <View/>;
    }else{

        Alert.alert("Warning",
            "Do you wish to log out?",
            [
                {
                    text: "Yes",
                    onPress: () => {LogOutUser()},
                    style: 'default'
                },
                {
                    text: "Cancel",
                    onPress: () => props.navigation.navigate("Home"),
                    style: "cancel"
                },
            ]
        );
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: '#FEF5E7',
    },

})

export default LogOut;