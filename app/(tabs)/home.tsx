import { View, Text, ScrollView, Animated, TouchableOpacity } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Topbar from '../../components/Topbar';
import Services from '../../components/Services';
import Assurance from '../../components/Assurance';
import Customer from '../../components/Customer';
import Footer from '../../components/Footer';
import { auth } from '@/config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';

const HEADER_HEIGHT = 80;

const Home = () => {
  const [user] = useAuthState(auth);
  const [isUser, setIsUser] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetY = useRef(new Animated.Value(0)).current;
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetY
    ),
    0,
    HEADER_HEIGHT
  );

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  // Use useEffect to update isUser state when user changes
  useEffect(() => {
    setIsUser(!!user);
  }, [user]);

  const handleAuth = () => {
    if (isUser) {
      // Handle logout
      signOut(auth).then(() => {
        console.log('User signed out');
      }).catch((error) => {
        console.error('Sign out error:', error);
      });
    } else {
      // Navigate to login
      router.push('/login');
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <TouchableOpacity 
        onPress={handleAuth}
        className="absolute bottom-5 right-5 z-50 bg-[#FEC110] p-3 rounded-full shadow-md"
      >
        {isUser ? (
          <MaterialIcons name="logout" size={24} color="black" />
        ) : (
          <MaterialIcons name="login" size={24} color="black" />
        )}
      </TouchableOpacity>
      
      <Animated.View 
        className="absolute top-0 left-0 right-0 z-50 bg-[#FEC110]"
        style={{ 
          transform: [{ translateY: headerTranslate }],
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        }}
      >
        <Topbar />
      </Animated.View>

      <Animated.ScrollView 
        className="flex-1"
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
      >
        <Services/>
        <Assurance/>
        <Customer/>
        <Footer/>
      </Animated.ScrollView>
    </View>
  );
};

export default Home;