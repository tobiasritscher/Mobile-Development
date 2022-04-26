import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert } from "react-native";

const Separator = () => (
    <View style={styles.separator} />
);

// @ts-ignore
const TextField = (props) => {
    return (
        <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            maxLength={100}
        />
    );
}

const SearchScreen = () => {
    const [value, onChangeText] = React.useState('');

    // If you type something in the text box that is a color, the background will change to that
    // color.
    return (
        <View style={styles.container}>
            <TextField
                onChangeText={(text: React.SetStateAction<string>) => onChangeText(text)}
                value={value}
                placeholder="input your Music search here"
                style={styles.textField}
            />
            <Separator/>
            <Button
                title="Search Music"
                color="#FF5000"
                onPress={() => Alert.alert('Simple Button pressed')}
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

