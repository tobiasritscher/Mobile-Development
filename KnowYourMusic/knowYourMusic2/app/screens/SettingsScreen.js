import React, {useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import colors from "../config/colors";
import textStyle from "../config/styles";
import {Button} from "react-native-elements";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

function SettingsScreen({navigation}) {

    const authContext = useContext(AuthContext);

    const handleLogOut = () => {
        authContext.setUser(null);
        authStorage.removeToken();
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={textStyle.titleText}>Settings Screen</Text>
                <Button
                    title="logout"
                    type="clear"
                    onPress={handleLogOut}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.riesbach
    },
    textContainer: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
    }
})

export default SettingsScreen;