import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import axios from 'axios';
import * as SplashScreen from 'expo-splash-screen';
import { opencageapi, googleapis } from '../constants/constant';

const LocationCard = ({ onLocationUpdate }) => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [cityImage, setCityImage] = useState(null);
  const [fontsLoaded] = useFonts({
    "BlackHanSans": require("../assets/BlackHanSans-Regular.ttf"),
    "Candara": require("../assets/Candara.ttf")
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({})
        setLocation(location);
        onLocationUpdate(location); // Send location data to the parent component
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!location) return;
  
    (async () => {
      try {
        const response1 = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location.coords.latitude},${location.coords.longitude}&key=${opencageapi}`);
        const data1 = await response1.json();
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=10000&type=tourist_attraction&rankby=prominence&key=${googleapis}`);
        const data = await response.json();
          const photoReference = data.results[0].photos[0].photo_reference;
          setCityImage(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${googleapis}`);
          setCity(data1.results[0].components.city);
      } catch (error) {
        console.error('Error fetching prominent place:', error);
      }
    })();
  }, [location]);
  

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <View style={styles.container2}>
      <Text style={styles.loc}>Currently In</Text>
      <TouchableOpacity style={styles.card}>
        {cityImage ? (
          <Image source={{ uri: cityImage }} style={styles.cityImage} />
        ) : (
          <Image source={require("../assets/travel-to-islands1.png")} style={styles.cityImage} />
        )}
        <View style={styles.overlay} />
        {city && (
          <Text style={styles.cityText}>{city}</Text>
        )}
        <Text style={styles.cityText2}>24 Locations</Text>
        <TouchableOpacity style={styles.changeLocation}><Image source={require("../assets/Edit.png")} style={styles.editicon} />
        <Text style={styles.changelocationText}>Change Location</Text></TouchableOpacity>
        <TouchableOpacity style={styles.circleView}>
          <Image source={require("../assets/Arrow.png")} style={styles.arrow} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

export default LocationCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 220,
    overflow: 'hidden',
  },
  cityText: {
    fontSize: 18,
    color: 'white',
    position: 'absolute',
    bottom: 40,
    left: 10,
    zIndex: 1,
    fontFamily: 'BlackHanSans',
  },
  cityImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  cityText2: {
    fontSize: 12,
    color: 'white',
    position: 'absolute',
    bottom: 20,
    left: 12,
    zIndex: 1,
    fontFamily: 'Candara',
  },
  circleView: {
    width: 70,
    height: 70,
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
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  loc: {
    position: 'absolute',
    top: -30,
    color: 'black',
    zIndex: 1,
    fontFamily: 'Candara',
    fontWeight: 'bold'
  },
  container2: {
    position: 'absolute',
    top: 260,
    width: '90%',
    height: 250,
  },
  changeLocation: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    fontFamily: 'Candara',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
  },
  changelocationText: {
    color: '#2dbd6e',
    fontFamily: 'Candara',
    fontWeight: 'bold',
    marginLeft: 20
  },
  editicon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
  },
});
