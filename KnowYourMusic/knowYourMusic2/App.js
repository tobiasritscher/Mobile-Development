import React, {useEffect, useState} from 'react';
import Navigation from "./app/components/Navigation";



export default function App() {
    return (
        <View style={styles.container}>
            <Navigation/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

