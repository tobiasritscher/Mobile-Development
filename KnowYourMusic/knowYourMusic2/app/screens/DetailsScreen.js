import {StyleSheet, Text, View} from "react-native";
import colors from "../config/colors";
import textStyle from "../config/styles";

function DetailsScreen( item ) {

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={textStyle.titleText}>Details Screen</Text>
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
    titleText: {
        fontSize: 90,
        fontFamily: 'sans-serif',
        color: colors.black,
        paddingTop: 40
    },
    textContainer: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
    }
})

export default DetailsScreen;