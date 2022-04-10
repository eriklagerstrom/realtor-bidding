import React from "react";
import { View,  StyleSheet, Alert} from "react-native";
import {useFonts} from 'expo-font';
import { auth, db } from "../Firebase";

const Delete = (props) =>{

    function deleteUser() {

        const em = props.route.params.route.params.userName;
        const pw = props.route.params.route.params.password;

        auth.signInWithEmailAndPassword(em, pw).then( ()=>{

            console.log("Deleting user");
            auth
            .currentUser
            .delete()
            .then(() =>{
                console.log("Deleted ", em);
                props.navigation.replace("Login");
            })
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
                    "Do you wish to delete your account?",
                    [
                        {
                            text: "Yes",
                            onPress: () => {deleteUser()},
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

export default Delete;