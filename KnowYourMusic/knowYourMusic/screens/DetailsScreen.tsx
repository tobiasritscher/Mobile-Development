import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert } from "react-native";

const Separator = () => (
    <View style={styles.separator} />
);

// @ts-ignore
const TextField = (props) => {
    return (
        <TextInput
            {...props}
            editable
            maxLength={100}
        />
    );
}

const DetailsScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate('Profile')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
        width: 300
    },
    textField:{
        height: 50
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default DetailsScreen;
