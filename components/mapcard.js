import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Touchable, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import * as SplashScreen from 'expo-splash-screen';

const imageMapping = {
    1: require('../assets/manila.png'),
    2: require('../assets/Bali.png'),
    3: require('../assets/Phillipines.png'),
    // Add more mappings as needed
};


const Card = () => {
  const [places, setPlaces] = useState([]);
  const [fontsLoaded] = useFonts({
    "Candara": require("../assets/Candara.ttf")
  });

  const scrollViewRef = useRef(null);


  useEffect(() => {
    async function fetchData() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const response = await fetch('http://192.168.1.41:3001/api/places');
        const data = await response.json();
        setPlaces(data);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    }
    fetchData();
  }, []);

  if (!fontsLoaded || places.length === 0) {
    return null; // Or a loading indicator
  }

  const scrollToNext = () => {
    if (scrollViewRef.current) {
      const newX = scrollViewRef.current.contentOffset.x + 100;
      scrollViewRef.current.scrollTo({ x: newX, animated: true });
    }
  };
  

  return (
    <ScrollView horizontal style={styles.container} ref={scrollViewRef}>
      {places.map(place => (
        <BlurView key={place.id} style={styles.card} intensity={10} tint="light">
          <Text style={styles.text1}>Trip to {place.place}</Text>
          <Text style={styles.text2}>{place.locations} locations</Text>
          <Text style={styles.text3}>Starting from ${place.startingprice}</Text>
          <Image source={imageMapping[place.id]} style={styles.image} />
          <TouchableOpacity onPress={scrollToNext}>
          <View style={styles.button}>
            <Text style={styles.buttontext}>Let's Go</Text>
          </View>
          </TouchableOpacity>
        </BlurView>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 190,
    height: 236,
    borderRadius: 10,
    borderWidth: 0.4,
    borderColor: '#FFF',
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    padding: 10,
    margin: 10,
  },
  text1: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 108,
    left: 15,
    fontFamily: 'Candara',
  },
  text2: {
    color: '#C7C7C7',
    fontSize: 8,
    marginTop: 8,
    left: 15,
    fontFamily: 'Candara',
  },
  text3: {
    color: '#FFF',
    fontSize: 8,
    marginTop: 8,
    left: 15,
    fontFamily: 'Candara',
  },
  image: {
    width: 140,
    height: 90,
    resizeMode: 'cover',
    position: 'absolute',
    top: 10,
    left: 25,
  },
  container: {
    position: "absolute",
    bottom: 80,
  },
  button: {
    height: 30,
    width: 150,
    backgroundColor: 'black',
    left: 10,
    top: 12,
    borderRadius: 16,
    borderColor: "white",
  },
  buttontext: {
    color: 'white',
    fontSize: 8,
    left: 58,
    fontFamily: 'Candara',
    top: 9,
  },
});

export default Card;
