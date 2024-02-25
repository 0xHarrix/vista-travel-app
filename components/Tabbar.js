import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

const Tabbar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [activeTab, setActiveTab] = useState(isFocused ? route.name : null);

  useEffect(() => {
    if (isFocused) {
      setActiveTab(route.name);
    }
  }, [isFocused, route.name]);

  const tabData = [
    { name: 'Home', iconActive: require('../assets/HomeActivated.png'), iconInactive: require('../assets/Home.png') },
    { name: 'Explore', iconActive: require('../assets/ExploreActivated.png'), iconInactive: require('../assets/Explore.png') },
    { name: 'Notifications', iconActive: require('../assets/NotificationsActivated.png'), iconInactive: require('../assets/Notifications.png') },
    { name: 'Globe', iconActive: require('../assets/GlobeActivated.png'), iconInactive: require('../assets/Globe.png') },
    { name: 'Profile', iconActive: require('../assets/ProfileActivated.png'), iconInactive: require('../assets/Profile.png') },
  ];

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    navigation.navigate(tabName);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.image}></View>
      </View>
      <View style={styles.group}>
        {tabData.map((tab) => (
          <Pressable key={tab.name} onPress={() => handleTabPress(tab.name)}>
            <Image source={activeTab === tab.name ? tab.iconActive : tab.iconInactive} style={styles.tabIcon} />
          </Pressable>
        ))}
      </View>
    </>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    position:"absolute",
    bottom:0,
    width: "100%",
  },
  group: {
    position: 'absolute',
    bottom: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: '100%',
    height: 65,
    backgroundColor: 'black',
    borderTopLeftRadius:26,
    borderTopRightRadius:26,
  },
  tabIcon: {
    marginHorizontal: 20,
  },
});

export default Tabbar;
