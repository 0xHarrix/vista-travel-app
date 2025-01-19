import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { firebase_auth } from '../FirebaseAuth';
import Tabbar from '../components/Tabbar';
import Card from '../components/mapcard';
import Hotels from '../components/Hotels';

const Explore = () => {
  const handleLogout = async () => {
    try {
      await firebase_auth.signOut();
      console.log('Signed Out');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Hotels city="Trichy"/>
      <Tabbar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Explore;
