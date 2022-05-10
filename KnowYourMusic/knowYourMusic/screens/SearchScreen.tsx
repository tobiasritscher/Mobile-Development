import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>

const Separator = () => (
    <View style={styles.separator} />
);

function SearchScreen ({ route, navigation }: Props) {
    const [text, onChangeText] = React.useState('Hello');

    const onTextChange = (text: any) => {
        onChangeText(text.target.value)
    }

    return (
        <View>
            <TextInput
                value={text}
                placeholder="input your Music search here"
                style={styles.textField}
                onChange={onTextChange}
            />
            <Separator/>
            <Button
                title="Search Music"
                color="#FF5000"
                onPress={() => navigation.navigate('ResultsScreen', {text})} //call the new screen with a list of all elements
                //onPress={() => navigation.navigate('ResultsScreen')}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    containerRow: {
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

