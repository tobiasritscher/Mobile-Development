import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert } from "react-native";
import { getMusic } from '../hooks/useMusic'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MusicItem from "./MusicItem";
type Props = NativeStackScreenProps<any>

const Separator = () => (
    <View style={styles.separator} />
);

function ResultsScreen ({ route, navigation }: Props) {
    const searchText = route.params?.text
    const { data, isLoading } = getMusic(searchText)

    return (
        <View style={styles.containerRow}>
            <FlatList
                style={{ paddingHorizontal: 15, width: '100%' }}
                data={data}
                renderItem={({ item }) => (
                    <><MusicItem
                        trackName={item.trackName}
                        collectionName={item.collectionName}
                        artistName={item.artistName}
                        artworkUrl100={item.artworkUrl100}
                        onPress={() => navigation.navigate('DetailsScreen', {item})}/>
                        <Separator/></>
                )}

                keyExtractor={(item) => item.previewUrl}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    pageHeader: {
        padding: 15,
        margin: 0,
    },
    containerRow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 15,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})

export default ResultsScreen;
