export default {
    expo: {
      name: "vista-travel",
      slug: "vista-travel",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
        bundleIdentifier: "vista-eas",
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff",
        },
        permissions: ["android.permission.DETECT_SCREEN_CAPTURE"],
        config: {
          googleMaps: {
            apiKey: "AIzaSyA0E_xu1VBpJ7gxVvfZ8bMXqmNe3advwes",
          },
        },
        package: "com.harris_samuel.vistatravel",
      },
      web: {
        favicon: "./assets/favicon.png",
      },
      extra: {
        eas: {
          projectId: "307ea7f0-62b5-41f7-95fd-2c20a4453009",
        },
      },
    },
  };
  