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
import Locationcard from '../components/Locationcard';
import Attractions from '../components/Attractions';
import Card from '../components/mapcard';
import RecommendedPlaces from '../components/RecommendedPlaces';
import SearchBar from '../components/SearchBar';
import Hotel from '../components/hotel';
import Restaurant from '../components/Restaurant';

const { height } = Dimensions.get('window');

const Home = () => {

  const [location, setLocation] = useState(null);
  const [activeTab, setActiveTab] = useState('Attractions');

  const handleLocationUpdate = (locationData) => {
    setLocation(locationData);
    console.log(locationData);
  };


  const handleLogout = async () => {
    try {
      await firebase_auth.signOut();
      console.log('Signed Out');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const renderComponent = () => {
    if (activeTab === 'Attractions') {
      return <Attractions location={location} />;
    } else if (activeTab === 'Hotels') {
      return <Hotel city={location}/>;
    }
    else if (activeTab === 'Restaurant') {
      return <Restaurant city={location}/>;
    }
    // You can add more conditions for other options if needed
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logo}>
          <Image source={require("../assets/Vistalogo.png")} style={styles.logoImage} />
        </View>
        <SearchBar/>
        <HomeOptions  onTabChange={handleTabChange} />
        <Locationcard onLocationUpdate={handleLocationUpdate} />
        {renderComponent()}
        <RecommendedPlaces />
      </ScrollView>
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
    paddingBottom: height * 0.1, // Adjust the padding to accommodate Tabbar
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    left: 16,
    top: 40,
    height: 44,
    width: 59,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Home;
