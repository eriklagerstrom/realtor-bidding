import { Roboto_300Light, Roboto_400Regular, Roboto_400Regular_Italic } from "@expo-google-fonts/roboto";
import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import realtorsData from "./RealtorsDB";

const Realtors = () => {
    const realtorItem = ({item}) => {
        return (

            <View style={style.realtors}>
                <View>                        
                    <Image
                        style ={styles.img}
                        source={item.image}
                    />
                </View>
                <View>
                    <Text style={styles.realtorTitle}>
                        {item.name}
                        <Text style={styles.slogan}>
                            {item.slogan}
                        </Text>
                    </Text>
                    
                    <Text 
                        style={styles.description}
                        numberOfLines={2}
                        ellipsizeMode='tail'
                    >
                        {item.description}
                    </Text>

                    <Text style={styles.contactInfoWrapper}>
                        
                        Kontaktinformation
                        {'\n'}
                        <Text style={styles.contactInfo}>
                            {item.address}
                            {'\n'}
                            {item.phone}
                        </Text>
                    </Text>
                    <Text style={styles.dummyButton}>
                        Click me!
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={realtorsData}
                renderItem={realtorItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

/*
Play around with fonts, padding, center etc
Background colors?
*/

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 15
    },
    realtors: {
        flexDirection: 'column'
    },
    img: {
        height: 180,
        width: '100%'
    },
    realtorTitle: {
        fontFamily: Roboto_400Regular,
        textAlign: 'center'
    },
    slogan: {
        fontFamily: Roboto_400Regular_Italic
    },
    description: {
        fontFamily: Roboto_300Light,
        fontWeight: 600,
        /*textAlign: 'center',*/
        paddingTop: 5
    },
    contactInfoWrapper: {
        paddingTop: 5,
        fontWeight: 'bold',
        fontFamily: Roboto_300Light,
        fontWeight: 600,
        textDecorationLine: 'underline'
    },
    contactInfo: {
        fontFamily: Roboto_300Light,
        fontWeight: 600,
    },
    dummyButton: {
        fontFamily: Roboto_400Regular,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10
    }

});