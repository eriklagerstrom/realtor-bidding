import React, {useState} from "react";
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Modal, Pressable, TouchableWithoutFeedback} from "react-native";
import {useFonts} from 'expo-font';
import AppLoading from "expo-app-loading";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import realtorsData from "./realtorsdata_records";


const ListRealtors = (props) =>{

    const [modalVisible, setModalVisible] = useState(false);
    const [slogan, setSlogan] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [realtorImage, setImage] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');


    const displayRealtor = (realtor) => {
        setName(realtor.realtor_name);
        setDescription(''.concat("In the past 12 months, ",realtor.realtor_name, " has sold ", realtor.sold_homes," objects and had a market share of ", realtor.pct_sold_homes.toFixed(2), '%. Their average price development was ', realtor.avg_pct_dev.toFixed(2), '%'));

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
                //onBackdropPress={()=>{setModalVisible(!modalVisible)}}
                onRequestClose={() => {
                setModalVisible(!modalVisible)
                }}
            >
                <TouchableWithoutFeedback onPress={()=>setModalVisible(!modalVisible)}>
                <View style={styles.centeredView}>
                <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{name}</Text>
                    <Text style={styles.modalText}>{description}</Text>

                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {setModalVisible(!modalVisible)}}
                    >
                    <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
                </TouchableWithoutFeedback>
                </View>
                </TouchableWithoutFeedback>
            </Modal>,
            <SafeAreaView style={styles.container}>
                <View style={styles.titleView}>
                    {/*<Text style={styles.title}>Realtors active in Uppsala</Text>*/}
                </View>
                <ScrollView style = {styles.scrollView}>
                    {
                    realtorsData.map((realtor, index) =>
                       <KeyboardAvoidingView
                        key={realtor.realtor_name}
                        style={styles.wrapperView}
                        behavior = {Platform.OS === "ios" ? "padding" : "height"}
                       >
                            <TouchableOpacity onPress = {()=>displayRealtor(realtor)}>
                                <View style = {styles.realtorView}>
                                    <Text style={styles.realtorName}> {realtor.realtor_name} </Text>
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
        flexWrap: 'wrap',
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 5
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
        //height:30,
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