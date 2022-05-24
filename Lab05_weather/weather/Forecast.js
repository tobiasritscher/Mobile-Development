'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const Forecast = ({main, description, temp}) => {
  return (
      <View>
        <Text style={styles.bigText}> 
          {main}
        </Text>
        <Text style={styles.mainText}>
          {description} 
        </Text>
        <Text style={styles.bigText}> 
          {temp}
        </Text>
      </View>    
  );
};

const styles = StyleSheet.create({
  bigText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF'
  },
  mainText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF'
  }
});

export default Forecast;