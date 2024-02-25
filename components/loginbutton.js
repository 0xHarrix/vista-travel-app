// LoginButton.js
import React,{ useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const LoginButton = ({ handleSignIn }) => {
  const [fontsLoaded] = useFonts({
    "BlackHanSans": require("../assets/BlackHanSans-Regular.ttf")
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();

  }, [])

  if(!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <View style={styles.box}>
      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
        <View style={styles.overlapGroup}>
          <Text style={styles.textWrapper}>LOGIN</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 42,
    width: 282,
    marginBottom: 15,
    // Your additional box styles
  },
  loginButton: {
    height: 42,
    width: 284,
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
});

export default LoginButton;
