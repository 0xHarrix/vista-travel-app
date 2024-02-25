import { ImageBackground, StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen3() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/On3.png")} style={styles.backgroundimage}>
      <View style={styles.box}>
      <TouchableOpacity onPress={() => navigation.navigate('Onboarding1')}>
            <Image source={require("../assets/Ellipse.png")} style={styles.ellipse1}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Onboarding2')}>
            <Image source={require("../assets/Ellipse.png")} style={styles.ellipse2}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Onboarding3')}>
            <Image source={require("../assets/Ellipse1red.png")} style={styles.ellipse3}></Image>
          </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Home')}>
        <View style={styles.overlapGroup}>
          <Text style={styles.textWrapper}>Get Started</Text>
        </View>
      </TouchableOpacity>
    </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundimage: {
        flex:1,
        resizeMode: 'cover',
        height:"100%",
        width:"100%",
    },
    box: {
        height: 44,
        width: 162,
        marginBottom: 15,
        position: 'absolute',
        bottom:50,
        left: 110,
        // Your additional box styles
      },
      loginButton: {
        height: 44,
        width: 162,
        // Your additional LOGIN button styles
      },
      overlapGroup: {
        backgroundColor: 'rgba(217,217,217,0.1)',
        borderWidth: 0.4,
        borderColor: '#ffffff',
        borderRadius: 16,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textWrapper: {
        color: '#ffffff',
        fontFamily: 'BlackHanSans',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 0,
        lineHeight: 16,
      },
      ellipse1: {
        position: 'absolute',
        top: 86,
        left: 55,
      },
      ellipse2: {
        position: 'absolute',
        top: 86,
        left: 81,
      },
      ellipse3: {
        position: 'absolute',
        top: 86,
        left: 107,
      },
  });