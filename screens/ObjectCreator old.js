import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView} from "react-native";
import { useForm, useController } from "react-hook-form";
import {useFonts} from 'expo-font';
import AppLoading from "expo-app-loading";
import { TouchableOpacity } from "react-native-gesture-handler";
import Dialog from "react-native-dialog";

/*

    Sätt texten ovanför input för nu- done
    Button for adding custom fields- done
    Add possibility to set names of custom fields- done
    First field does not always become 1?- done
    Add pop up asking for field name, set as placeholder/name- done

    Save values in all fields via dictionary
        pass placeholder and text for each onPress and set the dictionary
    Button for removing field or resetting object creation?
    Add button for "creating object"
    Functionality for uploading pictures, documents

*/

const ObjectCreator = (props) =>{

    props.route.params.reRender = true;
    const {control, handleSubmit} = useForm();
    let [defaultFields, setFields] = useState(['Residence type', 'Address', 'Size (square meters', 'City']);
    let [visibleInput, setVisibleInput] = useState(false)
    let [newFieldName, setFieldName] = useState('');
    
    const [fontsLoaded] = useFonts({
        Roboto_Regular: require('../assets/Fonts/Roboto-Regular.ttf'),
        Roboto_Thin: require('../assets/Fonts/Roboto-Thin.ttf'),
        Roboto_Medium: require('../assets/Fonts/Roboto-Medium.ttf')
    });

    const addNewField = () => {
        setFields(oldArray => [...oldArray, newFieldName])
        setVisibleInput(false)
    };

    const closeInput = () => {
        setVisibleInput(false)
    };

    const showInput = () => {
        setVisibleInput(true)
    };

    const Input = ({name, control,placeholder, key}) => {
        const {field} = useController({
            control,
            defaultValue: '',
            name,
        })
        const customOnChange = (placeholder, value) => {
            console.log(value)
            console.log(placeholder)
        };

        return (
            <View style={styles.formWrapper} key={placeholder}>
                
                {/*<Text style={styles.formInputText}>{placeholder}</Text>*/}
                <View style={styles.formInputWrapper}>
                    <TextInput
                        style={styles.inputStyle}
                        value = {field.value}
                        onChangeText = {field.onChange}
                        autoCapitalize= 'none'
                        placeholder={placeholder}
                        fontSize={16}
                        key = {placeholder}
                    />
                </View>
            </View>
        );
    };  

    if (!fontsLoaded) {
        return <AppLoading/>;
    }else{
        return (
            <View style={styles.container}>
                <View style={styles.inputWrapper}>

                    <ScrollView style={styles.scrollView}>
                        {
                        defaultFields.map((field, ix) => 
                            <Input key={field} name={field} control = {control} placeholder = {field}/>)
                        }
                    </ScrollView>
                    <KeyboardAvoidingView 
                    behavior = {Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={showInput} >
                            <View style={styles.buttonView}>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Add field</Text>
                            </View>
                        </TouchableOpacity>
                        
                        {/* Pop up for adding information on object */}
                        <View>
                            <Dialog.Container visible={visibleInput}>
                                <Dialog.Title>New field</Dialog.Title>
                                <Dialog.Description>
                                    Write a short description of the field!
                                </Dialog.Description>
                                <Dialog.Input placeholder='Field description' onChangeText={val => setFieldName(val)}/>
                                <Dialog.Button label="Add field" onPress={addNewField} />
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
        paddingTop: 80,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: '#FEF5E7',
    },
    formWrapper:{
        /*flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'*/

    },
    inputStyle: {
        flex: 1,
        marginHorizontal: 10
    },
    formInputWrapper: {
        marginBottom: 10,
        height: 45,
        marginBottom: 30,
        borderWidth: 1,
        //borderColor: '#F39C12',
        borderRadius: 8,
        backgroundColor: '#FFF',
        flexDirection: 'row',

    },
    formInputText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputWrapper: {
    },
    buttonWrapper: {
        alignItems: 'center',
        marginTop: 15
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F39C12',
        borderRadius: 100,
        height: 50,
        width: 130
    },
    scrollView: {
        marginBottom: 30,
        height: 500
    },

})

export default ObjectCreator;