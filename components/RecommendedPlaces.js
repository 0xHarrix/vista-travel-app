import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Touchable, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';
import * as SplashScreen from 'expo-splash-screen';

const imageMapping = {
    1: require('../assets/Manila1.jpg'),
    2: require('../assets/Bali1.jpg'),
    3: require('../assets/Philippines1.jpg'),
    // Add more mappings as needed
};


const RecommendedPlaces = () => {
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
    return null;
  }

  const scrollToNext = () => {
    if (scrollViewRef.current) {
      const newX = scrollViewRef.current.contentOffset.x + 100;
      scrollViewRef.current.scrollTo({ x: newX, animated: true });
    }
  };
  

  return (
    <View style={styles.container3}>
        <Text style={styles.title}>Recommended Places</Text>
    <ScrollView horizontal ref={scrollViewRef}>
      {places.map(place => (
        <TouchableOpacity key={place.id} style={styles.card} intensity={10} tint="light">
  <Image source={imageMapping[place.id]} style={styles.image} />
  <View style={styles.overlay}></View>
  <View style={styles.textContainer}>
    <Text style={styles.text1}>Trip to {place.place}</Text>
    <Text style={styles.text2}>{place.locations} locations</Text>
    <Text style={styles.text3}>Starting from ${place.startingprice}</Text>
  </View>
  <TouchableOpacity style={styles.circleView}>
          <Image source={require("../assets/Arrow.png")} style={styles.arrow} />
          </TouchableOpacity>
</TouchableOpacity>
      ))}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
        width: 180,
        height: 220,
        borderWidth: 0.4,
        borderColor: '#FFF',
        backgroundColor: 'rgba(255, 255, 255, 0.10)',
        marginHorizontal: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 4,
        borderTopRightRadius: 4,
        position: 'relative',
      },
      overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Black overlay with 50% opacity
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 4,
        borderTopRightRadius: 4,
      },
      textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
      },
      text1: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Candara',
      },
      text2: {
        color: '#C7C7C7',
        fontSize: 12,
        fontFamily: 'Candara',
      },
      text3: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'Candara',
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 4,
        borderTopRightRadius: 4,
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
  container3: {
    marginTop: 900,
  },
  title: {
    fontFamily: "Candara",
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 15,
    marginLeft: 20,
  },
  circleView: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: 'rgba(217, 217, 217, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
  },
  arrow: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
});

export default RecommendedPlaces;
