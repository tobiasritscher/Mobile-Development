import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert } from "react-native";
import { getMusic } from '../hooks/useMusic'
import { Music } from '../types'


function ResultsScreen = ({ route}) => {
    const category = route.params.category
    const { data, isLoading } = getMusic(category)
    console.log(data)

    return (
        <View style={styles.container}>
            <FlatList
                style={{ paddingHorizontal: 15, width: '100%' }}
                data={data}
                renderItem={({item}) => <Text style={styles.item}>{item.trackName}</Text>}
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 15,
    },
    item: {

    }
})

export default ResultsScreen;
