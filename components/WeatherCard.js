import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { weatherapi } from '../constants/constant';

const WeatherCard = () => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [celtemperature, setCeltemperature] = useState(null);
  const [fartemperature, setFartemperature] = useState(null);
  const [condition, setCondition] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [fontsLoaded] = useFonts({
    BlackHanSans: require('../assets/BlackHanSans-Regular.ttf'),
    Candara: require('../assets/Candara.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    })();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (location) {
          const { latitude, longitude } = location.coords;
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${weatherapi}&q=${latitude},${longitude}`
          );
          const weatherdata = await response.json();
          setCity(weatherdata.location.name);
          setCeltemperature(Math.round(weatherdata.current.temp_c));
          setFartemperature(Math.round(weatherdata.current.temp_f));
          setCondition(weatherdata.current.condition.text);
          setHumidity(weatherdata.current.humidity);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [location]);

  const handleToggleTemp = () => {
    setIsCelsius(!isCelsius);
  };

  const getWeatherImage = (condition) => {
    if (
      condition === "Patchy rain possible" ||
      condition === "Patchy light drizzle" ||
      condition === "Light drizzle" ||
      condition === "Freezing drizzle" ||
      condition === "Heavy freezing drizzle" ||
      condition === "Patchy light rain" ||
      condition === "Light rain" ||
      condition === "Moderate rain at times" ||
      condition === "Moderate rain" ||
      condition === "Heavy rain at times" ||
      condition === "Heavy rain" ||
      condition === "Light freezing rain" ||
      condition === "Moderate or heavy freezing rain" ||
      condition === "Light rain shower" ||
      condition === "Moderate or heavy rain shower" ||
      condition === "Torrential rain shower" ||
      condition === "Patchy light rain with thunder" ||
      condition === "Moderate or heavy rain with thunder"
    ) {
      return require('../assets/Rainy.png'); // Replace with the path to your rainy image
    } else if (
      condition === "Sunny" ||
      condition === "Clear"
    ) {
      return require('../assets/sunny.png'); // Replace with the path to your sunny image
    } else if (
      condition === "Partly cloudy"
    ) {
      return require('../assets/sunny-cloudy.png'); // Replace with the path to your cloudy-sunny image
    } else if (
      condition === "Cloudy" ||
      condition === "Overcast" ||
      condition === "Mist" ||
      condition === "Freezing fog" ||
      condition === "Fog"
    ) {
      return require('../assets/Cloudy.png'); // Replace with the path to your cloudy image
    } else if (
      condition === "Patchy snow possible" ||
      condition === "Light snow" ||
      condition === "Patchy light snow" ||
      condition === "Moderate snow" ||
      condition === "Patchy moderate snow" ||
      condition === "Heavy snow" ||
      condition === "Patchy heavy snow" ||
      condition === "Blowing snow" ||
      condition === "Blizzard" ||
      condition === "Ice pellets" ||
      condition === "Light sleet" ||
      condition === "Moderate or heavy sleet" ||
      condition === "Light sleet showers" ||
      condition === "Moderate or heavy sleet showers" ||
      condition === "Light snow showers" ||
      condition === "Moderate or heavy snow showers" ||
      condition === "Light showers of ice pellets" ||
      condition === "Moderate or heavy showers of ice pellets" ||
      condition === "Patchy light snow with thunder" ||
      condition === "Moderate or heavy snow with thunder"
    ) {
      return require('../assets/snowy.png'); // Replace with the path to your snowy image
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

export default WeatherCard;
