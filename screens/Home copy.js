import React, {useState} from "react";
import { View, Modal, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TouchableWithoutFeedback, Pressable} from "react-native";
import {useFonts} from 'expo-font';
import AppLoading from "expo-app-loading";
import * as firebase from "firebase";
import "firebase/firestore";


/*
    To display all the selling items created generically
    Add button for removing object, once clicked?
*/

const Home = (props) =>{

    const [userObjects, setUserObjects] = useState({})
    const [showRemoveObject, setRemoveObject] = useState(false)
    const [showObject, setShowObject] = useState(false)
    const [selectedObject, setSelectedObject] = useState(null)
    const [loadedData, setLoadedData] = useState(false)
    const email = props.route.params.route.params.user.email;


    //async function getSnapshot(setUserObjects, email){
    const getSnapshot = ()=> {
  
        const db = firebase.firestore();
        const collection = {};

        let objectsRef = db.collection("HousingObjects");

        try {
            objectsRef.get().then(snapshot => {
                snapshot.forEach((doc)=>{
                    if(doc.data().user === email){
                        collection[doc.id] = doc.data();
                    } 
                })
            })
            console.log(collection)
            console.log("Finished without error")
            return collection
        } catch(err){
            console.log("Got error: ", err);
        }
        setLoadedData(true)
        return {}
    };

    const removeObject = ()=>{

        console.log("dummy-remove")
        setRemoveObject(false)
        props.route.params.route.params.reRender = true

    };

    const handleLongPress = (object)=>{

        setSelectedObject(object)
        setRemoveObject(true)        

    };
    const handleOnPress = (object)=>{

        setSelectedObject(object)
        setShowObject(true)        

    };

    const HousingObjects = ({test}) =>{

        //console.log(props)
        if (props.route.params.route.params.reRender){
            setLoadedData(false)
            //let dbSnapshot =  getSnapshot().then((collection) => {
            let dbSnapshot =  getSnapshot()

            if (loadedData && Object.keys(dbSnapshot).length > 0){
                props.route.params.route.params.reRender = false;
                console.log("returning rendered objects")

                return (
                    Object.entries(dbSnapshot).map(obj=> {
                        setSelectedObject(obj)
                        console.log("Before print")
                        console.log(obj)
                        console.log("individual object")
                        return (
                            <View style={styles.outerView} key={String(obj[0])}>
                                <TouchableOpacity onPress={()=>{handleOnPress(obj)}} onLongPress={()=>{handleLongPress(obj)}}>
                                    <View style={styles.innerView}>
                                        <Text style={styles.objectText}>{String(obj[1].Address)}</Text>
                                        <Text style={styles.subText}>Latest bid: 1</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                )
            }else{
                console.log("returning not loaded or keys lenght <= 0")
                console.log(loadedData)
                return(
                    <Text style={styles.textTitle}>No housing objects found</Text>,
                    <View style={styles.subTitleView}>
                        <Text style={styles.textSubTitle}>Head over to "New Object" and create one!</Text>
                    </View>
                );
            }
            //})
        }else{
            console.log("returning no rerender")
            return (
                <Text style={styles.textTitle}>No housing objects found</Text>,
                <View style={styles.subTitleView}>
                    <Text style={styles.textSubTitle}>Head over to "New Object" and create one!</Text>
                </View>
            )
        }
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
            <View style={styles.container}>
                <HousingObjects test="lol"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: '#FEF5E7',
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "200"
    },
    textSubTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '200'
    },
    objectText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '200'
    },
    subText: {
        fontSize: 16,
        fontWeight: "100"
    },
    subTitleView: {
        marginTop: 20
    },
    scrollView: {
        height: Dimensions.get("window").height*0.8
    },
    objectsView: {
        marginTop: 20
    },
    outerView: {
        borderWidth: 1,
        marginTop: 10,
        alignItems: 'center',
        alignContent: 'center'
    },
    innerView: {
        alignContent: 'center',
        alignItems: 'center',
        width: Dimensions.get("window").width/3,
        height: Dimensions.get("window").width/3,
        borderWidth: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        //alignItems: "center",
        //marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
    },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        alignContent: 'center'
    },
    buttonOpen: {
        backgroundColor: "#F39C12",
    },
    buttonClose: {
        backgroundColor: "#F39C12",
    },
    buttonViewModal:{
        flexDirection: 'row',
        justifyContent: 'space-evenly'        
    },
    modalText: {
        alignItems: 'center'
    },

})

export default Home;