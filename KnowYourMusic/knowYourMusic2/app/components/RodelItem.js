import React from 'react'
import {StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';
import colors from "../config/colors";

function RodelItem({name, roles, email, birthday, image, onPress }) {
    return (
        <TouchableHighlight
            underlayColor={colors.light}
            onPress={onPress}
        >
            <View style={styles.container}>
                <Image style={styles.image} source={image} />
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.role}>{roles}</Text>
                    <Text style={styles.email}>{email}</Text>
                    <Text style={styles.email}>{birthday}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row"
    },
    roles: {
        color: colors.riesbach
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 20,
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 5,
    },
    name: {
        color: colors.white,
        fontSize: 20
    },
    role: {
        color: colors.white,
        fontSize: 18
    },
    email: {
        color: colors.white,
        fontSize: 12
    }
})

export default RodelItem;