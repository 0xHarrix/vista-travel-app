import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const HomeOptions = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('Attractions');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <View style={styles.container1}>
      <TouchableOpacity onPress={() => handleTabChange('Attractions')}>
        <View style={[styles.menu, activeTab === 'Attractions' ? styles.activeMenu : null]}>
          {activeTab === 'Attractions' ? (
            <LinearGradient colors={['rgba(45, 189, 110, 1)', 'rgba(136, 223, 91, 1)']} style={styles.linearGradient}>
              <Image source={require("../assets/Place.png")} style={styles.menuText1} />
              <Text style={styles.menuText}>Place</Text>
            </LinearGradient>
          ) : (
            <>
              <Image source={require("../assets/Place1.png")} style={styles.menuText1} />
              <Text style={styles.menut}>Place</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabChange('Hotels')}>
        <View style={[styles.menu, activeTab === 'Hotels' ? styles.activeMenu : null]}>
          {activeTab === 'Hotels' ? (
            <LinearGradient colors={['rgba(45, 189, 110, 1)', 'rgba(136, 223, 91, 1)']} style={styles.linearGradient}>
              <Image source={require("../assets/Hotels1.png")} style={styles.menuText11} />
              <Text style={styles.menuText}>Hotels</Text>
            </LinearGradient>
          ) : (
            <>
              <Image source={require("../assets/Hotels.png")} style={styles.menuText1} />
              <Text style={styles.menut}>Hotels</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabChange('Restaurant')}>
        <View style={[styles.menu, activeTab === 'Restaurant' ? styles.activeMenu : null]}>
          {activeTab === 'Restaurant' ? (
            <LinearGradient colors={['rgba(45, 189, 110, 1)', 'rgba(136, 223, 91, 1)']} style={styles.linearGradient}>
              <Image source={require("../assets/Restaurant1.png")} style={styles.menuText12} />
              <Text style={styles.menut11}>Restaurant</Text>
            </LinearGradient>
          ) : (
            <>
              <Image source={require("../assets/Restaurant.png")} style={styles.menuText1} />
              <Text style={styles.menut1}>Restaurant</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeOptions;

const styles = StyleSheet.create({
  menu: {
    width: 120,
    height: 45,
    borderRadius: 30,
    marginHorizontal: 5,
    marginVertical: 20,
    backgroundColor: 'white', // Default background color for non-active tabs
  },
  activeMenu: {
    backgroundColor: 'transparent', // Set background to transparent for the active tab
  },
  linearGradient: {
    flex: 1,
    borderRadius: 30,
  },
  menuText: {
    color: 'white',
    position: 'absolute',
    top: 16,
    left: 50,
    fontSize: 13,
    fontFamily: 'BlackHanSans',
  },
  menut: {
    position: 'absolute',
    top: 16,
    left: 50,
    color: '#2DBD6E', // Font color for non-active tabs
    fontSize: 13,
    fontFamily: 'BlackHanSans',
  },
  menut1: {
    position: 'absolute',
    top: 16,
    left: 35,
    color: '#2DBD6E', // Font color for non-active tabs
    fontSize: 12,
    fontFamily: 'BlackHanSans',
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 130,
  },
  menuText1: {
    top: 10,
    left: 7,
  },
  menuText11: {
    top: 16,
    left: 7,
  },
  menut11: {
    color: 'white',
    position: 'absolute',
    top: 16,
    left: 35,
    fontSize: 12,
    fontFamily: 'BlackHanSans',
  },
  menuText12: {
    top: 14,
    left: 10,
  },
});
