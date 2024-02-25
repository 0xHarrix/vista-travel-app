import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Pass the query to the parent component for handling the search
    onSearch(query);
  };

  return (
    <View style={styles.container}>
        <AntDesign name="search1" size={24} color="black" onPress={handleSearch} />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity>
        <LinearGradient colors={['rgba(45, 189, 110, 1)', 'rgba(136, 223, 91, 1)']} style={styles.menu}>
        <AntDesign name="search1" size={24} color="white" onPress={handleSearch} />
        </LinearGradient>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    top: 80,
    position: "absolute",
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  menu: {
    height: '100%',
    width: 45,
    borderRadius: 16,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    left:10, // Adjust margin if needed
  },
});

export default SearchBar;
