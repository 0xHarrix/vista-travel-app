import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { firebase_auth } from '../FirebaseAuth';
import Tabbar from '../components/Tabbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import HomeOptions from '../components/homeoptions';
import LocationCard from '../components/Locationcard';
import Attractions from '../components/Attractions';
import Card from '../components/mapcard';
import RecommendedPlaces from '../components/RecommendedPlaces';
import SearchBar from '../components/SearchBar';
import Hotel from '../components/hotel';
import Restaurant from '../components/Restaurant';
import WeatherCard from '../components/WeatherCard';

const { height } = Dimensions.get('window');

const Home = () => {

  const [location, setLocation] = useState(null);
  const [activeTab, setActiveTab] = useState('Attractions');

  const handleLocationUpdate = (locationData) => {
    setLocation(locationData);
  };


  const handleLogout = async () => {
    try {
      await firebase_auth.signOut();
      console.log('Signed Out');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const renderActiveComponent = () => {
    if (activeTab === 'Attractions') {
      return <Attractions location={location}/>;
    } else if (activeTab === 'Hotels') {
      return <Hotel city={location}/>;
    }
    else if (activeTab === 'Restaurant') {
      return <Restaurant city={location} isCurrentLocation={true} />;
    }
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/Vistalogo.png')} style={styles.logoImage} />
        </View>

        {/* Search Bar */}
        <SearchBar />

        {/* Home Options Tabs */}
        <HomeOptions onTabChange={handleTabChange} />

        {/* Location Card */}
        <LocationCard onLocationUpdate={handleLocationUpdate} />

        {/* Weather Card */}
        <WeatherCard />

        {/* Active Tab Content */}
        {renderActiveComponent()}

        {/* Recommended Places */}
        <RecommendedPlaces />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <Tabbar />
    </View>
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
