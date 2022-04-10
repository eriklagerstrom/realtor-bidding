import React, {useState} from "react";
import { View, Image, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Modal, Pressable, TouchableHighlight} from "react-native";
import {useFonts} from 'expo-font';
import AppLoading from "expo-app-loading";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import realtorsData from "./RealtorsDB";


/*

    Gör om till touchable opacity med modal som laddas vid tryck- done
    Fyll i resten av modal på samma sätt och snyggt, good enough för nu

*/

const ListRealtors = (props) =>{

    const [modalVisible, setModalVisible] = useState(false);
    const [slogan, setSlogan] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [realtorImage, setImage] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');


    const displayRealtor = (realtor) => {
        setSlogan(realtor.slogan);
        setName(realtor.name);
        setDescription(realtor.description);
        setImage(realtor.image);
        setAddress(realtor.address);
        setPhone(realtor.phone);

        setModalVisible(true);
    };

    const [fontsLoaded] = useFonts({
        Roboto_Regular: require('../assets/Fonts/Roboto-Regular.ttf'),
        Roboto_Thin: require('../assets/Fonts/Roboto-Thin.ttf'),
        Roboto_Medium: require('../assets/Fonts/Roboto-Medium.ttf')
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    }else{

        return ([
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onBackdropPress={()=>{setModalVisible(!modalVisible)}}
                onRequestClose={() => {
                setModalVisible(!modalVisible)
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{name}</Text>
                    <Text style={styles.modalText}>{slogan}</Text>
                    <Text style={styles.modalText}>{address}</Text>
                    <Text style={styles.modalText}>{phone}</Text>

                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {setModalVisible(!modalVisible)}}
                    >
                    <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>,
            <SafeAreaView style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Available Realtors</Text>
                </View>
                <ScrollView style = {styles.scrollView}>
                    {
                    realtorsData.map(realtor =>
                       <KeyboardAvoidingView
                        key={realtor.id}
                        style={styles.wrapperView}
                        behavior = {Platform.OS === "ios" ? "padding" : "height"}
                       >
                            <TouchableOpacity onPress = {()=>displayRealtor(realtor)}>
                                <View style = {styles.realtorView}>
                                    <Text style={styles.realtorName}> {realtor.name} </Text>
                                </View>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    )}
                </ScrollView>
            </SafeAreaView>
        ]);
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        paddingHorizontal: 30,
        flex: 1,
        backgroundColor: '#FEF5E7',
    },
    titleView: {
        marginVertical: 30,
        alignItems: 'center'
    },
    realtorName: {
        fontSize: 18,
        fontStyle: 'italic',
    },
    realtorBody: {
        fontSize: 15,
    },
    wrapperView: {  
        alignItems: 'center',
        width: '100%',
        marginTop: 25
    },
    realtorView: {
        borderWidth: 1,
        borderRadius: 10,
        height:30,
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    scrollView: {
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F39C12",
      },
      buttonClose: {
        backgroundColor: "#F39C12",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16
      },
      background: {
          /*flex: 0.5*/
      },
      modalTitle: {
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20
    }
})

export default ListRealtors;