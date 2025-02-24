import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from './FirebaseAuth';

// Screens
import Login from './screens/Login';
import Register from './screens/Register';
import NamePage from './screens/NamePage';
import Home from './screens/Home';
import Explore from './screens/Explore';
import Notifications from './screens/Notifications';
import Globe from './screens/Globe';
import Profile from './screens/Profile';
import OnboardingScreen1 from './screens/OnboardingScreen1';
import OnboardingScreen2 from './screens/OnboardingScreen2';
import OnboardingScreen3 from './screens/OnboardingScreen3';
import Forgot from './screens/forgot';
import PlaceDetails from './screens/PlaceDetails';
import ChangeLocation from './screens/ChangeLocation';
import PlaceGo from './screens/PlaceGo';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false); // Track if the user has completed registration

  useEffect(() => {
    // Check the user's authentication status when the app starts
    const unsubscribe = onAuthStateChanged(firebase_auth, (authUser) => {
      setUser(authUser);
      setLoading(false); // Stop loading once we have the auth state

      if (authUser) {
        // Check if the user has completed onboarding
        // For example, using Firestore or AsyncStorage to check registration status
        const checkRegistrationStatus = async () => {
          // Retrieve the registration status from Firestore or AsyncStorage
          // Assuming 'isRegistered' is a flag in Firestore or AsyncStorage
          const registrationStatus = await checkUserRegistrationStatus(authUser.uid);
          setIsRegistered(registrationStatus);
        };

        checkRegistrationStatus();
      } else {
        setIsRegistered(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; // You can show a loading spinner here while waiting for authentication state
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Screens shown before authentication */}
        {!user ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            {/* After login, show onboarding if the user is registered */}
            {!isRegistered ? (
              <>
                <Stack.Screen name="NamePage" component={NamePage} />
                <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
                <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
                <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
              </>
            ) : (
              <>
                {/* Protected screens after user is registered and logged in */}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Explore" component={Explore} />
                <Stack.Screen name="Notifications" component={Notifications} />
                <Stack.Screen name="Globe" component={Globe} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
                <Stack.Screen name="ChangeLocation" component={ChangeLocation} />
                <Stack.Screen name="PlaceGo" component={PlaceGo} />
              </>
            )}
          </>
        )}

        {/* Forgot screen can always be accessed */}
        <Stack.Screen name="Forgot" component={Forgot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Helper function to check user registration status
const checkUserRegistrationStatus = async (uid) => {
  // Example logic to retrieve registration status from Firestore or AsyncStorage
  // This can be replaced with your Firestore or AsyncStorage code.
  // Here, you might fetch a user document from Firestore and check a field like `isRegistered`.
  
  try {
    // Firestore example:
    // const userDoc = await firestore().collection('users').doc(uid).get();
    // return userDoc.exists && userDoc.data().isRegistered;

    // For simplicity, assume user is registered.
    // You can replace this with actual logic.
    return true; // Replace this with actual logic to check if the user is registered
  } catch (error) {
    console.error('Error checking registration status:', error);
    return false;
  }
};
