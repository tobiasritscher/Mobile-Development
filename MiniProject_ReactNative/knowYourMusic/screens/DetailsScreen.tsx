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
        <View style={styles.containerCol}>
            <Image style={styles.image} source={item.artworkUrl100} />
            <Separator/>
            <Text style={styles.largeFont}>{item.trackName}</Text>
            <Text style={styles.largeFont}>{item.collectionName}</Text>
            <Text style={styles.largeFont}>{item.artistName}</Text>
            <Separator/>
            <Text style={styles.mediumFont}>{item.releaseDate}</Text>
            <Text style={styles.mediumFont}>{item.primaryGenreName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerRow: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: "row",
        marginHorizontal: 16,
        width: 300
    },
    containerCol:{
        justifyContent: 'center',
        flexDirection: "column"
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
    largeFont: {
        color: '#000',
        fontSize: 22
    },
    mediumFont: {
        color: '#000',
        fontSize: 16
    },
    smallFont: {
        color: '#000',
        fontSize: 10
    },
});

export default DetailsScreen;
