import React, {useState, useRef} from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Vibration, Modal, Pressable, TouchableWithoutFeedback} from "react-native";
import {useFonts} from 'expo-font';
import AppLoading from "expo-app-loading";
import { TouchableOpacity } from "react-native-gesture-handler";
import Dialog from "react-native-dialog";
import { useForm, useController } from "react-hook-form";
import * as ImagePicker from 'expo-image-picker';
import ToggleSwitch from 'toggle-switch-react-native'
import ImageModal from 'react-native-image-modal';
import * as firebase from "firebase";
import "firebase/firestore";
/*

    Användartyper; mäklare ska ha annan funktionalitet?
    Hur ska budgivningen gå till?
    Uploading documents/photos?
    Filter on realtor who "should" sell the apartment

*/

const InputNew = ({name,placeholder, fieldValues,removeField, setFieldValues}) => {

    //inputRefs[placeholder] = useRef();

    return (
        <View style={styles.formWrapper} key={placeholder}>                
            <View style={styles.formInputWrapper}>
                {<TextInput
                    style={styles.inputStyle}
                    value = {fieldValues[placeholder]}
                    onChangeText = {(text)=>{
                        setFieldValues((oldFields)=>({
                            ...oldFields,
                            [placeholder]: text
                        }))
                    }}
                    autoCapitalize= 'none'
                    placeholder={placeholder}
                    key={placeholder}
                    fontSize={16}
                />}
            </View>
            <TouchableOpacity onPress={()=>{removeField(placeholder)}} >
                <View style={styles.resetButtonView}>
                    <Text style={{fontSize: 26, fontWeight: 'bold'}}>-</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};  

const ObjectCreator = (props) =>{

    props.route.params.route.params.reRender = true;
    let objectDict = {};
    const originalFields = ['Residence type', 'Address', 'Size (square meters)', 'City'];
    let [defaultFields, setFields] = useState(['Residence type', 'Address', 'Size (square meters)', 'City']);
    let [visibleInput, setVisibleInput] = useState(false)
    let [modalVisible, setModalVisible] = useState(false)
    let [showRemoveImage, setRemoveImage] = useState(false)
    let [selectedUri, setSelectedUri] = useState('')
    let [newFieldName, setFieldName] = useState();
    let [pictures, setPictures] = useState([])
    const [checked, setChecked] = useState(false);
    const scrollViewRef = useRef();
    const {control, handleSubmit, register, resetField} = useForm();
    let inputRefs = {}
    const [fieldValues, setFieldValues] = useState({})

    //const pickImage = async () => {
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        //let result = await ImagePicker.launchImageLibraryAsync({
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1
        });
        console.log(result);

        if (!result.cancelled) {
          setPictures(oldPics => [...oldPics, result])
          console.log(result)
        }else{
            console.log("Something went wrong")
        }
        setVisibleInput(false)
      };        

    const [fontsLoaded] = useFonts({
        Roboto_Regular: require('../assets/Fonts/Roboto-Regular.ttf'),
        Roboto_Thin: require('../assets/Fonts/Roboto-Thin.ttf'),
        Roboto_Medium: require('../assets/Fonts/Roboto-Medium.ttf')
    });

    const addNewField = (pictureChecked) => {

        if(pictureChecked){
            setChecked(false)
            pickImage()
        }else{
            setFields(oldArray => [...oldArray, newFieldName])
            setVisibleInput(false)
        }
    };

    const closeInput = () => {
        setVisibleInput(false)
    };

    const showInput = () => {
        setVisibleInput(true)
    };

    const addUserObject = () =>{
        const db = firebase.firestore();
        const email = props.route.params.route.params.user.email;
        const ms = Date.now();
        
        let uniqueName = String(email)+ "-" + String(ms);
        let tmpDict = fieldValues;
        tmpDict['user'] = email;

        db.collection("HousingObjects")
            .doc(uniqueName)
            .set(tmpDict);

        setTimeout(()=>{

            for (var key in fieldValues){
                fieldValues[key] = ''
            }

            setFields(originalFields);
            props.navigation.navigate('Home');

        },500)

    };

    const removeField = (fieldName) => {
        setFields((defaultFields) => defaultFields.filter((item) => item !== fieldName));
    };

    const removeImage = (imageUri) => {
        setPictures((pictures) => pictures.filter((pic) => pic.uri !== imageUri));
        setRemoveImage(!showRemoveImage)
    };

    const ImageGalery = () =>{
        if(pictures.length==0){
            return <Text style={styles.pictureText}></Text>
        }else{
            return (
                pictures.map((picture) =>
                    <ImageModal
                        key={picture.uri}
                        resizeMode="cover"
                        //modalImageResizeMode="contain"
                        imageBackgroundColor="#000000"
                        onLongPressOriginImage = {()=>{
                            Vibration.vibrate(5, false)
                            setSelectedUri(picture.uri)
                            setRemoveImage(!showRemoveImage)
                        }}
                        style={{
                        width: 70,
                        height: 60,
                        }}
                        source={{
                        uri: picture.uri,
                        }}
                    />
                )
            )
        }
    }

    const Input = ({name,placeholder}) => {

        //inputRefs[placeholder] = useRef();
        const {field} = useController({
            control,
            defaultValue: '',
            name,
        })
        const customOnChange = (placeholder, value) => {
            objectDict[placeholder] = value
        };

        function setFieldsCustom (text, placeholder){

        };

        return (
            <View style={styles.formWrapper} key={placeholder}>                
                <View style={styles.formInputWrapper}>
                    {<TextInput
                        style={styles.inputStyle}
                        //value = {field.value}
                        value = {fieldValues[placeholder]}
                        //onChange={customOnChange(placeholder, field.value)}
                        //onChangeText = {field.onChange}
                        onChangeText = {(text)=>{
                            setFieldValues((oldFields)=>({
                                ...oldFields,
                                [placeholder]: text
                            }))
                        }}
                        autoCapitalize= 'none'
                        placeholder={placeholder}
                        key={placeholder}
                        fontSize={16}
                    />}
                </View>
                <TouchableOpacity onPress={()=>{removeField(placeholder)}} >
                    <View style={styles.resetButtonView}>
                        <Text style={{fontSize: 26, fontWeight: 'bold'}}>-</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };  

    if (!fontsLoaded) {
        return <AppLoading/>;
    }else{
        return (
            <View style={styles.container}>
                <View style={styles.inputWrapper}>
                    <ScrollView style={styles.scrollView}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'space-between',
                        }}
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                    >
                        <View style={{flex:1, justifyContent: 'flex-start', marginBottom: 25}}>
                            {
                            defaultFields.map((field) => 
                                //<Input name={field} /*control={control}*/ placeholder = {field}/>)
                                <InputNew key = {field} name={field} placeholder = {field} removeField={removeField} fieldValues={fieldValues} setFieldValues={setFieldValues}/>)
                            }
                        </View>
                            <KeyboardAvoidingView 
                            behavior = {Platform.OS === "ios" ? "padding" : "height"}
                            style={styles.buttonWrapper}>
                                <TouchableOpacity onPress={showInput} >
                                    <View style={styles.newFieldButtonView}>
                                        <Text style={{fontSize: 35}}>+</Text>
                                    </View>
                                </TouchableOpacity>
                            </KeyboardAvoidingView>

                        {/*Gallery*/}
                        <View style={styles.pictureView}>
                            <ImageGalery/>
                        </View>
                    </ScrollView>
                    
                    <KeyboardAvoidingView 
                    behavior = {Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={addUserObject} >
                            <View style={styles.createButtonView}>
                                <Text style={{fontSize: 18}}>Create</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Pop up for removing picture */}
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={showRemoveImage}
                            onRequestClose={() => {
                            setRemoveImage(!showRemoveImage)
                            }}
                            >
                            <TouchableWithoutFeedback onPress={()=>setRemoveImage(!showRemoveImage)}>
                            <View style={styles.centeredView}>
                            <TouchableWithoutFeedback>
                            <View style={styles.modalView}>

                                <View style={styles.modalText}>
                                <Text style={{fontSize: 16, marginBottom: 20, fontWeight: 'bold'}} >Remove image clicked?</Text>
                                </View>
                                <View style={styles.buttonViewModal}>
                                    <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => removeImage(selectedUri)}
                                    >
                                    <Text style={styles.textStyle}>Remove image</Text>
                                    </Pressable>
                                    <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setRemoveImage(!showRemoveImage)}
                                    >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                    </Pressable>
                                </View>

                            </View>
                            </TouchableWithoutFeedback>
                            </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                        
                        {/* Pop up for adding information on object */}
                        <View>
                            <Dialog.Container visible={visibleInput}>
                                <Dialog.Title>New field</Dialog.Title>
                                <View style={styles.checkBox}>
                                    <ToggleSwitch
                                        isOn={checked}
                                        onColor="green"
                                        //offColor="#F39C12"
                                        label="Image upload?"
                                        labelStyle={{ color: "black", fontSize: 16 }}
                                        size='medium'
                                        onToggle={(isOn) => setChecked(isOn)}
                                    />
                                </View>
                                <Dialog.Input placeholder='Short field/image description' onChangeText={val => setFieldName(val)}/>
                                <Dialog.Button label="Add" onPress={()=>addNewField(checked)} />
                                <Dialog.Button label="Cancel" onPress={closeInput} />
                            </Dialog.Container>
                        </View>
                    </KeyboardAvoidingView>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: '#FEF5E7',
    },
    formWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        //justifyContent: 'space-between',
        //alignContent: 'stretch',
        //flex: 1
    },
    inputStyle: {
        flex: 1,
        paddingHorizontal: 10,
        textAlign: 'left'
    },
    formInputWrapper: {
        height: 45,
        borderWidth: 1,
        //borderColor: '#F39C12',
        borderRadius: 8,
        backgroundColor: '#FFF',
        flex: 1
    },
    formInputText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputWrapper: {
        marginBottom: 30
    },
    buttonWrapper: {
        alignItems: 'center',
    },
    newFieldButtonView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 35
    },
    createButtonView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D3D3CB',
        borderRadius: 70,
        height: 60,
        width: 110,
    },
    resetButtonView: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height:45,
        width: 30,
    },
    scrollView: {
        marginBottom: '25%',
        height: 550,
        //borderWidth: 0.2,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    checkBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    pictureText: {
        fontSize: 18,
        textAlign: 'center'
    },
    pictureView: {
        marginTop: 30,
        marginBottom: 25,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    uploadedImage: {
        width: 60,
        height: 60
    },
    imageView: {
        width: 60,
        height: 60,
        marginBottom: 5
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
    }
})

export default ObjectCreator;