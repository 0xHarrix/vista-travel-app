import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { googleapis } from '../constants/constant';

const Restaurant = ({ latitude, longitude, city, isCurrentLocation, loc }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                let lat = latitude;
                let long = longitude;

                if (city?.coords) {
                    lat = city.coords.latitude;
                    long = city.coords.longitude;
                }

                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=45000&type=restaurant&rankby=prominence&key=${googleapis}`
                );
                const data = await response.json();

                const sortedRestaurants = data.results.sort((a, b) => b.rating - a.rating);

                setRestaurants(sortedRestaurants);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, [city]);

    return (
        <View style={styles.container}>
            {isCurrentLocation ? (
                <Text style={styles.title}>Restaurants Nearby</Text>
            ) : (
                <Text style={styles.title}>Restaurants in {loc}</Text>
            )}
            <ScrollView horizontal contentContainerStyle={styles.placesContainer}>
                {restaurants.map((restaurant, index) => (
                    <TouchableOpacity key={index} style={styles.placeCard}>
                        {restaurant.photos && restaurant.photos.length > 0 && (
                            <Image
                                source={{
                                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${googleapis}`,
                                }}
                                style={styles.placeImage}
                            />
                        )}
                        <View style={styles.overlay}></View>
                        <Text style={styles.placeName}>{restaurant.name}</Text>
                        <Text style={styles.starRating1}>{restaurant.rating}</Text>
                        <Text style={styles.starRating}>
                            {'★'.repeat(Math.floor(restaurant.rating)) + '☆'.repeat(5 - Math.ceil(restaurant.rating))}
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
  placesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      paddingVertical: 10,
  },
  placeCard: {
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
  placeImage: {
      width: '100%',
      height: '100%',
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
  placeName: {
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

export default Restaurant;
