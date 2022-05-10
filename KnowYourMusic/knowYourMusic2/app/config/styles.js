import {Platform } from 'react-native';

import colors from './colors';

export default {
    text: {
        color: colors.dark,
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    },
    titleText: {
        fontSize: 25,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        color: colors.white,
        paddingTop: 30,
        paddingHorizontal: 30,
        paddingVertical: 30
    }
}

