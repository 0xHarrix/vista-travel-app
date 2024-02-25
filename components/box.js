// Box.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Box = () => {
  return (
    <View style={styles.box}>
      <View style={styles.rectangle} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 592,
    width: 319,
  },
  rectangle: {
    backgroundColor: 'rgba(217, 217, 217, 0.1)', // Using rgba for the background color with alpha (transparency)
    borderRadius: 40,
    ...Platform.select({
      ios: {
        // iOS styles
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      android: {
        // Android styles
        elevation: 4,
      },
    }),
    position: 'absolute',
    top: 0,
    left: 0,
    height: 592,
    width: 319,
  },

});

export default Box;
