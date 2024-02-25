import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import InputName from '../components/inputname';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { firebase_auth, firebase_db } from '../FirebaseAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const NamePage = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "BlackHanSans": require("../assets/BlackHanSans-Regular.ttf")
  });

  const [name, setName] = useState('');

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const handleContinue = async () => {
    try {
       const username = firebase_auth.currentUser;
       console.log(username.email)
       const userRef = ref(firebase_db, `users/${username.uid}`);
       await set(userRef, {
         name: name,
         email: username.email,
       });
       navigation.navigate('Onboarding1')

    } catch (error) {
      console.error('Error storing name:', error.message);
      // Handle error (e.g., display an error message to the user)
    }
  };

  return (
    <ImageBackground source={require('../assets/Background1.png')} style={style.backgroundimage}>
      <View style={style.container}>
        <Text style={style.name}>Enter Your Name</Text>
        <InputName tagfor="NAME" onTextChange={(tag, text) => setName(text)} />
        <TouchableOpacity onPress={handleContinue}>
          <Text style={style.continueButton}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    marginRight: 140,
    fontFamily: 'BlackHanSans',
    fontSize: 14,
    top: -5,
    marginBottom: 0,
  },
  continueButton: {
    fontFamily: 'BlackHanSans',
    fontSize: 16,
    color: 'white',
    marginTop: 20,
    // Add other styling for the button
  },
  backgroundimage: {
    flex: 1,
    resizeMode: 'stretch',
  },
});

export default NamePage;
