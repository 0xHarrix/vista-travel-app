import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; 

const Attractions = ({ location }) => {
  const [attractions, setAttractions] = useState([]);
  const [fontsLoaded] = useFonts({
    "BlackHanSans": require("../assets/BlackHanSans-Regular.ttf")
  });

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

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        if (location) {
          const { latitude, longitude } = location.coords;
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=45000&type=tourist_attraction&rankby=prominence&key=AIzaSyA0E_xu1VBpJ7gxVvfZ8bMXqmNe3advwes`
          );
          const data = await response.json();
          setAttractions(data.results);
        }
      } catch (error) {
        console.error('Error fetching attractions:', error);
      }
    };

    fetchAttractions();
  }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attractions Nearby</Text>
      <ScrollView horizontal contentContainerStyle={styles.attractionsContainer}>
        {attractions.map((attraction, index) => (
          <TouchableOpacity key={index} style={styles.attractionCard}>
            {attraction.photos && attraction.photos.length > 0 && (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${attraction.photos[0].photo_reference}&key=AIzaSyA0E_xu1VBpJ7gxVvfZ8bMXqmNe3advwes`,
                }}
                style={styles.attractionImage}
              />
            )}
            <View style={styles.overlay}></View>
            <Text style={styles.attractionName}>{attraction.name}</Text>
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
    top: 1010,
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
});

export default Attractions;
