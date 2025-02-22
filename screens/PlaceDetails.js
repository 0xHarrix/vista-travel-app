import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import RecommendedPlaces from '../components/RecommendedPlaces';
import Restaurant from '../components/Restaurant';
import { googleapis } from '../constants/constant';
import Hotel from '../components/hotel';
import Attractions from '../components/Attractions';
import Tabbar from '../components/Tabbar';

const { height } = Dimensions.get('window');


export default function PlaceDetails({ route }) {
  const [location, setLocation] = useState(null);
    const navigation = useNavigation();
    const { placeid, place, locationimage, latitude, longitude } = route.params;

    useEffect(() => {
        fetchCityName();
    }, []);

    const fetchCityName = async () => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleapis}`);
        const data = await response.json();
        const city = data.results[0].address_components.find(component => 
            component.types.includes("administrative_area_level_3") || 
            component.types.includes("administrative_area_level_2") || 
            component.types.includes("locality")
        )?.long_name;
        setLocation(city);
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
          <Text>Place Details</Text>
          <Image source={locationimage} />
          <View style={styles.recommended}>
            <View style={styles.restaurant}>
              <Restaurant latitude={latitude} longitude={longitude} isCurrentLocation={false} loc={location}/>
            </View>
            <View style={styles.hotel}>
              <Hotel latitude={latitude} longitude={longitude} isCurrentLocation={false} loc={location}/>
            </View>
            <View style={styles.attraction}>
              <Attractions latitude={latitude} longitude={longitude} isCurrentLocation={false} loc={location}/>
            </View>
          </View>
      <Tabbar/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  restaurant: {
    position: 'absolute',
    top: -1020,
    left:-200,
    width:'100%',
  },
  hotel: {
    position: 'absolute',
    top: -740,
    left:-200,
    width:'100%',
  },
  attraction: {
    position: 'absolute',
    top: -450,
    left:-210,
    width:'100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
