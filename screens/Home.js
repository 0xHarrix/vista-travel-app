import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Image, ScrollView, Dimensions 
} from 'react-native';
import { firebase_auth } from '../FirebaseAuth';
import Tabbar from '../components/Tabbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import HomeOptions from '../components/homeoptions';
import LocationCard from '../components/Locationcard';
import Attractions from '../components/Attractions';
import RecommendedPlaces from '../components/RecommendedPlaces';
import SearchBar from '../components/SearchBar';
import Hotel from '../components/hotel';
import Restaurant from '../components/Restaurant';
import WeatherCards from '../components/WeatherCards';

const { height } = Dimensions.get('window');

const Home = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [activeTab, setActiveTab] = useState('Attractions');
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.selectedLocation) {
      setLocation(route.params.selectedLocation);
    } else {
      fetchCurrentLocation();
    }
  }, [route.params?.selectedLocation]);

  const fetchCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Location permission not granted.");
      return;
    }
  
    try {
      let loc = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
  
      if (reverseGeocode.length > 0) {
        const cityName = reverseGeocode[0].city || "Unknown City";
        setLocation({
          city: cityName,
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
        });
      } else {
        console.error("Reverse geocoding failed.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };
  

  const handleLogout = async () => {
    try {
      await firebase_auth.signOut();
      console.log('Signed Out');
      navigation.navigate("Login"); // Navigate to login screen after logout
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const renderActiveComponent = () => {
    if (!location) return <Text>Loading location...</Text>;

    return activeTab === 'Attractions' ? (
      <Attractions latitude={location?.lat} longitude={location?.lng} city={location.city} isCurrentLocation={location.city === "Current Location"} loc={location} />
    ) : activeTab === 'Hotels' ? (
<Hotel latitude={location?.lat} longitude={location?.lng} city={location} isCurrentLocation={location.city === "Current Location"} loc={location.city} />
    ) : (
      <Restaurant latitude={location?.lat} longitude={location?.lng} city={location} isCurrentLocation={location.city === "Current Location"} loc={location.city} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/Vistalogo.png')} style={styles.logoImage} />
        </View>

        {/* Search Bar */}
        <SearchBar />

        {/* Home Options Tabs */}
        <HomeOptions activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Location Card */}
{/* Ensure location is not null before passing it */}
{location ? <LocationCard location={location} /> : <Text>Fetching location...</Text>}

        {/* Weather Card */}
        <WeatherCards location={location} />

        {/* Active Tab Content */}
        {renderActiveComponent()}

        {/* Recommended Places */}
        <RecommendedPlaces location={location} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <Tabbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: height * 0.1,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  logoImage: {
    width: 59,
    height: 44,
    resizeMode: 'contain',
  },
});

export default Home;
