import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigation'
import SearchScreen from './screens/SearchScreen';
//import navigation from './navigation/navigations'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function App() {
  return (
      <Navigation/>
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
