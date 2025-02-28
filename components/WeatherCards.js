import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { weatherapi } from '../constants/constant';

const WeatherCards = ({ location }) => {
  const [city, setCity] = useState(null);
  const [celtemperature, setCeltemperature] = useState(null);
  const [fartemperature, setFartemperature] = useState(null);
  const [condition, setCondition] = useState("Loading..."); // Default text instead of null
  const [humidity, setHumidity] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${weatherapi}&q=${location.lat},${location.lng}`
      );
      const weatherdata = await response.json();
      setCity(weatherdata.location.name);
      setCeltemperature(Math.round(weatherdata.current.temp_c));
      setFartemperature(Math.round(weatherdata.current.temp_f));
      setCondition(weatherdata.current.condition.text);
      setHumidity(weatherdata.current.humidity);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleToggleTemp = () => {
    setIsCelsius(!isCelsius);
  };

  const getWeatherImage = (condition) => {
    const lowerCaseCondition = condition.toLowerCase(); // Normalize case for comparison
  
    const rainyConditions = [
      "patchy rain possible", "patchy light drizzle", "light drizzle", "freezing drizzle",
      "heavy freezing drizzle", "patchy light rain", "light rain", "moderate rain at times",
      "moderate rain", "heavy rain at times", "heavy rain", "light freezing rain",
      "moderate or heavy freezing rain", "light rain shower", "moderate or heavy rain shower",
      "torrential rain shower", "patchy light rain with thunder", "moderate or heavy rain with thunder",
      "rain", "drizzle", "shower"
    ];
  
    const sunnyConditions = ["sunny", "clear", "sun"];
  
    const partlyCloudyConditions = ["partly cloudy", "partly sunny", "partly clear"];
  
    const cloudyConditions = [
      "cloudy", "overcast", "mist", "freezing fog", "fog", "hazy", "haze", "smoky", "smog"
    ];
  
    const snowyConditions = [
      "patchy snow possible", "light snow", "patchy light snow", "moderate snow",
      "patchy moderate snow", "heavy snow", "patchy heavy snow", "blowing snow",
      "blizzard", "ice pellets", "light sleet", "moderate or heavy sleet",
      "light sleet showers", "moderate or heavy sleet showers", "light snow showers",
      "moderate or heavy snow showers", "light showers of ice pellets",
      "moderate or heavy showers of ice pellets", "patchy light snow with thunder",
      "moderate or heavy snow with thunder", "snow", "sleet", "ice"
    ];
  
    if (rainyConditions.some((c) => lowerCaseCondition.includes(c))) {
      return require("../assets/Rainy.png");
    } else if (sunnyConditions.some((c) => lowerCaseCondition.includes(c))) {
      return require("../assets/sunny.png");
    } else if (partlyCloudyConditions.some((c) => lowerCaseCondition.includes(c))) {
      return require("../assets/sunny-cloudy.png");
    } else if (cloudyConditions.some((c) => lowerCaseCondition.includes(c))) {
      return require("../assets/Cloudy.png");
    } else if (snowyConditions.some((c) => lowerCaseCondition.includes(c))) {
      return require("../assets/snowy.png");
    }
    };
  
  


  return (
    <TouchableOpacity style={styles.cardContainer}>
      <ImageBackground style={styles.card} source={require('../assets/weather-background.png')}>
        <View style={styles.container}>
          <View style={styles.weathericon}>
            <View style={styles.temptoggle}>
              <Text style={styles.temperature}>
                {isCelsius ? celtemperature : fartemperature}°
              </Text>
              <Text style={styles.primarytemp}>{isCelsius ? 'C' : 'F'}</Text>
              <TouchableOpacity style={styles.toggle} onPress={handleToggleTemp}>
                <Text style={styles.secondarytemp}>{isCelsius ? 'F' : 'C'}</Text>
              </TouchableOpacity>
            </View>
            <Image source={getWeatherImage(condition)} />
          </View>
          <View style={styles.weatherinfo}>
            <View style={styles.location}>
              <Image source={require('../assets/location-weather.png')} style={styles.locationicon} />
              <Text style={styles.city}>{city}</Text>
            </View>
            <Text style={styles.description}>Weather: {condition}</Text>
            <Text style={styles.humidity}>Humidity: {humidity}%</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: 30,
    zIndex: 1,
    top: 500,
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    height: 200,
    width: 400,
  },
  city: {
    fontSize: 18,
  },
  temperature: {
    fontSize: 32,
  },
  description: {
    fontSize: 18,
    marginTop: 4,
  },
  weathericon: {
    alignItems: 'center',
    marginRight: 70,
  },
  weatherinfo: {
    position: 'relative',
    right: 20,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationicon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  humidity: {
    fontSize: 18,
    marginTop: 4,
  },
  temptoggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggle: {
    backgroundColor: 'rgba(151, 151, 151, 0.27)',
    borderRadius: 5,
    padding: 5,
    marginLeft: 5,
  },
  primarytemp: {
    fontSize: 18,
    marginLeft: 7,
    marginRight: 7,
  },
  secondarytemp: {
    fontSize: 18,
  },
});

export default WeatherCards;
