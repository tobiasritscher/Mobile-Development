import React from 'react';
import {StyleSheet, View, Image} from 'react-native';


function SearchScreen({ navigation }) {
    const [text, onChangeText] = React.useState('');
    return (
        <View style={styles.container}>
            <TextField
                onChangeText={(text) => onChangeText(text)}
                value={text}
                placeholder="input your Music search here"
                style={styles.textField}
            />
            <Separator/>
            <Button
                title="Search Music"
                color="#FF5000"
                //onPress={() => navigation.navigate('Results', {text, navigation})} //call the new screen with a list of all elements
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}

const Separator = () => (
    <View style={styles.separator} />
);

const TextField = ({props}) => {
    return (
        <TextInput
            {...props}
            editable
            maxLength={100}
        />
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
