import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import NamePage from './screens/NamePage';
import Home from './screens/Home'; // Import your Home component
import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from './FirebaseAuth';
import Explore from './screens/Explore';
import Notifications from './screens/Notifications';
import Globe from './screens/Globe';
import Profile from './screens/Profile';
import OnboardingScreen1 from './screens/OnboardingScreen1';
import OnboardingScreen2 from './screens/OnboardingScreen2';
import OnboardingScreen3 from './screens/OnboardingScreen3';
import Otp from './screens/opt';
import Forgot from './screens/forgot';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check the user's authentication status when the app starts
    const unsubscribe = onAuthStateChanged(firebase_auth, (authUser) => {
      setUser(authUser);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // User is logged in, show the Home stack
          <>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Explore' component={Explore} />
            <Stack.Screen name='Notifications' component={Notifications} />
            <Stack.Screen name='Globe' component={Globe} />
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='Onboarding1' component={OnboardingScreen1} />
            <Stack.Screen name='Onboarding2' component={OnboardingScreen2} />
            <Stack.Screen name='Onboarding3' component={OnboardingScreen3} />
            <Stack.Screen name='NamePage' component={NamePage} />
            {/* Add other screens for the Home stack */}
          </>
        ) : (
          // User is not logged in, show the Authentication stack
          <>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Forgot' component={Forgot} />
            {/* Add other screens for the Authentication stack */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
