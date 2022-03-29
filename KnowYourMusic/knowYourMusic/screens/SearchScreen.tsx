import React from 'react';
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";


const SearchScreen: React.FC = () => {
    return (
        <View >
            <SearchBar
                placeholder="Search Here..."
                lightTheme
                round
                value={this.state.searchValue}
                //onChangeText={(text) => this.searchFunction(text)}
                autoCorrect={false}
            />
        </View>
    );

}

export default SearchScreen;
