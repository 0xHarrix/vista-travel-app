import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import axios from 'axios';
import * as SplashScreen from 'expo-splash-screen';
import { opencageapi, googleapis } from '../constants/constant';
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";



const LocationCard = ({ location }) => { // Receive location as prop
  const [city, setCity] = useState(null);
  const [cityImage, setCityImage] = useState(null);
  const navigation = useNavigation();
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
    if (!location) return;

    (async () => {
      try {
        const response1 = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location.lat},${location.lng}&key=${opencageapi}`);
        const response2 = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=10000&type=tourist_attraction&rankby=prominence&key=${googleapis}`);        

        if (response2.data.results.length > 0) {
          const photoReference = response2.data.results[0].photos?.[0]?.photo_reference;
          setCityImage(photoReference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${googleapis}` : null);
        }

        setCity(response1.data.results[0].components.city);
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    })();
  }, [location]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const redirectToChangeLocation = () => {
    navigation.navigate('ChangeLocation');
  }

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
        {city && <Text style={styles.cityText}>{city}</Text>}
        <Text style={styles.cityText2}>24 Locations</Text>
        <TouchableOpacity style={styles.changeLocation}>
          <Text style={styles.changelocationText} onPress={redirectToChangeLocation}>Change Location</Text>
        </TouchableOpacity>
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
  },
  changelocationText: {
    color: '#2dbd6e',
    fontFamily: 'Candara',
    fontWeight: 'bold',
  },
  editicon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
  },
});