import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useEffect} from 'react';
import { firebase_auth } from '../FirebaseAuth';
import Tabbar from '../components/Tabbar';
import Map from '../components/map';
import Map1 from '../components/map';
import Card from '../components/mapcard';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Globe = () => {
  const [fontsLoaded] = useFonts({
    "BlackHanSans": require("../assets/BlackHanSans-Regular.ttf")
  });

  useEffect(() => {
    async function prepare(){
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();

  }, [])

  if(!fontsLoaded)
  {
    return undefined;
  }
  else{
    SplashScreen.hideAsync();
  }

  return (
    <View style={styles.container}>
      <Map1/>
      <Card/>
      {/*
      <View style={styles.text}> 
      <Text style={styles.cardtext}>Select your package</Text>
      <Text style={styles.cardtext}>16 locations</Text>
      </View>
  */}
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
  cardtext: {
    color: 'white', // Customize the text color
    fontSize: 12,
    fontFamily: 'BlackHanSans',
    marginTop: 5,
  },
  text: {
    position: 'absolute',
    bottom:340,
    left: 10,
  }
});

export default Globe;
