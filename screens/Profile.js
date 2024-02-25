import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { firebase_auth } from '../FirebaseAuth';
import Tabbar from '../components/Tabbar';

const Profile = () => {
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
      <Text>Profile</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
    backgroundColor: 'blue', // Customize the background color
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Customize the text color
    fontSize: 16,
  },
});

export default Profile;
