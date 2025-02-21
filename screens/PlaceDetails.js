import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import RecommendedPlaces from '../components/RecommendedPlaces';
import Restaurant from '../components/Restaurant';
import { googleapis } from '../constants/constant';

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
    <View style={styles.container}>
        <Text>Place Details</Text>
        <Image source={locationimage} />
        <Restaurant latitude={latitude} longitude={longitude} isCurrentLocation={false} loc={location}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
