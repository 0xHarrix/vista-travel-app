import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { googleapis } from '../constants/constant';

const HotelsInCity = ({ city }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelsInCity = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+in+${city}&key=${googleapis}`
        );
        const data = await response.json();
  
        // Sort the hotels based on their ratings in descending order
        const sortedHotels = data.results.sort((a, b) => b.rating - a.rating);
  
        setHotels(sortedHotels);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setLoading(false);
      }
    };
  
    fetchHotelsInCity();
  }, [city]);
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container4}>
      <Text style={styles.title}>Hotels in {city}</Text>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        {hotels.map((hotel, index) => (
          <TouchableOpacity key={index} style={styles.hotelCard}>
            {hotel.photos && hotel.photos.length > 0 && (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotel.photos[0].photo_reference}&key=${googleapis}`
                }}
                style={styles.hotelImage}
              />
            )}
            <View style={styles.overlay}>
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

            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container4: {
    flexGrow: 1,
    position: 'absolute',
    marginTop: 720,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    alignItems: 'center',
  },
  hotelCard: {
    marginRight: 20,
    borderRadius: 15,
    overflow: 'hidden',
    width: 180,
    height: 220,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  hotelImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  hotelRating: {
    fontSize: 14,
    color: '#fff',
    position: 'absolute',
    top: 10,
    left: 10,
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

export default HotelsInCity;
