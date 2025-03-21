import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Topbar from '../../components/Topbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/config/firebase';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Bookings = () => {
  const [user] = useAuthState(auth);
  const [isUser, setIsUser] = useState(false);
  
  useEffect(() => {
    setIsUser(!!user);
  }, [user]);
  
  if (!isUser) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center">
          <Text className="text-3xl font-bold mb-5">You are Not Logged In</Text>
          <TouchableOpacity 
            onPress={() => router.push('/login')}
            className="mt-3"
          >
            <Text className="bg-[#FEC110] px-4 py-2 rounded-md font-semibold">Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* <Topbar /> */}
      <ScrollView className="flex-1">
        <View className="p-4 mt-7">
          <Text className="text-2xl font-bold mb-4">Your Bookings</Text>
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <Text className="text-gray-500 text-center">No bookings found</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Bookings;