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

const SearchScreen = () => {
    const [text, onChangeText] = React.useState('');
    return (
        <View style={styles.container}>
            <TextField
                onChangeText={(text: React.SetStateAction<string>) => onChangeText(text)}
                value={text}
                placeholder="input your Music search here"
                style={styles.textField}
            />
            <Separator/>
            <Button
                title="Search Music"
                color="#FF5000"
                onPress={() => Alert.alert(text)} //call the new screen with a list of all elements
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

export default SearchScreen;

