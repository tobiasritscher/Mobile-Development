import React from 'react'
import {StyleSheet, View, Text, Image, TouchableHighlight} from 'react-native';


function MusicItem({trackName, collectionName, artistName, artworkUrl100, onPress }: any) {
    return (
        <TouchableHighlight
            underlayColor={'#ff9'}
            onPress={onPress}
        >
            <View style={styles.container}>
                <Image style={styles.image} source={artworkUrl100} />
                <View>
                    <Text style={styles.role}>{collectionName}</Text>
                    <Text style={styles.name}>{trackName}</Text>
                    <Text style={styles.email}>{artistName}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row"
    },
    roles: {
        color: '#bbb'
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
    name: {
        color: '#fff',
        fontSize: 18
    },
    role: {
        color: '#fff',
        fontSize: 20
    },
    email: {
        color: '#fff',
        fontSize: 12
    }
})

export default MusicItem;
