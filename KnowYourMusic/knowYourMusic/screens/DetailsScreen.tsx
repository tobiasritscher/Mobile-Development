import React from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, Button, Alert, Image} from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<any>

const Separator = () => (
    <View style={styles.separator} />
);

const DetailsScreen = ({ route, navigation }: Props) => {
    const item = route.params?.item
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={styles.image} source={item.artworkUrl100} />
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
    image: {
        width: 100,
        height: 100,
    },
});

export default DetailsScreen;
