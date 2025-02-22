import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { googleapis } from '../constants/constant';

const Attractions = ({ latitude, longitude, city, isCurrentLocation, loc }) => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    "BlackHanSans": require("../assets/BlackHanSans-Regular.ttf"),
  });

  // Prevent splash screen from hiding until fonts are loaded
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  // Hide splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Fetch attractions when location changes
  useEffect(() => {
    const fetchAttractions = async () => {
      if (!latitude || !longitude) {
        console.error("🚨 Missing latitude or longitude!", { latitude, longitude, loc });
        return;
      }      

      setLoading(true);
      let lat = latitude;
      let long = longitude;

      if (isCurrentLocation && loc) {
        lat = loc.lat;
        long = loc.lng;
      }

      try {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=100000&type=tourist_attraction&keyword=landmark|popular attractions|heritage|famous places&key=${googleapis}`;
        console.log(`🌍 Fetching attractions from: ${url}`);

        const response = await fetch(url);
        const data = await response.json();

        console.log("📌 API Response:", JSON.stringify(data, null, 2));

        if (data.results && data.results.length > 0) {

          setAttractions(data.results);
        } else {
          console.log("📡 API Response:", JSON.stringify(data, null, 2));
          console.warn("⚠️ No attractions found!");
          setAttractions([]);
        }
      } catch (error) {
        console.error("❌ Error fetching attractions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, [latitude, longitude, city]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isCurrentLocation ? "Attractions Nearby" : `Attractions in ${city}`}
      </Text>

      {loading ? (
        <Text style={styles.loadingText}>Loading attractions...</Text>
      ) : attractions.length === 0 ? (
        <Text style={styles.noAttractionsText}>No attractions found.</Text>
      ) : (
        <ScrollView horizontal contentContainerStyle={styles.attractionsContainer}>
          {attractions.map((attraction, index) => (
            <TouchableOpacity key={index} style={styles.attractionCard}>
              {attraction.photos && attraction.photos.length > 0 ? (
                <Image
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${attraction.photos[0].photo_reference}&key=${googleapis}`,
                  }}
                  style={styles.attractionImage}
                />
              ) : (
                <Text>No Image</Text>
              )}
              <View style={styles.overlay} />
              <Text style={styles.attractionName}>{attraction.name}</Text>
              <TouchableOpacity style={styles.circleView}>
                <Image source={require("../assets/Arrow.png")} style={styles.arrow} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  noAttractionsText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
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
    width: '80%',
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
