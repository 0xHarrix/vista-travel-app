import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { getDatabase, ref, get } from 'firebase/database';

const InputName = ({ tagfor, onTextChange }) => {
  const [text, setText] = useState('');
  const [fontsLoaded] = useFonts({
    "BlackHanSans": require("../assets/BlackHanSans-Regular.ttf")
  });

  useEffect(() => {
    async function prepare(){
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();

  }, [])

  if(!fontsLoaded)
  {
    return undefined;
  }
  else{
    SplashScreen.hideAsync();
  }

  const imageSource = tagfor === 'NAME'
    ? require('../assets/Vector.png')
    : require('../assets/Auth.png');

  return (
    <View style={style.box}>
      <View style={style.overlapGroup}>
        <TextInput
          style={style.input}
          placeholder={tagfor}
          placeholderTextColor="#ffffff"
          onChangeText={(newText) => {
            setText(newText);
            onTextChange(tagfor, newText); // Notify the parent component of the text change
          }}
          value={text}
          secureTextEntry={tagfor === 'PASSWORD'}
        />
        <View style={style.rectangle} />
        <View style={style.div} />
        <Image
          style={style.vector}
          source={imageSource}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  box: {
    height: 42,
    width: 282,
    marginBottom: 15,
  },
  overlapGroup: {
    borderRadius: 16,
    backgroundColor:'rgba(114, 155, 236, 0.2)',
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'BlackHanSans',
    letterSpacing: 0,
    lineHeight: 16,
    paddingLeft: 56,
  },
  rectangle: {
    borderRadius: 16,
    height: 42,
    width: 49,
  },
  div: {
    backgroundColor: '#d9d9d921',
    borderRadius: 15,
    height: 42,
    width: 50,
    position: 'absolute',
  },
  vector: {
    height: 24,
    width: 21,
    marginLeft: 15,
    position: 'absolute',
  },
});

export default InputName;
