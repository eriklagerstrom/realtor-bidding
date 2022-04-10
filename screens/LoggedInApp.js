import React from "react";
import { View, Image, Text, StyleSheet, Alert, Button} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerItems from "./DrawerItems";
import Home from "./Home";
import ListRealtors from "./ListRealtors";
import Delete from "./Delete";
import ObjectCreator from "./ObjectCreator";
import LogOut from "./Logout";
import {Feather} from '@expo/vector-icons';
import { auth, db } from "../Firebase";

/*
Add profile above drawer items, not done, paused for now
Refer a friend- never mind for now, 

Funktion för att läsa från databas enligt uid
Funktion för att skriva till databas mha uid
Form for creating object
Listing realtors through the realtors db
Terms & use

*/

const Drawer = createDrawerNavigator();

const LoggedInApp = (props) =>{

    //console.log("in loggedinapp")
    //console.log(props)
    //props.route.params.route.params.reRender = true

    return (
        <Drawer.Navigator
        style={styles.container}
        initialRouteName="Home"
        screentOptions={{
            drawerType: 'front',
            itemStyle: { marginVertical: 10},
            headerShown: true,
            labelStyle: {
                fontSize: 20,
                fontWeight: 'bold'
            },

        }}
        >
        {
            DrawerItems.map(drawer=><Drawer.Screen 
                key={drawer.screen}
                name={drawer.name}
                options={{
                    
                    title: drawer.title,
                    headerTitle: drawer.header,
                    headerStyle:{
                        backgroundColor: '#F39C12',
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                    },
                    headerTintColor: 'black',
                    drawerActiveTintColor: '#F39C12',

                    drawerIcon: ({focused}) =>  
                        <Feather
                            name={drawer.iconName}
                            size={24}
                            color={focused? '#F39C12' : 'black' }
                        />

                }}
                
                initialParams={props}
                component={
                    drawer.screen === "Home" ? Home
                            : drawer.screen === "ListRealtors" ? ListRealtors
                                 : drawer.screen === 'ObjectCreator' ? ObjectCreator
                                    : drawer.screen === 'Delete' ? Delete : LogOut
                }
            />)
        }
        </Drawer.Navigator>
      );
    }

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: '#FEF5E7',
    },

})

export default LoggedInApp;