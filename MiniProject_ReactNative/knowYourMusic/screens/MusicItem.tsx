import React from 'react'
import {StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';


function MusicItem({trackName, collectionName, artistName, artworkUrl100, onPress }: any) {
    return (
        <TouchableHighlight
            underlayColor={'#bbb'}
            onPress={onPress}
        >
            <View style={styles.containerRow}>
                <Image style={styles.image} source={artworkUrl100} />
                <View style={styles.containerCol}>
                    <Text style={styles.largeFont}>{trackName}</Text>
                    <Text style={styles.mediumFont}>{collectionName}</Text>
                    <Text style={styles.smallFont}>{artistName}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    containerRow:{
        flexDirection: "row"
    },
    containerCol:{
        flexDirection: "column"
    },
    roles: {
        color: '#fff'
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
    }
})

export default MusicItem;
