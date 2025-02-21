import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { firebase_auth } from '../FirebaseAuth';
import Tabbar from '../components/Tabbar';

const Notifications = () => {
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
      <Text>Notifications</Text>
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
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Notifications;
