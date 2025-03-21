import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '@/config/firebase'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth'
import { router } from 'expo-router'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
  
  const handleReset = async () => {
    
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    
    try {
      await sendPasswordResetEmail(email);
      Alert.alert(
        "Email Sent", 
        "If an account exists with this email, you'll receive password reset instructions.",
        [{ text: "OK", onPress: () => router.push('/login') }]
      );
    } catch (err) {
      console.error("Reset error:", err);
      Alert.alert("Error", "Failed to send reset email. Please try again later.");
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error.message);
    }
  }, [error]);

  return (
    <SafeAreaView className='bg-white flex-1'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex-1 justify-center items-center px-4'>
          <View className='w-full max-w-md bg-white rounded-xl p-6 shadow-lg elevation-5' 
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
            }}>
            <View className='items-center mb-6'>
              <Text className='text-black text-3xl font-serif mb-2'>Reset Password</Text>
              <Text className='text-gray-600 text-center text-base'>
                Enter your email to receive password reset instructions
              </Text>
            </View>
            
            <View className='w-full mb-6'>
              <Text className='text-black text-base font-medium mb-2'>Email Address</Text>
              <TextInput 
                className='border border-gray-300 rounded-lg p-3 w-full bg-gray-50'
                keyboardType='email-address'
                placeholder='Enter your email'
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            
            <TouchableOpacity 
              onPress={handleReset} 
              disabled={sending}
              className={`rounded-lg p-3 w-full ${sending ? 'bg-gray-300' : 'bg-[#FEC110]'}`}
            >
              <Text className='text-black text-center text-lg font-bold'>
                {sending ? 'Sending...' : 'Reset Password'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => router.push('/login')} className='mt-5'>
              <Text className='text-gray-700 text-center underline'>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgetPassword