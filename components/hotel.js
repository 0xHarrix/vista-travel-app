import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { googleapis } from '../constants/constant'; 

const Hotel = ({ city }) => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchHotelsInCity = async () => {
        try {
        const { latitude, longitude } = city.coords;
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=45000&type=lodging&rankby=prominence&key=${googleapis}`
          );
          const data = await response.json();
    
          setHotels(data.results);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching hotels:', error);
          setLoading(false);
        }
      };
    
      fetchHotelsInCity();
    }, [city]);
    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotels Nearby</Text>
      <ScrollView horizontal contentContainerStyle={styles.attractionsContainer}>
      {hotels.map((hotel, index) => (
          <TouchableOpacity key={index} style={styles.attractionCard}>
            {hotel.photos && hotel.photos.length > 0 && (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotel.photos[0].photo_reference}&key=${googleapis}`,
                }}
                style={styles.attractionImage}
              />
            )}
            <View style={styles.overlay}></View>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <Text style={styles.starRating1}>
                {hotel.rating}
              </Text>

              <Text style={styles.starRating}>
  {'★'.repeat(Math.floor(hotel.rating)) + '☆'.repeat(5 - Math.ceil(hotel.rating))}
</Text>
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
  container: {
    flexGrow: 1,
    marginTop: 720,
    position: 'absolute',
  },
  title: {
    fontFamily: "Candara",
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
    marginLeft: 20,
  },
  attractionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  attractionCard: {
    width: 180,
    height: 220,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  attractionImage: {
    width: '100%',
    height: '100%',
  },
  attractionName: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    color: '#fff',
    padding: 10,
    fontSize: 13,
    textAlign: 'left',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    fontFamily: 'BlackHanSans',
    width: '80%'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
  hotelName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: 120,
    left: 10,
    textAlign: 'left',
  },
  starRating: {
    fontSize: 20,
    color: '#fff',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  starRating1: {
    fontSize: 14,
    color: '#fff',
    position: 'absolute',
    bottom: 35,
    left: 10,
  },
});

export default Hotel;