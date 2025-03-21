import { View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
// import Topbar from '../../components/Topbar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {

  const [user] = useAuthState(auth);
  const [isUser, setIsUser] = useState(false);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUserData(userDoc.data() as any);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    
    fetchUserData();
  }, [user]);
  
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
    <ScrollView className="flex-1 bg-gray-50">
      {/* <Topbar /> */}
      <View className="p-4 mt-7">
        <View className="items-center mb-6">
          <View className="w-24 h-24 bg-gray-200 rounded-full mb-3">
            <Image 
              source={require('@/assets/images/mobile.png')}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-xl font-bold">{(userData as any)?.name}</Text>
          <Text className="text-gray-500">{(userData as any)?.email}</Text>
        </View>

        <View className="bg-white rounded-xl shadow-sm">
          <View className="flex-row items-center p-4 border-b border-gray-100">
            <Ionicons name="person-outline" size={24} color="#FFBF00" />
            <Text className="ml-3 flex-1">Edit Profile</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </View>
          <View className="flex-row items-center p-4 border-b border-gray-100">
            <Ionicons name="car-outline" size={24} color="#FFBF00" />
            <Text className="ml-3 flex-1">My Vehicles</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </View>
          <View className="flex-row items-center p-4">
            <Ionicons name="settings-outline" size={24} color="#FFBF00" />
            <Text className="ml-3 flex-1">Settings</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile; 