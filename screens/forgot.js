import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';
import InputTag from '../components/input';
import OtpButton from '../components/sendotpbutton';

const Forgot = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendOTP = async () => {
    try {
      const response = await fetch('http://192.168.1.40:3001/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('OTP sent successfully');
        // Handle success scenario, such as displaying a message to the user
      } else {
        console.error('Failed to send OTP');
        // Handle error scenario, such as displaying an error message to the user
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleTextChange = (tagfor, text) => {
    if (tagfor === 'EMAIL') {
      setEmail(text);
    }
  };

  return (
    <ImageBackground source={require('../assets/Background.png')} style={style.backgroundimage}>
      <View style={style.container}>
        <InputTag tagfor="EMAIL" onTextChange={handleTextChange} />
        <View style={style.flex1}></View>
        <OtpButton sendotp={handleSendOTP} />
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
  flex1:{
    marginTop: 15,
  },
  backgroundimage: {
      flex: 1,
      resizeMode: 'stretch',
  },
});

export default Forgot;
