import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Dashboard: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const Dashboard = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    require('@/assets/images/mobile.png'),
    require('@/assets/images/mobile.png'),
    require('@/assets/images/mobile.png'),
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <SafeAreaView className="bg-white flex h-full w-full items-center justify-center">
            <StatusBar barStyle={"light-content"} backgroundColor={"#FFBF00"} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View className='flex w-full'>
          <View className='flex flex-row justify-between items-center px-4 relative'>
            <View className='absolute left-4 z-10'>
              {currentImageIndex > 0 && (
                <TouchableOpacity 
                  className='bg-gray-300 p-3 rounded-full text-black font-extrabold'
                  onPress={handlePrevImage}
                >
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
              )}
            </View>
            
            <View className="flex-1 items-center justify-center">
              <Image 
                source={images[currentImageIndex]}
                className="w-[70vw] h-64"
                resizeMode="contain"
              />
            </View>

            <View className='absolute right-4 z-10'>
              <TouchableOpacity 
                className='bg-gray-300 p-3 rounded-full text-black font-extrabold'
                onPress={handleNextImage}
              >
                <AntDesign name="arrowright" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View className="flex flex-row justify-center space-x-2 mt-4">
            {images.map((_, index) => (
              <View 
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentImageIndex === index ? 'bg-[#FFBF00]' : 'bg-gray-300'
                }`}
              />
            ))}
          </View>
          <View className="flex items-center justify-center mx-auto h-2 w-[80vw] rounded-xl bg-[#000000] mt-4"></View>
        </View>

        <View className='flex items-center justify-center'>
            <Text className='text-2xl font-extrabold p-2 mt-10'>Welcome to Motomate</Text>
            <Text className='text-gray-500 text-center text-sm p-2 mt-2'>Excited to have you try ousr services, but an invite is needed ask us or get invitation from friend who's a user!</Text>

            <TouchableOpacity 
              className='flex flex-row items-center gap-2 bg-[#FFBF00] w-[80vw] p-2 rounded-xl mt-10 justify-center'
              onPress={() =>router.push('/login')}
            >
              <AntDesign name="login" size={24} color="black" />
              <Text className='text-black text-lg font-extrabold'>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/signup")} className='flex flex-row items-center bg-transparent border border-black w-[80vw] p-2 rounded-xl mt-3 justify-center'>
              <Text className='text-black text-lg font-extrabold'>Sign Up</Text>
            </TouchableOpacity>

            <View className='flex flex-row w-[80vw] items-center mt-2 gap-2 text-green-400'>
              <Checkbox disabled={false} value={true} className='bg-transparent border-2 border-green-400' />
              <Text className='text-green-300 text-lg'> allowed Whatsapp notifications</Text>
            </View>

            <View className='flex flex-row items-center '>
              <Text className='text-gray-500 text-sm'>Continue as a {" "}</Text>
              <TouchableOpacity onPress={() => router.push("/home")}>
                <Text className='text-slate-800 text-sm underline'>Guest</Text>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard; 