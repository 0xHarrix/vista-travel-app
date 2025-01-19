import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const Otp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGenerateOTP = async () => {
    try {
      await axios.post('http://192.168.1.41:3000/generate-otp', { phoneNumber });
      alert('OTP generated successfully. Check your phone for the OTP.');
    } catch (error) {
      alert('Failed to generate OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Your Phone Number:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="phone-pad"
      />
      <Button title="Generate OTP" onPress={handleGenerateOTP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Otp;
