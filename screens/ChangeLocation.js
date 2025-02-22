import Tabbar from "../components/Tabbar";
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { googleapis } from "../constants/constant"; // Store your API key here

const ChangeLocation = ({ route }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
        {
          params: {
            input: text,
            key: googleapis,
            types: "(cities)",
          },
        }
      );
      setSuggestions(response.data.predictions);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleSelectLocation = async (placeId) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json`,
        {
          params: {
            place_id: placeId,
            key: googleapis,
          },
        }
      );

      const locationData = response.data.result.geometry.location;
      const city = response.data.result.name;

      navigation.navigate("Home", {
        selectedLocation: { city, lat: locationData.lat, lng: locationData.lng },
      });
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <AntDesign name="search1" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Search for a city..."
          value={query}
          onChangeText={handleSearch}
          onSubmitEditing={() => handleSearch(query)}
        />
      </View>

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => handleSelectLocation(item.place_id)}
          >
            <Text style={styles.suggestionText}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

      <Tabbar />
    </View>
  );
};

export default ChangeLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchbar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    paddingHorizontal: 10,
    width: "90%",
    marginTop: 40,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "90%",
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
});
