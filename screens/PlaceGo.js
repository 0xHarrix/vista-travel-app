import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-web';
import Tabbar from '../components/Tabbar';
import { useNavigation } from '@react-navigation/native';
import { googleapis } from '../constants/constant';

const PlaceGo = ({ route }) => {
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [cityImage, setCityImage] = useState(null);
    const navigation = useNavigation();
    const { placeid, place, locationimage, latitude, longitude } = route.params;
        useEffect(() => {
            fetchCityDetails();
        }, []);
    
        const fetchCityDetails = async () => {
            try {
                console.log("Fetching city details...");
        
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleapis}`
                );
                const data = await response.json();
                console.log("Geocode API response:", data);
        
                const cityName = data.results[0]?.address_components.find(component =>
                    component.types.includes("administrative_area_level_3") ||
                    component.types.includes("administrative_area_level_2") ||
                    component.types.includes("locality")
                )?.long_name;
        
                const countryName = data.results[0]?.address_components.find(component =>
                    component.types.includes("country")
                )?.long_name;
        
                setCity(cityName);
                setCountry(countryName);
        
                console.log("City:", cityName, "Country:", countryName);
        
                const response2 = await fetch(
                    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=10000&type=tourist_attraction&rankby=prominence&key=${googleapis}`
                );
                const popularPlaces = await response2.json();
                console.log("Places API response:", popularPlaces);
        
                if (popularPlaces.results?.length > 0) {
                    const firstPlace = popularPlaces.results[0];
                    const photoReference = firstPlace?.photos?.[0]?.photo_reference;
                    if (photoReference) {
                        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${googleapis}`;
                        console.log("Generated Image URL:", imageUrl);
                        setCityImage(imageUrl);
                    } else {
                        console.warn("No photo found for the city.");
                        setCityImage(null);
                    }
                } else {
                    console.warn("No tourist attractions found.");
                    setCityImage(null);
                }
            } catch (error) {
                console.error("Error fetching city details:", error);
            }
        };
        
        
    return (
        <View style={styles.container}>
            <Image source={{ uri: cityImage }} style={styles.cityImage} />
            <Text>Welcome to PlaceGo Screen!</Text>
            <Text>City: {city}</Text>
            <Text>Country: {country}</Text>
            <Tabbar/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PlaceGo;