import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import InputTag from '../components/input';
import LoginButton from '../components/loginbutton';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; 
import { firebase_auth } from '../FirebaseAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "BlackHanSans": require("../assets/BlackHanSans-Regular.ttf")
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }


  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(firebase_auth, username, password);
      console.log("Success");

    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };


  const handleTextChange = (tagfor, text) => {
    if (tagfor === 'EMAIL') {
      setUsername(text);
    } else if (tagfor === 'PASSWORD') {
      setPassword(text);
    }
  };

  return (
    <ImageBackground source={require('../assets/Background.png')} style={style.backgroundimage}>
      <View style={style.container}>
        <InputTag tagfor="EMAIL" onTextChange={handleTextChange} />
        <InputTag tagfor="PASSWORD" onTextChange={handleTextChange} />
        <View style={style.flex1}>
          <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
            <Text style={style.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={style.user}>New User?</Text>
          </TouchableOpacity>
        </View>
        <LoginButton handleSignIn={handleSignIn} />
        <View>
          <View style={style.line1}></View>
          <Text style={style.loginusing}>OR LOGIN USING</Text>
          <View style={style.line2}></View>
        </View>
        <View style={style.flex}>
          <TouchableOpacity>
            <Image source={require('../assets/FACEBOOKLOGIN.png')} style={style.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/GOOGLELOGIN.png')} style={style.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/TWITTERLOGIN.png')} style={style.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    color: "white",
    fontFamily:'BlackHanSans',
    fontSize: 10,
    marginLeft: 200,
    top:-15,
  },
  forgot: {
    color: "white",
    marginRight:170,
    fontFamily:'BlackHanSans',
    fontSize: 10,
    top: -5,
    marginBottom:0,
  },
  line1: {
    height: 1,
    left: 100,
    backgroundColor: 'white',
    top: 20,
    width: 111,
  },
  line2: {
    height: 1,
    left: -100,
    backgroundColor: 'white',
    top: 10,
    width: 111,
  },
  loginusing: {
    fontSize:8,
    fontFamily: "BlackHanSans",
    color: "white",
    top:15,
    marginLeft:21,
  },
  icon: {
    marginTop: 20,
    marginRight: 10,
    marginLeft:10,
  },
  flex: {
    flexDirection: 'row',
    top:10,
  },
  flex1:{
    marginTop:15,
  },
  backgroundimage: {
      flex:1,
      resizeMode: 'stretch',
  },
});

export default Login;
